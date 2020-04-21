require('dotenv').config()
import { Twitter } from '../botLogic'

const twitter = new Twitter(process.env.consumer_key, process.env.consumer_secret, process.env.access_token, process.env.access_token_secret)
const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.airtable_key}).base('appzo9fDle7O3x6GE')

// base('Expert Content').select({
//
// }).eachPage(function page(records, fetchNextPage) {
//   records.forEach(function(record) {
//     console.log('Retrieved', record.get('Question Header'));
//   });
//   fetchNextPage();
// }, function done(err) {
//   if (err) { console.error(err); return; }
// });

const streamTweets = async () => {
  console.log('bot sagar test')
  const tweets = await twitter.getTweet('corona')

  tweets.on('tweet', (tweet) => {
    let tweetId = tweet.id
    let tweetText = tweet.text
    let userId = tweet.user.id
    let userName = tweet.user.name
    let userScreenName = tweet.user.screen_name

    base('Expert Content').create([{
      "fields": {
        "Question Header": tweetText
      }
    }],function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    });


    console.log(tweetId, tweetText, userId, userName, userScreenName)
  })
}

streamTweets()
