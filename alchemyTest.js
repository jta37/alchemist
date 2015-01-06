// Require Twitter API 
var Twit = require ('twit');
var _ = require('underscore');

var bodyParser = require('body-parser');

// Require AlchemyAPI
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();


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

var context = {};



T.get('statuses/user_timeline', { user_id: 'shrewd_drews', count: 30 }, function (err, data, response) {
	console.log(data[0].text);

	var tweet_objects = [];
	var tweet_text_blob = "";

	_.each(data, function(t) {
		tweet_objects.push(t);
		tweet_text_blob += " " + t.text;
	});
	// console.log(tweets);

	// alchemyapi.sentiment("text", tweets, {'sentiment':1}, function(response) {
	// console.log("Sentiment " + response["docSentiment"]["type"]);
	// });

	// var output = {};

	alchemyapi.entities('text', tweet_text_blob, { 'sentiment':1 }, function(response) {
		// output.entities = { text:tweets, response:JSON.stringify(response,null,4), results:response['entities'] };

		// var t_entities = [];

		// console.log(response.entities)
		// response.entities --> entity results
		var t_entities = response.entities;
		// console.log(response)

		// _.each(response, function(e) {
		// 	t_entities.push(entities)
		// });
		console.log(t_entities);


			// console.log(entities.response)

			// console.log(output)

			// var entityTypes = response.entities.type;
			// console.log(entityTypes);
		});
});


		// entities[0] output shown below
		// console.log(entities[0]);

			//{ type: 'Person',
		  // relevance: '0.796034',
		  // sentiment: { type: 'negative', score: '-0.418119' },
		  // count: '3',
		  // text: 'Steve Downie',
		  // disambiguated: 
		  //  { subType: [ 'Athlete', 'HockeyPlayer' ],
		  //    name: 'Steve Downie',
		  //    dbpedia: 'http://dbpedia.org/resource/Steve_Downie',
		  //    freebase: 'http://rdf.freebase.com/ns/m.09rkgm',
		  //    yago: 'http://yago-knowledge.org/resource/Steve_Downie' } }


// alchemyapi.sentiment("text", tweets, {}, function(response) {
// 	console.log("Sentiment" + response["docSentiment"]);
// });

// alchemyapi.concepts("text", tweets, {'linkedData':1}, function(response) {
// 	console.log("Concepts " + response["concepts"]["type"]);
// })



