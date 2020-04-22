import * as Bluebird from 'bluebird'
import Twitter from './lib/twitter'
import Airtable from './lib/airtables'


export default async () => {
  const query = "AND(({Publish Tweet?} = 1), ({Tweet Response URL} = ''))"

  const recordsToUpdate = []

  const done = () => {
    if (recordsToUpdate.length === 0) return
    return Airtable('TweetQuestions').update(
      recordsToUpdate.map(record => ({
        id: record[0],
        fields: { "Tweet Response URL": "https://twitter.com/web/status/" + record[1] }
      }))
    )
  }

  Airtable('TweetQuestions')
    .select({ filterByFormula: query })
    .eachPage((records, fetchNextPage) => {

      // iterate through every record
      Bluebird.mapSeries(records, async record => {
        console.log('posting tweet response for', record.id)
        const t: any = await Twitter.replyToTweet(
          record.fields['Tweet Id'],
          record.fields['Tweet Author Handle'],
          record.fields['Tweet Response'],
        )

        recordsToUpdate.push([record.id, t.id_str])
      })
      .finally(fetchNextPage)
    })
    .then(done)
    .catch(console.log)
}
