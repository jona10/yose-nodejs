'use strict'

const chai = require('chai')
const cheerio = require('cheerio')
const chaiCheerio = require('chai-cheerio')
const request = require('request-promise')
const Yose = require('../../src/yose')

const expect = chai.expect
chai.use(chaiCheerio)

describe('The start challenge', () => {
  let server
  let homePage = () => {
    return {
      uri: server.address() + '/',
      transform: cheerio.load,
    }
  }

  let ping = () => {
    return {
      uri: server.address() + '/ping',
      json: true,
    }
  }

  before(() => {
    server = new Yose()
    server.start(9000, '127.0.0.1')
  })

  after(() => {
    server.stop()
  })

  it('should greet', () => {
    return request(homePage()).then($ => {
      let greeting = $('h1')

      expect(greeting).to.exist
      expect(greeting).to.have.text('Hello Yose')
    })
  })

  it('should link to repository', () => {
    return request(homePage()).then($ => {
      let link = $('a#repository-link')

      expect(link).to.exist
      expect(link).to.have.prop('href', 'https://github.com/jona10/yose-nodejs')
      expect(link).to.have.prop('target', '_blank')
      expect(link).to.have.text('Github')
    })
  })

  it('should be alive', () => {
    return request(ping()).then(json => {
      expect(json).to.deep.equal({alive: true})
    })
  })
})
