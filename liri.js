var dataArr;
var keys = require("./keys.js")
var input = process.argv;
var command = input[2];
var userChoice = "";
//userChoice are more than 1 word
for (var i = 3; i < input.length; i++) {
  userChoice += " " + input[i];
}
userChoice.trim();

function allCommands(command) {
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
  var client = new Twitter(keys.twitterKeys);
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
  var spotify = new Spotify(keys.spotifyKeys);
  // console.log(spotify);
  if (userChoice == "") {
    spotify.search({
      type: ["track", "artist"],
      query: ["The Sign", "Ace of Base"],
    }, function(err, data) {
      if (err) {
        return console.log(err);
      }
      music(data);
    });
  } else {
    spotify.search({
      type: 'track',
      query: userChoice
    }, function(err, data) {
      if (err) {
        return console.log(err);
      }
      music(data);
    });
  }
}

function movie() {
  var request = require("request");
  if (userChoice == "") {
    userChoice = "Mr.Nobody"
  }
  userChoice = userChoice.replace(" ", "+")
  var queryUrl = "http://www.omdbapi.com/?t=" + userChoice + "&y=&plot=short&apikey=40e9cece"
  // console.log(queryUrl);
  request(queryUrl, function(err, res, body) {

    if (!err && res.statusCode === 200) {
      var display = JSON.parse(body);
      if (display.Title == undefined) {
        console.log("Sorry, can't find your movie, please try again!!")
      } else {
        console.log("Title: ", display.Title);
        console.log("Year: ", display.Year);
        console.log("IMDB Rating: ", display.imdbRating);
        if (display.Ratings[1] == undefined) {
          console.log("Sorry, there is no Rotten Tomatoes Rating for this moive.")
        } else {
          console.log("Rotten Tomatoes Rating: ", display.Ratings[1].Value);
        }
        console.log("Country: ", display.Country);
        console.log("Language: ", display.Language);
        console.log("Plot: ", display.Plot);
        console.log("Actors: ", display.Actors);
        // console.log(display)
      }
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

function music(data) {
  var song = data.tracks.items[0];
  console.log("Artist(s): ", song.artists[0].name);
  console.log("Song's name: ", song.name);
  console.log("URL: ", song.preview_url);
  console.log("Album: ", song.album.name);
}
