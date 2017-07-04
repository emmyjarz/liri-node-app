var input = process.argv;
var command = input[2];
var userChoice = input[3];
//userChoice are more than 1 word
for (var i = 4; i < input.length; i++) {
  userChoice = userChoice + " " + input[i];
}
// console.log(userChoice);
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

function tweets() {
  var Twitter = require('twitter');
  var clientK = require("./keys.js");
  var client = new Twitter(clientK.twitterKeys);
  // console.log(client);

  client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=emmyjarz&count=20', function(error, tweet, response) {
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
          // console.log(song);
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
      // console.log(song);
      console.log(song.artists[0].name);
      console.log(song.name);
      console.log(song.preview_url);
      console.log(song.album.name);
    });
  }
}
