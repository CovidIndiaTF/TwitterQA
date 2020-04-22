import Twitter from './lib/twitter'
import Telegram from './lib/telegram'
import Airtable from './lib/airtables'
import checkUnansweredTweets from './checkUnansweredTweets'
import * as cron from 'node-cron'

import './server'


const job = async () => {
  // Cron script to post the responses
  cron.schedule('*/10 * * * * *', checkUnansweredTweets)

  // Stream #AskCovidIndia
  const tweets = await Twitter.getTweet('#AskCovidIndiaTF')
  tweets.on('tweet', tweet => {
    const tweetId = tweet.id_str
    const tweetText = tweet.extended_tweet ? tweet.extended_tweet.full_text : tweet.text
    const userFollowers = tweet.user.followers_count
    const userName = tweet.user.name
    const userScreenName = tweet.user.screen_name

    if (tweet.retweeted) return
    if (tweet.is_quote_status || tweet.retweeted_status) return

    // console.log(tweet)

    const url = `https://twitter.com/${userScreenName}/status/${tweetId}`
    const fields = {
      'Author Followers Count': userFollowers,
      'Tweet Author Handle': userScreenName,
      'Tweet Author Name': userName,
      'Tweet Copy': tweetText,
      'Tweet Id': tweetId,
      'Tweet URL': url,
    }

    // inform the telegram group
    Telegram.sendMessage(
      '-492340375',
      `New tweet: @${userScreenName} (${userFollowers} followers)\n` +
      `URL: ${url}\n` +
      `Text: ${tweetText}`
    )

    console.log(tweet)

    Airtable('TweetQuestions').create([{ fields }])
  })
}

job()
