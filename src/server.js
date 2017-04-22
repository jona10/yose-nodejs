'use strict'

const Yose = require('./yose')
const loggers = require('./loggers')

class Server {
  constructor(port) {
    this._port = port
    this._yose = new Yose(port)
  }

  start() {
    this._yose.logOn(loggers.console())
    this._yose.start()
  }
}

let server = new Server()
server.start(process.env.PORT || 3000)
