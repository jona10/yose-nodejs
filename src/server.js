'use strict'

const createYose = require('./app')
const http = require('http')
const debug = require('debug')
const logger = require('morgan')

class Server {
  constructor(port) {
    this._port = port
    this._server = null
  }

  _onError(error) {
    if (error.syscall !== 'listen') {
      throw error
    }

    let bind = 'Port ' + this._port
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        break
      default:
        throw error
    }

    process.exit(1)
  }

  _onListening() {
    let address = this._server.address()
    let bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port
    console.log('Listening on ' + bind)
  }

  start() {
    this._server = http.createServer(createYose(this._port, logger('dev')))
    this._server.listen(this._port)
    this._server.on('error', this._onError.bind(this))
    this._server.on('listening', this._onListening.bind(this))
  }
}

debug('src:server')

let server = new Server(process.env.PORT || 3000)
server.start()
