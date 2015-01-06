// require node modules & load controllers
var express = require ('express'),
		request = require ('request'),
		bodyParser = require ('body-parser'),
		sequelize = require ('sequelize'),
		pg = require ('pg'),
		app = express();


// var config = require(__dirname + '/../config/config.json')[env];
// NEEDED FOR HEROKU ///////////
// if(config.use_env_variable){
//   var db_info = process.env[config.use_env_variable].match(/([^:]+):\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
//   config.dialect=db_info[1];
//   config.username=db_info[2];
//   config.password=db_info[3];
//   config.host=db_info[4];  
//   config.port=db_info[5];  
//   config.database=db_info[6];  
// }
//////////////////////////////


var db = require("./models");


// Require Underscore.js & ASync
var _ = require('underscore');
var async = require('async');

// Require Twitter API Client for Node
var Twit = require ('twit');

// Twitter API Access Tokens
var T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY
  , consumer_secret:      process.env.CONSUMER_SECRET
  , access_token:         process.env.ACCESS_TOKEN
  , access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});

// Require AlchemyAPI
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// set view engine to ejs
app.set('view engine', 'ejs');


app.get("/", function(req,res) {
	res.render('index');
})

app.get("/search/new", function (req, res) {
	res.render("search/new");
})

// THIS ONE WORKS!!!!!!!!!!!
// app.get('/idk/:user_id', function(req, res){
// 	// Set twitter params to userId
// 	var userId = req.params.user_id;
// 	// console.log(userId);
// 	T.get('statuses/user_timeline', { screen_name: userId, count: 100 }, function (err, data, response) {
// 	// console.log(data[0].text);

// 	var tweets = [];

// 	_.each(data, function(t) {
// 		tweets.push(t.text);
// 	});
// 	console.log(tweets);
// 	res.render('test', {tweets: tweets});
// 	});
// })

var getTweets = function(twitter_user, callback){
	T.get('statuses/user_timeline', { screen_name: 'jmj', count: 50 }, function (err, data, response) {
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

//http://localhost:3000/results?tweets[username]=mjdesa
app.get('/results', function(req, res){
	var userId = req.query.tweets.username;
	var numberOfTweets = req.query.tweets.count
	console.log(userId);

	// Query Twitter REST API 			// Params
	T.get('statuses/user_timeline', { screen_name: userId, count: 20 }, function (err, data, response) {

	var tweets = [];

	// Call the .each method on userId, and push into an array to display
	_.each(data, function(t) {
		tweets.push(t.text);
	});
	console.log(tweets);
	res.render('results', {tweets: tweets});
	});
})


app.get('/about', function(req,res) {
	res.render('site/about');
})

app.get('/contact', function(req,res) {
	res.render('site/contact');
})


// app.listen(3000, function (){
// 	console.log("Visit localhost:3000")
// });

app.listen(process.env.PORT || 3000, function () {
	console.log("LISTENING");
});

