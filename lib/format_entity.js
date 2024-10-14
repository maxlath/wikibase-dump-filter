import pick from 'lodash.pick'
import { simplifyEntity } from 'wikibase-sdk'
import getFormatData from './get_format_data.js'
import keepMatchingSitelinks from './keep_matching_sitelinks.js'
import { attributesWithLanguages } from './lists.js'

export default options => {
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
