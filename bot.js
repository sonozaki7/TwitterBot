var Twit = require('twit');
var config = require('./config.js');
var T = new Twit(config);
console.log('The bot has started');

retweet();

function retweet() {
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
  console.log(' Step post');

  T.post('statuses/update', tweet, tweeted);

  console.log(' Step get');
  T.get('search/tweets', params, gotData);
}


console.log(' Step stream');
var stream = T.stream('statuses/filter', { track: '@cpen291g5' });
stream.on('follow', followed);

function followed(eventMsg) {
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_Name;
  tweetIt('.@' + screenName + 'Thanks for follow!');
}

function tweetIt(txt) {
  var r = math.floor(math.random()*100);
  var tweetTxt = {
    status: txt + ", number is " + r
  }

  T.post('statuses/update', tweetTxt, tweeted);
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

//*/
