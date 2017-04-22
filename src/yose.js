'use strict'

const express = require('express')
const http = require('http')
const path = require('path')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const lessMiddleware = require('less-middleware')
const routes = require('./routes')
const loggers = require('./loggers')

class Yose {
  constructor() {
    this._server = null
    this._logger = loggers.off()
  }

  static _notFoundMiddleware(request, response, next) {
    let error = new Error('Not Found')
    error.status = 404
    next(error)
  }

  static _unhandledErrorMiddleware(error, request, response) {
    response.status(error.status || 500)
    response.render('error')
  }

  _onListening() {
    this._logger.info('Yose sever listening on ' + this.address())
  }

  _onClose() {
    this._logger.info('Yose sever is shutting down')
  }

  _createApplication() {
    let application = express()
    application.set('views', path.join(__dirname, 'views'))
    application.set('view engine', 'hbs')
    application.use(favicon(path.join(__dirname, 'public', 'favicon.png')))
    application.use(require('morgan')('dev', {stream: this._logger.stream}))
    application.use(bodyParser.json())
    application.use(bodyParser.urlencoded({extended: false}))
    application.use(cookieParser())
    application.use(lessMiddleware(path.join(__dirname, 'public')))
    application.use(express.static(path.join(__dirname, 'public')))
    application.use('/', routes.home)
    application.use(Yose._notFoundMiddleware)
    application.use(Yose._unhandledErrorMiddleware)

    return application
  }

  logOn(logger) {
    this._logger = logger
  }

  address() {
    let address = this._server.address()
    return 'http://' + address.address + ':' + address.port
  }

  start(port, hostname) {
    this._server = http.createServer(this._createApplication())
    this._server.on('listening', this._onListening.bind(this))
    this._server.on('close', this._onClose.bind(this))
    this._server.listen(port, hostname)
  }

  stop() {
    this._server.close()
  }
}

module.exports = Yose