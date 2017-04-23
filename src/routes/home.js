'use strict'

const express = require('express')
const grid = require('./../minesweeper/grid')

let router = express.Router()

router.get('/', (request, response) => {
  response.render('index')
})

router.get('/ping', (request, response) => {
  response.json({alive: true})
})

router.get('/minesweeper', (request, response) => {
  response.render('minesweeper', {grid: grid(8, 8)})
})

module.exports = router