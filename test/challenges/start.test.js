'use strict'

const chai = require('chai')
const cheerio = require('cheerio')
const chaiCheerio = require('chai-cheerio')
const request = require('request-promise')
const Yose = require('../../src/yose')

const expect = chai.expect
chai.use(chaiCheerio)

describe('The game', () => {
  let baseUri = 'http://127.0.0.1:9000'
  let server

  before(() => {
    server = new Yose(9000)
    server.start()
  })

  after(() => {
    server.stop()
  })

  describe('when querying the home page', () => {
    let options = {
      uri: baseUri + '/',
      transform: cheerio.load,
    }

    it('should greet', () => {
      return request(options).then($ => {
        let greeting = $('h1')

        expect(greeting).to.exist
        expect(greeting).to.have.text('Hello Yose')
      })
    })

    it('should link to repository', () => {
      return request(options).then($ => {
        let link = $('a#repository-link')

        expect(link).to.exist
        expect(link).to.have.prop('href', 'https://github.com/jona10/yose-nodejs')
        expect(link).to.have.prop('target', '_blank')
        expect(link).to.have.text('Github')
      })
    })
  })

  it('should be alive', () => {
    let options = {
      uri: baseUri + '/ping',
      json: true,
    }

    return request(options).then(json => {
      expect(json).to.deep.equal({alive: true})
    })
  })
})
