import Airtable from './lib/airtables'
const express = require('express')
const path = require('path')
const http = require('http')

const app = express();

app.use(express.static(path.join(process.env.ROOT_PATH, './client')))

app.get('/questions/:id', (req, res) => {
  Airtable('TweetQuestions').find(req.params.id)
  .then(q => res.json({ ...q.fields, id: q.id }))
  .catch(() => res.json({ }))
})

app.get('/questions', (req, res) => {
  Airtable('TweetQuestions').select({ view: 'Answered Questions', maxRecords: 25 }).firstPage()
  .then(q => res.json(q.map(q => ({ ...q.fields, id: q.id }))))
  .catch(() => res.json({ }))
})

http.createServer(app).listen(3000, () => console.info(`Server running on port 3000`))
