'use strict'

const Yose = require('../../src/yose')
const HomePageDriver = require('./homePageDriver')

class YoseRunner {
  constructor() {
    this._server = new Yose()
  }

  _address() {
    return 'http://127.0.0.1:' + this._server.port()
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
}

module.exports = YoseRunner