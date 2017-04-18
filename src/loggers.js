'use strict'

const winston = require('winston')

let _createLogger = (transports) => {
  let logger = new winston.Logger({
    transports: transports,
    exitOnError: false,
  })

  logger.stream = {
    write: logger.info,
  }

  return logger
}

let _consoleTransport = () => {
  return new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  })
}

let off = () => {
  return _createLogger([])
}

let console = () => {
  return _createLogger([_consoleTransport()])
}

module.exports = {
  off: off,
  console: console,
}