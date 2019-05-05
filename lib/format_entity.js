const pick = require('lodash.pick')
const wdk = require('wikidata-sdk')
const { attributesWithLanguages } = require('./lists')
const keepMatchingSitelinks = require('./keep_matching_sitelinks')

module.exports = (entity, formatData) => {
  const { keep, languages, simplify, simplifyOptions } = formatData
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

  // with simplify claims and text attributes if requested
  if (simplify) {
    entity = wdk.simplify.entity(entity, simplifyOptions)
  }

  return entity
}
