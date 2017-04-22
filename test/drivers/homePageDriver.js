'use strict'

const chai = require('chai')
const cheerio = require('cheerio')
const chaiCheerio = require('chai-cheerio')
const request = require('request-promise')

const expect = chai.expect
chai.use(chaiCheerio)

class HomePageDriver {
  constructor(address) {
    this._address = address
  }

  _webPage(path) {
    return {
      uri: this._address + path,
      transform: cheerio.load,
    }
  }

  _api(path) {
    return {
      uri: this._address + path,
      json: true,
    }
  }

  greets() {
    return request(this._webPage('/')).then($ => {
      let greeting = $('h1')

      expect(greeting).to.exist
      expect(greeting).to.have.text('Hello Yose')
    })
  }

  isAlive() {
    return request(this._api('/ping')).then(json => {
      expect(json).to.deep.equal({alive: true})
    })
  }

  linksToRepository() {
    return request(this._webPage('/')).then($ => {
      let link = $('a#repository-link')

      expect(link).to.exist
      expect(link).to.have.prop('href', 'https://github.com/jona10/yose-nodejs')
      expect(link).to.have.prop('target', '_blank')
      expect(link).to.have.text('Github')
    })
  }

  sharesContacts() {
    return request(this._webPage('/')).then($ => {
      let contact = $('a#contact-me-link')

      expect(contact).to.exist
      expect(contact).to.have.prop('href', 'mailto:jonathan.falardeau@gmail.com')
      expect(contact).to.have.text('Jonathan Falardeau')
    })
  }
}

module.exports = HomePageDriver