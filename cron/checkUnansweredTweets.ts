require('dotenv').config()

const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.airtable_key }).base('appzo9fDle7O3x6GE')

export const unansweredTweets = async () => {
  base('Expert Content').select({
    filterByFormula: "({Answer Text} = '')"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(async function(record) {
      console.log('Unaswered Tweets :-', record.get('Question Header'), 'record id :-', record.id);
      return await `Unaswered Tweets :-, ${record.get('Question Header')}, 'record id :-', ${record.id}`
    });
    fetchNextPage();
  }, function done(err) {
    if (err) { console.error(err); return; }
  });
}
