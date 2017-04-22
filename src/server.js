'use strict'

const Yose = require('./yose')
const loggers = require('./loggers')

const shutdown = () => {
  yose.stop()
  process.exit(0)
}

let yose = new Yose()
yose.logOn(loggers.console())
yose.start(process.env.PORT || 3000)

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
