const split = require('split')
const filter = require('./filter')
const parseLine = require('./parse_line')
const wikidataFilter = require('./wikidata_filter')

module.exports = function (stream, filterOptions) {
  const reader = stream
    .pipe(split())
    .pipe(filter(line => {
      const entity = parseLine(line)
      if (!entity) return null
      return entity
    }))
  const parser = withFilterMethod(reader)
  return filterOptions
    ? parser.filter(wikidataFilter(filterOptions))
    : parser
}

function withFilterMethod (stream) {
  stream.filter = function (test) {
    return withFilterMethod(this.pipe(filter(test)))
  }
  return stream
}
