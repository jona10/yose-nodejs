'use strict'

const chai = require('chai')
const cheerio = require('cheerio')
const chaiCheerio = require('chai-cheerio')
const request = require('request-promise')
const Yose = require('../../src/yose')

const expect = chai.expect
chai.use(chaiCheerio)

describe('The portfolio challenge', () => {
  let server
  let homePage = () => {
    return {
      uri: server.address() + '/',
      transform: cheerio.load,
    }
  }

  before(() => {
    server = new Yose(9000)
    server.start()
  })

  after(() => {
    server.stop()
  })

  it('should share contact informations', () => {
    return request(homePage()).then($ => {
      let contact = $('a#contact-me-link')

      expect(contact).to.exist
      expect(contact).to.have.prop('href', 'mailto:jonathan.falardeau@gmail.com')
      expect(contact).to.have.text('Jonathan Falardeau')
    })
  })
})