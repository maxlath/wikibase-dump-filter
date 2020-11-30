module.exports = {
  claim: `
    Specify the claim the entity should have to pass the filter.
    Example: to keep only entities of humans: wikibase-dump-filter -c P31:Q5\n`,

  sitelink: `
    Specify the sitelink the entity should have to pass the filter.
    Example: to keep only entities with an article in the Spanish Wikipedia: wikibase-dump-filter --sitelink eswiki\n`,

  omit: `
    Specify the entities attributes to omit among wikidata entities attributes: type, labels, descriptions, aliases, claims, sitelinks
    Example: to keep only labels and descriptions: wikibase-dump-filter -o aliases,claims,sitelinks\n`,

  keep: `
    The inverse of omit: specify the attributes to keep: type, labels, descriptions, aliases, claims, sitelinks
    Example: to keep only labels and descriptions: wikibase-dump-filter -k labels,descriptions\n`,

  type: `
    Specify which entity type should be kept: item, property or both. Defaults to item.
    `,

  languages: `
    Specify for which languages labels, descriptions and aliases should be kept.
    `,

  simplify: `
    Flag to simplify claims values. Defaults to false.
    Can also accept wikibase-sdk simplify.entity option object as JSON or key=values: wikibase-dump-filter --simplify 'keepQualifiers=true&keepRichValues=true'
    `,

  progress: `
    Show the progress bar. Defaults to 'false' when stdout is a terminal, 'true' otherwise
    `,

  quiet: `
    Disable the progress bar
    `
}
