'use strict'

const express = require('express')
const http = require('http')
const path = require('path')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const lessMiddleware = require('less-middleware')
const routes = require('./routes')
const loggers = require('./loggers')

class Yose {
  constructor() {
    this._server = null
    this._logger = loggers.off()
  }

  _onListening() {
    this._logger.info('Yose server listening on port ' + this.port())
  }

  _createApplication() {
    let application = express()
    application.set('views', path.join(__dirname, 'views'))
    application.set('view engine', 'hbs')
    application.use(favicon(path.join(__dirname, 'public', 'favicon.png')))
    application.use(require('morgan')('dev', {stream: this._logger.stream}))
    application.use(bodyParser.json())
    application.use(bodyParser.urlencoded({extended: false}))
    application.use(lessMiddleware(path.join(__dirname, 'public')))
    application.use(express.static(path.join(__dirname, 'public')))
    application.use('/vendors', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')))
    application.use('/', routes.home)

    return application
  }

  logOn(logger) {
    this._logger = logger
  }

  port() {
    return this._server.address().port
  }

  start(port) {
    this._server = http.createServer(this._createApplication())
    this._server.listen(port, this._onListening.bind(this))
  }

  stop() {
    this._logger.info('Yose server is shutting down')
    this._server.close()
  }
}

module.exports = Yose