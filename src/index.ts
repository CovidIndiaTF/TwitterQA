import Twitter from './lib/twitter'
import Airtable from './lib/airtables'
import checkUnansweredTweets from './checkUnansweredTweets'
import * as cron from 'node-cron'



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

    console.log(tweet)

    const fields = {
      'Author Followers Count': userFollowers,
      'Tweet Author Handle': userScreenName,
      'Tweet Author Name': userName,
      'Tweet Copy': tweetText,
      'Tweet Id': tweetId,
      'Tweet URL': `https://twitter.com/${userScreenName}/status/${tweetId}`,
    }

    // console.log(tweet)

    Airtable('TweetQuestions').create([{ fields }])
  })
}

job()
