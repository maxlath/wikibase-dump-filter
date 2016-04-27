split = require 'split'
program = require('./lib/program')()
filter = require './lib/filter'
wikidataFilter = require('./lib/wikidata_filter')(program)
handleErrors = require './lib/handle_errors'

process.stdin
.pipe split()
.pipe filter(wikidataFilter)
.pipe process.stdout
.on 'error', handleErrors
