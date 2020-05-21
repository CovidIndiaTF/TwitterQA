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
    const tweets = await Twitter.getTweet('#NTFDemoDay')

    tweets.on('tweet', async tweet => {
      const tweetId = tweet.id_str
      const tweetText = tweet.extended_tweet ? tweet.extended_tweet.full_text : tweet.text
      const userFollowers = tweet.user.followers_count
      const userName = tweet.user.name
      const userScreenName = tweet.user.screen_name

      if (tweet.retweeted) return
      if (tweet.is_quote_status || tweet.retweeted_status) return

      console.log(tweet)

      const url = `https://twitter.com/${userScreenName}/status/${tweetId}`
      const fields = {
        'Author Followers Count': userFollowers,
        'Tweet Author Handle': userScreenName,
        'Tweet Author Name': userName,
        'Tweet Copy': tweetText,
        'Tweet Id': tweetId,
        'Tweet URL': url,
        'Avatar': tweet.user.profile_image_url_https
      }

      console.log(fields)
      Airtable('TweetQuestions').create([{ fields }])
    })
  } catch (e) {
    console.log(e)
  }
}

job()
