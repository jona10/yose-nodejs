'use strict'

const chai = require('chai')
const grid = require('../../../src/minesweeper/grid')

const expect = chai.expect

describe('The minesweeper grid', () => {
  it('should generate a matrix of correct dimensions', () => {
    let actual = grid(8, 8)
    expect(actual.rows).to.have.lengthOf(8)
    for (let row of actual.rows) {
      expect(row.cells).to.have.lengthOf(8)
    }
  })
})