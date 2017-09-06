const split = require('split')
const filter = require('./filter')
const parseLine = require('./parse_line')

module.exports = function (stream) {
  return stream.pipe(split()).pipe(filter((line) => {
    const entity = parseLine(line)
    if (!entity) return null
    return entity
  }))
}
