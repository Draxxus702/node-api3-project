const express = require('express');
const helmet = require('helmet')
const cors = require('cors')
const postRouter = require('./posts/postRouter.js')
const userRouter = require('./users/userRouter.js')
const server = express();

server.use(express.json())
server.use(helmet())
// server.use(cors)
server.use(logger)
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const method = req.method
  const endpoint = req.originalURL
  const time = Date.now()


  console.log(`${method} to ${endpoint} at ${time}`)
  next()
}

module.exports = server;
