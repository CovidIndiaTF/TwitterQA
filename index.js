/**
 * Entry Script
 */
require('dotenv').config()
const express = require('express')
const path = require('path')
const http = require('http')

process.env.ROOT_PATH = __dirname


const app = express();

app.use(express.static(path.join(__dirname, './client')))

http.createServer(app).listen(3000, () => console.info(`Server running on port 3000`))

if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'test') {
  require('./dist')
  return
}

require('./src')
