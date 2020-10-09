const pick = require('lodash.pick')
const { entity: simplifyEntity } = require('wikibase-sdk').simplify
const { attributesWithLanguages } = require('./lists')
const keepMatchingSitelinks = require('./keep_matching_sitelinks')
const getFormatData = require('./get_format_data')

module.exports = options => {
  const { keep, languages, simplify, simplifyOptions } = getFormatData(options)
  return entity => {
    const filterAttributes = keep != null
    const filterLanguages = languages != null

    // keep only the desired attributes
    if (filterAttributes) entity = pick(entity, keep)

    // with the desired languages
    if (filterLanguages) {
      attributesWithLanguages.forEach(attr => {
        if (entity[attr]) {
          entity[attr] = pick(entity[attr], languages)
        }
      })

      if (!filterAttributes || keep.includes('sitelinks')) {
        entity.sitelinks = keepMatchingSitelinks(entity.sitelinks, languages)
      }
    }

    // with simplify claims and text attributes if requested
    if (simplify) {
      entity = simplifyEntity(entity, simplifyOptions)
    }

    return entity
  }
}
