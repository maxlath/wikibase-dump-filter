program = require 'commander'
pkg = require '../../package.json'
validateArgs = require './validate_arguments'

module.exports = ->
  program
  .version pkg.version
  .option '-c, --claim <claim>', help.claim
  .option '-o, --omit <attributes>', help.omit, list
  .option '-k, --keep <attributes>', help.keep, list
  .option '-t, --type <type>', help.type
  .parse process.argv

  { claim, omit, keep, type } = program

  # if no argument is defined but an argument was passed
  # take it as a claim
  unless claim? or omit? or keep? or type?
    [ fisrtArg ] = process.argv.slice 2
    if fisrtArg? then program.claim = fisrtArg

  validateArgs program

  return program

list = (val)-> val.split ','

help =
  claim: """
    Specify the claim the entity should have to pass the filter.
    \t\t\t\tExample: to keep only entities of humans: `wikidata-filter -c P31:Q5`\n"""

  omit: """
    Specify the entities attributes to omit among wikidata entities attributes: type, labels, descriptions, aliases, claims, sitelinks.
    \t\t\t\tExample: to keep only labels and descriptions: `wikidata-filter -o aliases,claims,sitelink`\n"""

  keep: """
    The inverse of omit: specify the attributes to keep.
    \t\t\t\tExample: to keep only labels and descriptions: `wikidata-filter -k labels,descriptions`\n"""

  type: """
    Specify which entity type should be kept: item, property or both.
    \t\t\t\tDefaults to item
    """
