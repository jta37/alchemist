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
T.get('statuses/user_timeline', { user_id: 'shrewd_drews', count: 100 }, function (err, data, response) {
	console.log(data);
});


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
