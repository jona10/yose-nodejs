'use strict'

const YoseRunner = require('../drivers/yoseRunner')

describe('The minesweeper challenge', () => {
  let yose

  before(() => {
    yose = new YoseRunner()
    yose.run()
  })

  after(() => {
    yose.stop()
  })

  it('should display an eight by eight grid', () => {
    return yose.minesweeperPage().then(driver => {
      driver.hasTitle('Minesweeper')
      driver.hasGrid(8, 8)
    })
  })
})