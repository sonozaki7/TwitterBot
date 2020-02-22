
var Twit = require('twit');
var config = require('./config.js');
var T = new Twit(config);
console.log('The bot has started');
var math = require('mathjs');



/*
Main Loop
*/
retweet();
tweetRandomNumber();
print('stream', 'Running stream');
var stream = T.stream('statuses/filter', { track: '@cpen291g5' });
stream.on('follow', followed);

//end of the program
process.exit();




/*
  This section is for retweet function for the bot.
  This bot will aggregate tweet related to the topic for you.
*/
function retweet() {
  var params = {
    q: 'christmas',
    count: 2,
    result_type: 'recent',
    lang: 'en'    
  }

  var tweet = {
    status: 'Retweeting most recent tweets about ' + params.q
  }

  print('retweet', 'params and tweet instantiated');

  function gotData(err, data, response) {
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++) {
      console.log('NEWS '+ i + ' || ' + tweets[i].text);
      var result = {
        status: tweets[i].text
      }
      print('retweet', 'retweeting the searched tweet');
      print('retweet', tweets[i].text);
      T.post('statuses/update', result, isTweetSuccess);
    }
  }

  print('retweet', 'posting tweet...');
  T.post('statuses/update', tweet, isTweetSuccess);

  print('retweet', 'searching tweet...');
  T.get('search/tweets', params, gotData);
}


/*
  This section is for creating follow-triggered event for the bot
*/
function followed(eventMsg) {
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_Name;
  tweetIt('.@' + screenName + 'Thanks for follow!');
}

function tweetRandomNumber(txt) {
  var r = math.floor(math.random()*100);
  var tweetTxt = {
    status: txt + ", number is " + r
  }

  T.post('statuses/update', tweetTxt, isTweetSuccess);
}

/*
  Helper Methods
*/
function print(method, str) {
  switch (method) {
    case 'retweet':
      console.log('retweet()');
      break;
    case 'start':
      console.log('start of the program');
      break;
    case 'stream':
      console.log('stream');
      break;
    default:
      console.log('other');
  }
  console.log('   ' + str);
}

function isTweetSuccess(err, data, response) {
  if (err){
    console.log("Something went wrong!");
  } else {
    console.log("It worked!");
  }
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
