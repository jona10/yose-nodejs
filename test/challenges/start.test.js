'use strict'

const chai = require('chai')
const cheerio = require('cheerio')
const chaiCheerio = require('chai-cheerio')
const fetch = require('node-fetch')
const Yose = require('../../src/yose')

const expect = chai.expect
chai.use(chaiCheerio)

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
    return fetch('http://127.0.0.1:9000/').then(response => cheerio.load(response.text())).then($ => {
      let greeting = $('h1')

      expect(greeting).to.exist
      expect(greeting).to.have.text('Hello Yose')
    })
  })

  it('should be alive', () => {
    return fetch('http://127.0.0.1:9000/ping').then(response => response.json()).then(json => {
      expect(json).to.deep.equal({alive: true})
    })
  })

  it('should link to repository', () => {
    return fetch('http://127.0.0.1:9000/').then(response => cheerio.load(response.text())).then($ => {
      let link = $('a#repository-link')

      expect(link).to.exist
      expect(link).to.have.prop('href', 'https://github.com/jona10/yose-nodejs')
      expect(link).to.have.prop('target', '_blank')
      expect(link).to.have.text('Github')
    })
  })
})
