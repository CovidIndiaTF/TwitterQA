require('dotenv').config()

import { Twitter } from '../botLogic'

const twitter = new Twitter(process.env.consumer_key, process.env.consumer_secret, process.env.access_token, process.env.access_token_secret)

const streamTweets = async () => {
  console.log('bot sagar test')
  const tweets = await twitter.getTweet('corona')

  tweets.on('tweet', (tweet) => {
    console.log(tweet)
  })
}

//streamTweets()


const test = async () => {
  const reply = await twitter.replyToTweet(tweetId, referencedAuthorScreenName, text)
}
