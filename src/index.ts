import Twitter from "./lib/twitter"
import Airtable from './lib/airtables'


export default async () => {
  const tweets = await Twitter.getTweet('corona')

  tweets.on('tweet', (tweet) => {
    const tweetId = tweet.id
    const tweetText = tweet.text
    const userId = tweet.user.id
    const userName = tweet.user.name
    const userScreenName = tweet.user.screen_name

    const fields = {
      fields: {
        "Tweet Copy": tweetText,
        "Tweet URL": `http://twitter.com/web/tweet/${tweetId}`,
        "Tweet Author Name": userName,
        "Author Followers Count": 100,
        "Tweet Author Handle": userScreenName,
        "Question Header": tweetText
      }
    }

    Airtable('TweetQuestions').create([fields])

    // Airtable('Expert Content').create([fields], (err, records) => {
    //   console.error(records, err)
    //   if (err) return
    //   // records.forEach(record => console.log(record.getId()))
    // })

    // console.log(tweetId, tweetText, userId, userName, userScreenName)
  })
}
