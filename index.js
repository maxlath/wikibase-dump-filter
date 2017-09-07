const program = require('./lib/program')()
const entityReader = require('./lib/entity_reader')
const entityWriter = require('./lib/entity_writer')
const filter = require('./lib/filter')
const wikidataFilter = require('./lib/wikidata_filter')(program)
const handleErrors = require('./lib/handle_errors')

entityReader(process.stdin)
.pipe(filter(wikidataFilter))
.pipe(filter(entityWriter))
.pipe(process.stdout)
.on('error', handleErrors)
