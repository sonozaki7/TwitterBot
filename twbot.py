from auth import(
    auth_consumer_key,
    auth_consumer_secret,
    auth_access_token,
    auth_access_token_secret
)

var Twit = require('twit')
var T = new Twit({
    consumer_key:         auth_consumer_key,
    consumer_secret:      auth_consumer_secret,
    access_token:         auth_access_token,
    access_token_secret:  auth_access_token_secret,
})

var users = ["So_Nozaki"];
var stream = T.stream('statuses/filter', {follow: users});

stream.on('tweet', function (tweet) {
    if (users.indexOf(tweet.user.id_str) > -1) {
        console.log(tweet.user.name + ": " + tweet.text);
        T.post('statuses/retweet/:id', { id: tweet.id_str },
               function (err, data, response) {
            console.log(data)
        })
    }
})
