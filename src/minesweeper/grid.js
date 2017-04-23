'use strict'

module.exports = (width, height) => {
  let rows = []
  for (let h = 1; h <= height; h += 1) {
    let cells = []
    for (let w = 1; w <= width; w += 1) {
      cells.push({x: w, y: h})
    }

    rows.push({cells: cells})
  }

  return {rows: rows}
}