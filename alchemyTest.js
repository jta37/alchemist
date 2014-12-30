// Require Twitter API 
var Twit = require ('twit');
var _ = require('underscore');

var bodyParser = require('body-parser');

// Require AlchemyAPI
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();


var testUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2'

// var analysisChain = function alchemist(req, res) {
// 	var output = {};

// 	//Start the analysis chain
// 	entities(req, res, output);
// }


// function entities(req, res, output) {
// 	var testUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2'
// 	alchemyapi.entities('url', testUrl,{ 'sentiment':1 }, function(response) {
// 		output['entities'] = { url:testUrl, response:JSON.stringify(response,null,4), results:response['entities'] };
// 		keywords(req, res, output);
// 		console.log('Entities ' + response['entities'], Person, Technology)
// 	});
// }



		
// Twitter API Access Tokens
var T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY
  , consumer_secret:      process.env.CONSUMER_SECRET
  , access_token:         process.env.ACCESS_TOKEN
  , access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});

// Pseudocode Structure 

// T.get('search/tweets', {q: '...', count: 100}, function (err, data, res) {

// 	var t_results = JSON.parse(data);
// 	alchemyapi.keywords("...", ..., ..., fuction (response) {
// 		console.log(" Put your output here. ");
// 	})
// })



T.get('statuses/user_timeline', { user_id: 'shrewd_drews', count: 30 }, function (err, data, response) {
	console.log(data[0].text);

	var tweets = [];

	_.each(data, function(t) {
		tweets.push(t.text);
	});
	// console.log(tweets);

	alchemyapi.sentiment("text", tweets, {'sentiment':1}, function(response) {
	console.log("Sentiment " + response["docSentiment"]["type"]);
	});

		var output = {};

		alchemyapi.entities('text', tweets,{ 'sentiment':1 }, function(response) {
			output['entities'] = { text:tweets, response:JSON.stringify(response,null,4), results:response['entities'] };
			// console.log("Entities " + response['entities']['type'])

			// console.log(response.entities)
			// response.entities --> entity results
			var entities = response.entities;
			console.log(entities);

			// Response type --> object
			// console.log(typeof entities)

			// console.log(entities.response)

			// console.log(output)

			// console.log({entities: response['type']})

			// console.log({output: response.sentiment})
			var entityTypes = response.entities.type;
			// console.log(entityTypes);
		});
});

// alchemyapi.sentiment("text", tweets, {}, function(response) {
// 	console.log("Sentiment" + response["docSentiment"]);
// });

// alchemyapi.concepts("text", tweets, {'linkedData':1}, function(response) {
// 	console.log("Concepts " + response["concepts"]["type"]);
// })

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



