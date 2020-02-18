var Twit = require('twit');
var config = require('./config.js');
var T = new Twit(config);
console.log('The bot has started');

tweetIt();

function tweetIt() {
  var params = {
    q: 'Canada',
    count: 1,
    result_type: 'recent',
    lang: 'en'    
  }
  var tweet = {
    status: 'Retweeting most recent tweets about ' + params.q
  }

  console.log(' Step 1');

  function gotData(err, data, response) {
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++) {
      console.log('NEWS '+ i + ' || ' + tweets[i].text);
      var result = {
        status: tweets[i].text
      }
      T.post('statuses/update', result, tweeted);
    }
  }

  function tweeted(err, data, response) {
    if (err){
      console.log("Something went wrong!")
    } else {
      console.log("It worked!");
    }
  }
  console.log(' Step 2');

  T.post('statuses/update', tweet, tweeted);
  T.get('search/tweets', params, gotData);
}

/*
//
//  tweet 'hello world!'
//
T.post('statuses/update', { 
	status: 'hello world!' }, 
	function(err, data, response) {
  console.log(data)
});


T.stream('filter', {track: 'love'}, function(stream){
	
	stream.on('data', function(data){
		console.log(util.inspect(data));
		steram.destroy();
	});
	
});


// grab & retweet as soon as program is running...
retweet();

//*/
