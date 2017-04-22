'use strict'

const Yose = require('./yose')
const loggers = require('./loggers')

class Server {
  constructor() {
    this._yose = new Yose()
  }

  start(port) {
    this._yose.logOn(loggers.console())
    this._yose.start(port)
  }
}

let server = new Server()
server.start(process.env.PORT || 3000)
