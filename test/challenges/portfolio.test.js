'use strict'

const YoseRunner = require('../drivers/yoseRunner')

describe('The portfolio challenge', () => {
  let yose

  before(() => {
    yose = new YoseRunner()
    yose.run()
  })

  after(() => {
    yose.stop()
  })

  it('should share contact informations', () => {
    return yose.homePage().sharesContacts()
  })
})