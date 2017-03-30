const pick = require('lodash.pick')
const wdk = require('wikidata-sdk')
const { attributesWithLanguages } = require('./lists')

module.exports = (entity, formatData) => {
  const { keep, languages, simplified } = formatData
  const filterAttributes = keep != null
  const filterLanguages = languages != null

  // keep only the desired attributes
  if (filterAttributes) entity = pick(entity, keep)

  // with the desired languages
  if (filterLanguages) {
    for (let attr of attributesWithLanguages) {
      if (entity[attr] != null) {
        entity[attr] = pick(entity[attr], languages)
      }
    }
  }

  // with simplified claims if requested
  if (simplified) {
    if (entity.claims != null) {
      entity.claims = wdk.simplifyClaims(entity.claims)
    }
  }

  // and return a string back
  return JSON.stringify(entity) + '\n'
}
