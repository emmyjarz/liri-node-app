var dataArr;
var input = process.argv;
var command = input[2];
var userChoice = input[3];
//userChoice are more than 1 word
for (var i = 4; i < input.length; i++) {
  userChoice = userChoice + " " + input[i];
}
function allCommands(command){
switch (command) {
  case "my-tweets":
    tweets();
    break;
  case "spotify-this-song":
    spotify();
    break;
  case "movie-this":
    movie();
    break;
  case "do-what-it-says":
    doWhat();
    break;
}
}
allCommands(command);
function tweets() {
  var Twitter = require('twitter');
  var clientK = require("./keys.js");
  var client = new Twitter(clientK.twitterKeys);
  // console.log(client);
  var params = {
    screen_name: "emmyjarz",
    count: 20
  }
  client.get("statuses/user_timeline", params, function(error, tweet, response) {
    if (!error) {
      tweet.forEach(function(e) {
        console.log(e.text);
        console.log(e.created_at);
        console.log("---------");
      })
    }
  });
}

function spotify() {
  var Spotify = require("node-spotify-api");
  var spotifyK = require("./keys.js");
  var spotify = new Spotify(spotifyK.spotifyKeys);
  // console.log(spotify);
  if (userChoice == undefined) {
    spotify.search({
      type: "track",
      query: "The Sign",
      limit: 5
    }, function(err, data) {
      if (err) {
        return console.log(err);
      }
      for (var i = 0; i < 5; i++) {
        var song = data.tracks.items[i];
        if (song.artists[0].name == "Ace of Base") {
          console.log(song.artists[0].name);
          console.log(song.name);
          console.log(song.preview_url);
          console.log(song.album.name);
        }
      }
    });
  } else {
    spotify.search({
      type: 'track',
      query: userChoice
    }, function(err, data) {
      if (err) {
        return console.log(err);
      }
      var song = data.tracks.items[0];
      console.log(song.artists[0].name);
      console.log(song.name);
      console.log(song.preview_url);
      console.log(song.album.name);
    });
  }
}

function movie() {
  var request = require("request");
  if (userChoice == undefined) {
    userChoice = "Mr.Nobody"
  }
  userChoice = userChoice.replace(" ", "+")
  var queryUrl = "http://www.omdbapi.com/?t=" + userChoice + "&y=&plot=short&apikey=40e9cece"
  // console.log(queryUrl);
  request(queryUrl, function(err, res, body) {
    if (!err && res.statusCode === 200) {
      var display = JSON.parse(body);
      console.log("Title: ", display.Title);
      console.log("Year: ", display.Year);
      console.log("IMDB Rating: ", display.imdbRating);
      console.log("Rotten Tomatoes Rating: ", display.Ratings[1].Value);
      console.log("Country: ", display.Country);
      console.log("Language: ", display.Language);
      console.log("Plot: ", display.Plot);
      console.log("Actors: ", display.Actors);
    }
  });
}

function doWhat() {
  var fs = require("fs");
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    dataArr = data.split(",");
    command = dataArr[0];
    userChoice = dataArr[1].trim();
      allCommands(command);
  });
}
