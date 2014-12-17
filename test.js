// Require Twitter API 
var Twit = require ('twit');
var _ = require('underscore');

// Require AlchemyAPI
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

//Test Sentiment analysis via Alchemy

var myText = "Whoa, AlchemyAPI's Node.js SDK is really great, I can't wait to build my app!";
alchemyapi.sentiment("text", myText, {}, function(response) {
console.log("Sentiment: " + response["docSentiment"]["type"]);
});
		
// Twitter API Access Tokens
var T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY
  , consumer_secret:      process.env.CONSUMER_SECRET
  , access_token:         process.env.ACCESS_TOKEN
  , access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});

// Pseudocode Structure 

T.get('search/tweets', {q: '...', count: 100}, function (err, data, res) {

	var t_results = JSON.parse(data);
	alchemyapi.yadayada("...", ..., ..., fuction (response) {
		console.log(" Put your output here. ");
	})



})

// T.get('search/tweets', { q: 'banana since:2011-11-11', count: 1 }, function(err, data, response) {
//   //console.log(data);
//   //console.log(typeof data);
// });

// T.get('statuses/user_timeline', { user_id: 'shrewd_drews', count: 30 }, function (err, data, response) {
// 	console.log(data[0].text);

// 	var tweets = [];

// 	_.each(data, function(t) {
// 		tweets.push(t.text);
// 	});
// 	console.log(tweets);
// });