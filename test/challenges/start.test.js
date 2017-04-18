'use strict'

const expect = require('chai').expect
const fetch = require('node-fetch')
const Yose = require('../../src/yose')

describe('The game', () => {
  let server

  before(() => {
    server = new Yose(9000)
    server.start()
  })

  after(() => {
    server.stop()
  })

  it('should serve a page greeting the user', () => {
    return fetch('http://127.0.0.1:9000/').then(response => {
      return response.body.read().toString()
    }).then(body => {
      expect(body).to.contain('Hello Yose')
    })
  })
})
