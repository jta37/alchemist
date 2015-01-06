// Require Twitter API 
var Twit = require ('twit');
var _ = require('underscore');
var async = require('async');


var express = require('express');
var app = express();


var bodyParser = require('body-parser');

// Require AlchemyAPI
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

		
// Twitter API Access Tokens
var T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY
  , consumer_secret:      process.env.CONSUMER_SECRET
  , access_token:         process.env.ACCESS_TOKEN
  , access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});

// app.use(express.bodyParser());
app.use(express.static(__dirname + "/public"));

// set view engine to ejs
app.set('view engine', 'ejs');

// T.get('statuses/user_timeline', { user_id: 'shrewd_drews', count: 100 }, function (err, data, response) {
// 	console.log(data);
// });


// THIS ONE WORKS!!!!!!!!!!!
app.get('/idk/:user_id', function(req, res){
	var userId = req.params.user_id;
	console.log(userId);
	T.get('statuses/user_timeline', { screen_name: userId, count: 100 }, function (err, data, response) {
	console.log(data[0].text);

	var tweets = [];

/// NOT ASYNCHORONOUS BAD... BAD.
// SWAP OUT _ for async NOT YET... EVENTUALLY
	_.each(data, function(t) {
		tweets.push(t.text);
	});
	console.log(tweets);
	res.render('test', {tweets: tweets});
	});
})

var getTweets = function(twitter_user, callback){
	T.get('statuses/user_timeline', { screen_name: 'KingJames', count: 50 }, function (err, data, response) {
		var context = {};
		context.tweets = [];
		// context.tweet_text_blob = "";
		_.each(data, function(t) {
			context.tweets.push(t.text);
		});
		callback(null, context);
	});
};

var runAnalysis = function(context, callback) {
	// console.log(text);
	alchemyapi.entities('text', context.tweets, { 'sentiment': 1 }, function(response) {
		context.entities = response.entities;
		callback(null, context);
	});
};

app.get('/test/:user_id', function(req, res) {
	// Set twitter params to userId
	var userId = req.params.user_id;
	var context = {};

	async.waterfall([
		function(callback){
        callback(null, userId);
    },
		getTweets,
		runAnalysis
	]
	, function(err, c) { //This function gets called after the two tasks have called their "task callbacks"
        if (err) return next(err);
        //Here locals will be populated with context and tweets
        console.log("\n=======\n");
        console.log(c);
        res.render('test', c);
  	}
	);
});

app.listen(3000, function (){
	console.log("Visit localhost:3000")
});


