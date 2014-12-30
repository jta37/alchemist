// Require Twitter API 
var Twit = require ('twit');
var bodyParser = require('body-parser');
var express = require('express'),
		app = express();

app.use(bodyParser.urlencoded({extended: true}));
// Twitter API Access Tokens
var T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY
  , consumer_secret:      process.env.CONSUMER_SECRET
  , access_token:         process.env.ACCESS_TOKEN
  , access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});

T.get('statuses/user_timeline', { user_id: 'shrewdDrews', count: 3 }, function (err, data, response) {
	// user.screen_name ---output--> @shrewdDrews (twitter handle)
	console.log(data[0].user.screen_name);
	// user.name ---output--> J.Andrews (name listed w/ account)
	console.log(data[0].user.name);
	console.log(typeof data[0].text)
});

// var storeTweets = function () {
// 	T.get('statuses/user_timeline', { user_id: 'shrewdDrews', count: 5 }, function (err, data, response){
// 		var tweets = [];
// 		_.each(data, function(t) {
// 			tweets.push(t.text);
// 		});
// 		console.log(tweets)
// 	});
// }

//user.screen_name ==> @ShrewdDrews