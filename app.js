// require node modules & load controllers
var express = require ('express'),
		request = require ('request'),
		bodyParser = require ('body-parser'),
		app = express();

// Require Underscore.js 
var _ = require('underscore');

// Require Twitter API Client for Node
var Twit = require ('twit');

// Twitter API Access Tokens
var T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY
  , consumer_secret:      process.env.CONSUMER_SECRET
  , access_token:         process.env.ACCESS_TOKEN
  , access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});




// T.get('search/tweets', { q: 'banana since:2011-11-11', count: 1 }, function(err, data, response) {
//   console.log(data);
//   console.log(typeof data);
// });

// T.get('statuses/user_timeline', { user_id: 'shrewd_drews', count: 1 }, function (err, data, response) {
// 	console.log(data.text);
// });


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// set view engine to ejs
app.set('view engine', 'ejs');


app.get("/", function(req,res) {
	res.render('index');
})

app.get("/search/new", function (req, res) {
	res.render("search/new");
})
// Render user_timeline tweets at /test 

app.get('/test', function(req, res){
	T.get('statuses/user_timeline', { user_id: 'shrewd_drews', count: 100 }, function (err, data, response) {
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

app.get('/search/:user_id', function (req, res) {
	T.get('statuses/user_timeline', { user_id: ':user_id', count: 50 }, function (err, data, response) {
		//res.send(':user_id')
		if (!error && response.statusCode == 200) {
		res.redirect('results', { tweetList: user_id });
	})
})



app.get("/results", function(req,res) {
	res.render('results');
});


// Require AlchemyAPI
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

// Test Sentiment analysis via Alchemy
// var myText = "Whoa, AlchemyAPI's Node.js SDK is really great, I can't wait to build my app!";
// alchemyapi.sentiment("text", myText, {}, function(response) {
// console.log("Sentiment: " + response["docSentiment"]["type"]);
// });
		
// T.get('search/tweets', { q: 'banana since:2011-11-11', count: 1 }, function(err, data, response) {
//   //console.log(data);
//   //console.log(typeof data);
// });


app.listen(3000, function (){
	console.log("Visit localhost:3000")
});