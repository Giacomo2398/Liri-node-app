# Liri
LIRI is a comand line node app that takes user input as parameters and returns the requested data.

##### Instilling dependencies 
`$ npm install`

##### Create a .env file
Inside place your Spotify and Twitter API keys.

##### Starting the App
To start the application and learn the commands type:
`$ node liri help`

#### Commands
First command:
`$ node liri my-tweets <twitter_username>` - Retrieves the last 5 tweets from the given twitter username.
Second Command:
`$ node liri spotify-this-song <song name>` - Retrieves short information about the given song name.
Third Command:
`$ node liri movie-this <movie name>` - Retrieves information about the given movie tittle.
Fourth Command:
`$ node liri do-what-it-says`- Just run it...

All the commands after the word 'liri' can be replaced with the numbers 1-4.

#### Logs
Every input and output of data through the app is log in a text file called log.txt inside the app folder.