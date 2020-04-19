require('dotenv').config()

import { Twitter } from '../botLogic'

const twitter = new Twitter(process.env.consumer_key, process.env.consumer_secret, process.env.access_token, process.env.access_token_secret)

const run = async () => {
  console.log('test')
  const tweets = await twitter.getTweet('corona')
  console.log('tweets', tweets)
}

run()
