const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

//custom middleware

function logger(req, res, next) {
  console.log(`Method: ${req.method}, URL: ${req.url}, Timestamp: ${req.timestamp}` )
  next();
};

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server;
