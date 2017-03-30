const program = require('commander')
const pkg = require('../../package.json')
const validateArgs = require('./validate_arguments')

module.exports = function () {
  program
  .version(pkg.version)
  // filters
  .option('-t, --type <type>', help.type)
  .option('-c, --claim <claim>', help.claim)
  .option('-i, --sitelink <sitelink>', help.sitelink)
  // formatters
  .option('-o, --omit <attributes>', help.omit, list)
  .option('-k, --keep <attributes>', help.keep, list)
  .option('-l, --languages <languages>', help.languages, list)
  .option('-s, --simplified', help.simplified)
  .parse(process.argv)

  const { type, claim, sitelink, omit, keep } = program

  // if no argument is defined but an argument was passed
  // take it as a claim
  if (!(type || claim || sitelink || omit || keep)) {
    const [ fisrtArg ] = process.argv.slice(2)
    if (fisrtArg) program.claim = fisrtArg
  }

  validateArgs(program)

  return program
}

const list = (val) => val.split(',')

const help = {
  claim: `
    Specify the claim the entity should have to pass the filter.
    \t\t\t\tExample: to keep only entities of humans: wikidata-filter -c P31:Q5\n`,

  sitelink: `
    Specify the sitelink the entity should have to pass the filter.
    \t\t\t\tExample: to keep only entities with an article in the Spanish Wikipedia: wikidata-filter --sitelink eswiki\n`,

  omit: `
    Specify the entities attributes to omit among wikidata entities attributes: type, labels, descriptions, aliases, claims, sitelinks.
    \t\t\t\tExample: to keep only labels and descriptions: wikidata-filter -o aliases,claims,sitelink\n`,

  keep: `
    The inverse of omit: specify the attributes to keep.
    \t\t\t\tExample: to keep only labels and descriptions: wikidata-filter -k labels,descriptions\n`,

  type: `
    Specify which entity type should be kept: item, property or both. Defaults to item.
    `,

  languages: `
    Specify for which languages labels, descriptions and aliases should be kept.
    `,

  simplified: `
    Flag to simplify claims values. Defaults to false.
    `
}
