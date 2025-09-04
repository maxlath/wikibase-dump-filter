import through from 'through'

export default {
  // Mimicking Array.prototype.map behavior
  map: mapFn => {
    return through(function (data) {
      try {
        const result = mapFn(data)
        this.queue(result)
      } catch (err) {
        this.emit('error', err)
      }
    })
  },

  // Mimicking Array.prototype.filter behavior
  filter: testFn => {
    return through(function (data) {
      try {
        const result = testFn(data)
        // Return the original data
        if (result) this.queue(data)
      } catch (err) {
        this.emit('error', err)
      }
    })
  },

  // Mixing map and filter behavior
  filterAndMap: mapAndTestFn => {
    return through(function (data) {
      try {
        const result = mapAndTestFn(data)
        if (result) this.queue(result)
      } catch (err) {
        this.emit('error', err)
      }
    })
  },

  // Mimicking Bluebird.prototype.tap behavior
  tap: tapFn => {
    return through(function (data) {
      try {
        tapFn(data)
        this.queue(data)
      } catch (err) {
        this.emit('error', err)
      }
    })
  },
}
