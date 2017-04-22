'use strict'

const YoseRunner = require('../drivers/yoseRunner')

describe('The start challenge', () => {
  let yose

  before(() => {
    yose = new YoseRunner()
    yose.run()
  })

  after(() => {
    yose.stop()
  })

  it('should greet', () => {
    return yose.homePage().greets()
  })

  it('should link to repository', () => {
    return yose.homePage().linksToRepository()
  })

  it('should be alive', () => {
    return yose.homePage().isAlive()
  })
})
