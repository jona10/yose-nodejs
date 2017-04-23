'use strict'

const cheerio = require('cheerio')
const request = require('request-promise')
const Yose = require('../../src/yose')
const HomePageDriver = require('./homePageDriver')
const MinesweeperPageDriver = require('./minesweeperPageDriver')

class YoseRunner {
  constructor() {
    this._server = new Yose()
  }

  _address() {
    return 'http://127.0.0.1:' + this._server.port()
  }

  _webPage(path) {
    return {
      uri: this._address() + path,
      transform: cheerio.load,
    }
  }

  run() {
    this._server.start(9000)
  }

  stop() {
    this._server.stop()
  }

  homePage() {
    return new HomePageDriver(this._address())
  }

  minesweeperPage() {
    return request(this._webPage('/minesweeper')).then($ => new MinesweeperPageDriver($))
  }
}

module.exports = YoseRunner