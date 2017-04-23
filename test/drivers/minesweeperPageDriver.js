'use strict'

const chai = require('chai')
const chaiCheerio = require('chai-cheerio')

const expect = chai.expect
chai.use(chaiCheerio)

class MinesweeperPageDriver {
  constructor(dom) {
    this._dom = dom
  }

  hasTitle(title) {
    expect(this._dom('#title')).to.have.text(title)
  }

  hasGrid(height, width) {
    let cells = this._dom('.cell')

    expect(cells.length).to.equal(height * width)
    for (let w = 1; w <= width; w += 1) {
      for (let h = 1; h <= height; h += 1) {
        expect(this._dom('#cell-' + w + 'x' + h)).to.exist
      }
    }
  }
}

module.exports = MinesweeperPageDriver