//Import npm package Twit
var Twit = require('twit');

//Authenticate from keys.js
var keys = require('./keys');
var T = new Twit(keys);

//4 commands for LIRI store in variables 
var userChoice = process.argv[2];
var liriCommands = {
	"my-tweets": "",
	"spotify-this-song": "",
	"movie-this": "",
	"do-what-it-says": "" 
};

if(liriCommands[userChoice]) {
	console.log(liriCommands[userChoice]);
}
else {
	console.log("I'm sorry, LIRI does not understand this request. Please try again.");
}

var params = { 
	q: '@yeahurght',
	count: 20
}

//get request
T.get('search/tweets', params, gotData);  

function gotData(err, data, response) {
	var tweets = data.statuses;
	for (var i = 0; i < tweets.length; i++) {
		console.log(tweets[i].text);
	}
}