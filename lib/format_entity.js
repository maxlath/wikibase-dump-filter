const pick = require('lodash.pick')
const wdk = require('wikidata-sdk')
const { attributesWithLanguages } = require('./lists')
const keepMatchingSitelinks = require('./keep_matching_sitelinks')

module.exports = (entity, formatData) => {
  const { keep, languages, simplified } = formatData
  const filterAttributes = keep != null
  const filterLanguages = languages != null

  // keep only the desired attributes
  if (filterAttributes) entity = pick(entity, keep)

  // with the desired languages
  if (filterLanguages) {
    attributesWithLanguages.forEach(attr => {
      if (entity[attr]) entity[attr] = pick(entity[attr], languages)
    })
    entity.sitelinks = keepMatchingSitelinks(entity.sitelinks, languages)
  }

  // with simplified claims and text attributes if requested
  if (simplified) {
    simplify(entity, 'labels')
    simplify(entity, 'descriptions')
    simplify(entity, 'aliases')
    simplify(entity, 'claims')
    simplify(entity, 'sitelinks')
  }

  // and return a string back
  return JSON.stringify(entity) + '\n'
}

const simplify = (entity, attr) => {
  if (entity[attr]) {
    entity[attr] = wdk.simplify[attr](entity[attr])
  }
}
