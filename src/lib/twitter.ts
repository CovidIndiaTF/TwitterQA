import * as Twit from 'twit'


class Twitter {
  consumer_key: string
  consumer_secret: string
  access_token: string
  access_token_secret:string
  twitter: Twit

  constructor (consumer_key, consumer_secret, access_token, access_token_secret) {
    this.consumer_key = consumer_key
    this.consumer_secret = consumer_secret
    this.access_token = access_token
    this.access_token_secret = access_token_secret

    this.twitter = new Twit({
      consumer_key: consumer_key,
      consumer_secret: consumer_secret,
      access_token: access_token,
      access_token_secret: access_token_secret
    })
  }

  async getTweet(hashtag) {
    console.log('streaming hashtag', hashtag)
    return this.twitter.stream('statuses/filter', { track: hashtag })
  }


  async replyToTweet (tweetId: string, username: string, text: string) {
    const body = {
      in_reply_to_status_id: tweetId,
      status: `@${username} ${text}`
    }

    console.log(body)

    return new Promise((resolve, reject) => {
      this.twitter.post('statuses/update', body, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }
}

const instance = new Twitter(
  process.env.consumer_key,
  process.env.consumer_secret,
  process.env.access_token,
  process.env.access_token_secret
)

export default instance
