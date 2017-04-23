'use strict'

const express = require('express')

let router = express.Router()

router.get('/', (request, response) => {
  response.render('index')
})

router.get('/ping', (request, response) => {
  response.json({alive: true})
})

router.get('/minesweeper', (request, response) => {
  response.render('minesweeper')
})

module.exports = router