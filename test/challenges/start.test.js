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

  it('should greet', () => {
    return fetch('http://127.0.0.1:9000/').then(response => response.text()).then(body => {
      expect(body).to.contain('Hello Yose')
    })
  })

  it('should be alive', () => {
    return fetch('http://127.0.0.1:9000/ping').then(response => response.json()).then(json => {
      expect(json).to.deep.equal({alive: true})
    })
  })

  it('should link to repository', () => {
    return fetch('http://127.0.0.1:9000/').then(response => response.text()).then(body => {
      expect(body).to.contain('<a href="https://github.com/jona10/yose-nodejs" target="_blank">Github</a>')
    })
  })
})
