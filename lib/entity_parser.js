const split = require('split')
const filter = require('./filter')
const parseLine = require('./parse_line')

module.exports = function (stream) {
  const reader = stream
    .pipe(split())
    .pipe(filter(line => {
      const entity = parseLine(line)
      if (!entity) return null
      return entity
    }))
  return withFilterMethod(reader)
}

function withFilterMethod (stream) {
  stream.filter = function (test) {
    return withFilterMethod(this.pipe(filter(test)))
  }
  return stream
}
