import Twitter from './lib/twitter'
import Telegram from './lib/telegram'
import Airtable from './lib/airtables'
import checkUnansweredTweets from './checkUnansweredTweets'
import * as cron from 'node-cron'
import { getIO } from './socketio'
import * as _ from 'underscore'

import './server'


const job = async () => {
  // Cron script to post the responses
  // cron.schedule('*/10 * * * * *', checkUnansweredTweets)

  // Stream #AskCovidIndia
  try {
    let buf = []
    const tweets = await Twitter.getTweet('#AskCovidIndia')

    const io = getIO()
    io.sockets.on('connection', function(s){
      setTimeout(() => s.emit('tweets', buf), 1000)
    })

    tweets.on('tweet', async tweet => {
      const tweetId = tweet.id_str
      const tweetText = tweet.extended_tweet ? tweet.extended_tweet.full_text : tweet.text
      const userFollowers = tweet.user.followers_count
      const userName = tweet.user.name
      const userScreenName = tweet.user.screen_name

      const url = `https://twitter.com/${userScreenName}/status/${tweetId}`
      const fields = {
        followers: userFollowers,
        author: userScreenName,
        name: userName,
        avatar: tweet.user.profile_image_url_https,
        tweet: tweetText,
        id: tweetId,
        url: url,
      }

      buf.push(fields)
      buf = _.last(buf, 10)
      // console.log(buf)

      const io = getIO()
      if (io) io.emit('tweet', fields)

      // Airtable('TweetQuestions').create([{ fields }])
    })
  } catch (e) {
    console.log(e)
  }
}

job()
