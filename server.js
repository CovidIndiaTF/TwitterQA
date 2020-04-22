const express = require('express');
const path = require('path');
const http = require('http')

const app = express();

app.use('/', express.static(path.join(__dirname, './client')))

http.createServer(app)
  .listen(3000, () => console.info(`Server running on port 3000`))
