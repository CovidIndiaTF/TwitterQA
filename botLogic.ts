const Twit = require('twit');

export class Twitter {
  consumer_key:string;
  consumer_secret: string;
  access_token: string;
  access_token_secret:string;

  twitter:any

  constructor (consumer_key, consumer_secret, access_token, access_token_secret) {
    this.consumer_key = consumer_key;
    this.consumer_secret = consumer_secret;
    this.access_token = access_token;
    this.access_token_secret = access_token_secret;

    this.twitter = new Twit({
      consumer_key: consumer_key,
      consumer_secret: consumer_secret,
      access_token: access_token,
      access_token_secret: access_token_secret
    })
  }

  async getTweet(hashtag){
    let tweet = new Promise((resolve, reject) => {
      this.twitter.get('search/tweets', { q: hashtag }, (err, data, response) => {
        resolve(data)
      })
    })

    return await tweet;
  }
}
