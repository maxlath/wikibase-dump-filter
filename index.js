const entityParser = require('./lib/entity_parser')
const entitySerializer = require('./lib/entity_serializer')
const wikidataFilter = require('./lib/wikidata_filter')

module.exports = {
  parser: entityParser,
  serializer: entitySerializer,
  filter: wikidataFilter,
  run: () => {
    const program = require('./lib/program')()
    const handleErrors = require('./lib/handle_errors')

    entityParser(process.stdin)
    .filter(wikidataFilter(program))
    .filter(entitySerializer)
    .pipe(process.stdout)
    .on('error', handleErrors)
  }
}
