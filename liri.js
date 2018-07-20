require("dotenv").config();

let keys = require('./keys.js');
let Twitter = require('twitter');
let Spotify = require('node-spotify-api');
let rp = require('request-promise');
let fs = require('fs');
let cmd = process.argv[2];
let promise = '';

for(let i = 3; i < process.argv.length; i++){
    promise += process.argv[i] + '';
};

let problem = promise === '' ? cmd : cmd + ',"' + promise.trim() + '"';
fs.appendFile('./log.txt', + '\r\n' + problem, function(error){
    if(error){
        return console.log(error);
    }
});

function displayIntro(){
    console.log("--------------------------------" + "\n");
    console.log("       ▒█░░░ ▀█▀ ▒█▀▀█ ▀█▀")
    console.log("       ▒█░░░ ▒█░ ▒█▄▄▀ ▒█░")
    console.log("       ▒█▄▄█ ▄█▄ ▒█░▒█ ▄█▄")
    console.log("\n------------Commands------------" + 
    "\n[1]my-tweets" + 
    "\n[2]spotify-this-song" + " 'song name'" +
    "\n[3]movie-this" + " 'movie name'" +
    "\n[4]do-what-it-says" +
    "\n--------------------------------");
    fs.appendFile('./log.txt', "\r\n-----------" + "\r\n" + "\r\n" + promise, (err) => {
        if (err) throw err;
    });
}



displayCmds(cmd);


function displayCmds(cmd){
    switch(cmd){
        case 'help':
            displayIntro();
            break;
        case 'my-tweets':
        case '1':
            searchTweets();
            break;
        case 'spotify-this-song':
        case '2':
            searchSpotify();
            break;
        case 'movie-this' :
        case '3':
            searchMovie();
            break;
        case 'do-what-it-says':
        case '4':
            fs.readFile('./random.txt','utf8', function(error, data){
                if(error){
                    throw error;
                }
                let temp = data.split(',');
                promise = temp[1];
                displayCmds(temp[0]);
            });
            break;
    }
};

//Function for Twitter
function searchTweets(){
    let client = new Twitter({
        consumer_key: keys.twitter.consumer_key,
        consumer_secret: keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret
    });
    //Parameters for the Account
    let params = {
        screen_name: 'realDonaldTrump',
        count: 5
    };
    // Twitter Timeline call
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error){ 
            for (let i = 0; i < tweets.length; i++) {
                console.log("\n-------------------------");
                console.log("@realDonaldTrump: " + tweets[i].text + "\n");
                console.log("\n-------------------------");
            fs.appendFile('./log.txt', "\r\n"  + 
                "\r\nLast Five Tweets" + 
                '\r\n-----------------------' + 
                "\r\n@realDonaldTrump: " + tweets[i].text + 
                "\r\n-----------------------", (err) => {
                    if (err) throw err;
                });
            }
        }else{
            console.log("Error:" + JSON.stringify(error, Object.getOwnPropertyNames(error)))
        }
    })
};

function searchSpotify(){
    if(promise === '') promise = 'The Sign Ace of Base';
    let spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    // Call for Spotify
    spotify.search({
        type: 'track',
        query: promise,
        limit:5
    },function (err, data){
        if(err){
            return console.log('Error occurred: ' + err);
        }else{
            let response = data.tracks.items[0];
            console.log('Artist: ' + response.artists[0].name + 
            '\nTrack: ' + response.name +
            '\nAlbum: ' + response.album.name);
        fs.appendFile('./log.txt', "\r\n-------" +
            "\r\nArtist: " + response.artists[0].name + 
            "\r\nTrack: " + response.name +
            "\r\nAlbum: " + response.album.name +
            "\r\n-------\r\n", (err) => {
                if (err) throw err;
            });
        }
    })
};

function searchMovie() {
    if (promise === '') promise = 'Mr. Nobody';
    let moviecall = {
        uri: 'https://www.omdbapi.com?apikey=trilogy&t=' + promise,
        json: true
    };

    //API call
    rp(moviecall).then(function (response){
        console.log('Tittle: ' + response.Title +
        "\nYear: " + response.Year + 
        "\nIMBD Rating: " + response.Ratings[0].Value +
        "\nRotten Tomatoes Rating: " + response.Ratings[1].Value +
        "\nCountry(s): " + response.Country + 
        "\nLanguage(s): " + response.Language +
        "\nPlot: " + response.Plot +
        "\nActors: " + response.Actors);
    fs.appendFile('./log.txt', '\r\n----------' +
        "\r\nTittle: " + response.Title +
        "\r\nYear: " + response.Year + 
        "\r\nIMBD Rating: " + response.Ratings[0].Value +
        "\r\nRotten Tomatoes Rating: " + response.Ratings[1].Value +
        "\r\nCountry(s): " + response.Country + 
        "\r\nLanguage(s): " + response.Language +
        "\r\nPlot: " + response.Plot +
        "\r\nActors: " + response.Actors +
        "\r\n-------\r\n", (err) => {
            if (err) throw err;
        })
    })
    .catch(function (err){
        console.log("Error occurred: " + err);
    });
};