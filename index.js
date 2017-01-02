const split = require('split')
const program = require('./lib/program')()
const filter = require('./lib/filter')
const wikidataFilter = require('./lib/wikidata_filter')(program)
const handleErrors = require('./lib/handle_errors')

process.stdin
.pipe(split())
.pipe(filter(wikidataFilter))
.pipe(process.stdout)
.on('error', handleErrors)
