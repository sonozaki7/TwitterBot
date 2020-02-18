var Twit = require('twit');
var config = require('./config.js');
var T = new Twit(config);
console.log('The bot has started');

var retweet = function() {
  var params = {
    q: 'corona, coronavirus',
    result_type: 'recent',
    lang: 'en'    
  }
  console.log('Running 1 ');
  var tweet = {
    status: '#coding from node.js'
  }
  console.log('Running 1 ');
  T.post('statuses/update', params, tweeted);

  function tweeted(err,data,response) {
    if (err){
      console.log("Something went wrong!")
    } else {
      console.log("It worked!");
    }
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





// grab & retweet as soon as program is running...
retweet();
// retweet in every 50 minutes
setInterval(retweet, 3000000);
//*/
