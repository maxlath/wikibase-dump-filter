const split = require('split')
const filter = require('./filter')
const parseLine = require('./parse_line')
const wikidataFilter = require('./wikidata_filter')

module.exports = function (stream, filterOptions) {
  const reader = stream
    .pipe(split())
    .pipe(filter(validEntity))

  const parser = withFilterMethod(reader)

  if (!filterOptions) return parser
  return parser.filter(wikidataFilter(filterOptions))
}

const validEntity = line => {
  const entity = parseLine(line)
  if (!entity) return null
  return entity
}

function withFilterMethod (stream) {
  stream.filter = function (filterFn) {
    return withFilterMethod(this.pipe(filter(filterFn)))
  }
  return stream
}
