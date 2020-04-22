const express = require('express');
const path = require('path');
const http = require('http')

const app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.htm'));
})

http.createServer(app)
  .listen(3000, () => console.info(`Server running on port 3000`))
