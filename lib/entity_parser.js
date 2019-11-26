const split = require('split')
const filter = require('./filter')
const parseLine = require('./parse_line')
const wikidataFilter = require('./wikidata_filter')

module.exports = (stream, filterOptions) => {
  const reader = stream
    .pipe(split())
    .pipe(filter(validEntity))

  const parser = addFilterMethod(reader)

  if (!filterOptions) return parser
  return parser.filter(wikidataFilter(filterOptions))
}

const validEntity = line => {
  const entity = parseLine(line)
  if (!entity) return null
  return entity
}

const addFilterMethod = stream => {
  stream.filter = filterFn => {
    return addFilterMethod(stream.pipe(filter(filterFn)))
  }
  return stream
}
