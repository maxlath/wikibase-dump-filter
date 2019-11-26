const through = require('through')

module.exports = {
  // Mimicking Array.prototype.map behavior
  map: mapFn => {
    return through(function (data) {
      const result = mapFn(data)
      this.queue(result)
    })
  },

  // Mimicking Array.prototype.filter behavior
  filter: testFn => {
    return through(function (data) {
      const result = testFn(data)
      // Return the original data
      if (result) this.queue(data)
    })
  },

  // Mixing map and filter behavior
  mapAndFilter: mapAndTestFn => {
    return through(function (data) {
      const result = mapAndTestFn(data)
      if (result) this.queue(result)
    })
  },

  // Mimicking Bluebird.prototype.tap behavior
  tap: tapFn => {
    return through(function (data) {
      tapFn(data)
      this.queue(data)
    })
  }
}
