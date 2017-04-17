'use strict'

const createYose = require('./app')
const http = require('http')
const debug = require('debug')
const logger = require('morgan')

let normalizePort = (val) => {
  let port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

let onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
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

let onListening = () => {
  let address = server.address()
  let bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port
  console.log('Listening on ' + bind)
}

debug('src:server')

let port = normalizePort(process.env.PORT || '3000')
let server = http.createServer(createYose(port, logger('dev')))
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
