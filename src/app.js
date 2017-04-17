'use strict'

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const lessMiddleware = require('less-middleware')
const routes = require('./routes')

let notFoundMiddleware = (request, response, next) => {
  let error = new Error('Not Found')
  error.status = 404
  next(error)
}

let unhandledErrorMiddleware = (error, request, response) => {
  // set locals, only providing error in development
  response.locals.message = error.message
  response.locals.error = request.app.get('env') === 'development' ? error : {}

  // render the error page
  response.status(error.status || 500)
  response.render('error')
}

module.exports = (port, logger) => {
  let app = express()

  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'hbs')
  app.set('port', port)
  app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))
  if (logger) {
    app.use(logger)
  }
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(cookieParser())
  app.use(lessMiddleware(path.join(__dirname, 'public')))
  app.use(express.static(path.join(__dirname, 'public')))
  app.use('/', routes.home)
  app.use(notFoundMiddleware)
  app.use(unhandledErrorMiddleware)

  return app
}