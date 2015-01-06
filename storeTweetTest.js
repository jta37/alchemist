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

// Render user_timeline tweets at /test 

// app.get('/test', function(req, res){
// 	T.get('statuses/user_timeline', { user_id: 'shrewd_drews', count: 100 }, function (err, data, response) {
// 	console.log(data[0].text);

// 	var tweets = [];

// /// NOT ASYNCHORONOUS BAD... BAD.
// // SWAP OUT _ for async NOT YET... EVENTUALLY
// 	_.each(data, function(t) {
// 		tweets.push(t.text);
// 	});
// 	console.log(tweets);
// 	res.render('test', {tweets: tweets});
// 	});
// })



		// 	var entityAnalysis = [];

		// 	// console.log(response.entities)
		// 	// response.entities --> entity results
		// 	var entities = response.entities;
		// 	console.log(entities);

		// 	_.each(entities, function(data) {
		// 		entityAnalysis.push(data.text, data.type, data.sentiment, data.relevance);
		// 	})
		// 	console.log(entityAnalysis);
		// });

//user.screen_name ==> @ShrewdDrews

	// Set a url for AlchemyAPI analysis
	// var testUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=10'
	// alchemyapi.entities("url", testUrl, { 'sentiment':1, 'maxRetrieve':30 }, function(response) {
	// 	response['entities'] = { url:testUrl, response:JSON.stringify(response,null,4), results:response['entities'] };

	// 	// store entity analysis response
	// 	var entityExtract = response.entities;
	// 	console.log(entityExtract)
	// 	var entityType = response.entities.type;
	// 	console.log(entityType)
	// 	var tweetEntities = [];

	// 	_.each(response, function(e) {
	// 		tweetEntities.push(e.url);
	// 	});
	// console.log("Entities: " + tweetEntities);
	// });