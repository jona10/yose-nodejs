'use strict'

const expect = require('chai').expect
const fetch = require('node-fetch')
const http = require('http')
const createYose = require('../../src/app')

describe('The game', () => {
  let server

  before(() => {
    server = http.createServer(createYose(3000))
    server.listen(3000)
  })

  after(() => {
    server.close()
  })

  it('should serve a page greeting the user', () => {
    return fetch('http://127.0.0.1:3000/').then(response => {
      return response.body.read().toString()
    }).then(body => {
      expect(body).to.contain('Hello Yose')
    })
  })
})
