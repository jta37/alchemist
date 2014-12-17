// require node modules & load controllers
var express = require ('express'),
		Twit = require ('twit'),
		bodyParser = require ('body-parser'),
		app = express();

// Twitter API Access Tokens
var T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY
  , consumer_secret:      process.env.CONSUMER_SECRET
  , access_token:         process.env.ACCESS_TOKEN
  , access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});

T.get('search/tweets', { q: 'banana since:2011-11-11', count: 100 }, function(err, data, response) {
  console.log(data);
  console.log(typeof data);
});

T.get('statuses/user_timeline', { user_id: 'shrewd_drews', count: 100 }, function (err, data, response) {
	console.log(data);
});

// set view engine to ejs
app.set('view engine', 'ejs');


app.get("/", function(req,res) {
	res.render('index');
})


app.get("/search/:searchTerm", function (req, res) {

});


app.get("/results", function(req,res) {
	res.render('results');
});


app.listen(3000, function (){
	console.log("Visit localhost:3000")
});