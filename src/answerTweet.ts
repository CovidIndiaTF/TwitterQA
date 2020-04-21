require('dotenv').config()

const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.airtable_key}).base('appzo9fDle7O3x6GE')

const answerTweet = async (recordId, answerText, answerAuthor, authorTwitterHandle) => {
  base('Expert Content').update([
    {
      "id": recordId,
      "fields": {
        "Answer Text": answerText,
        "Answer Author": answerAuthor,
        "Author Twitter Handle": authorTwitterHandle
      }
    }
  ], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function(record) {
      console.log(record.get('Answer Text'));
    });
  });
}

answerTweet('reclD2arlZlGOYJCS', 'Testing', 'sagar', '@sagar')
