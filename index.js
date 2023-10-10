const express = require('express')
const bodyParser = require('body-parser')
const { Blockchain } = require('./blockchain')
const Block = require('./block')

const app = express()
const blockchain = new Blockchain()

app.use(bodyParser.json())

app.get('/api/blocks', (req, res) => {
  res.status(200).json(blockchain.chain)
})

app.post('/api/mine', (req, res) => {
  const data = req.body
  console.log('in /api/mine, data: ', req.body)
  blockchain.addBlock(data)
  res.redirect('/api/blocks')
})

const server = app.listen(3000, () => {
  console.log('Blockchain node started.')
})

console.log('Listening on: ', server.address().address, server.address().port)

module.exports = { app, server }
