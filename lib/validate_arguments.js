const { isItemId } = require('wikibase-sdk')
const languageCode = /^[a-z]{2,3}(-[a-z]{2,6})?$/
// ~ stands for negated properties
const isPropertyId = str => /^~?P\d+$/.test(str)

const validateClaim = claim => {
  const [ P, Q ] = claim.split(':')
  if (!(isPropertyId(P))) throw new Error(`invalid claim property: ${P}`)
  if (Q) {
    const Qs = Q.split(',')
    for (const q of Qs) {
      if (!(isItemId(q))) throw new Error(`invalid claim value: ${q}`)
    }
  }
}

module.exports = {
  value: (label, values, list) => {
    for (const attr of values) {
      if (!(list.includes(attr))) throw new Error(`invalid value for ${label}: ${attr}`)
    }
  },
  languages: languages => {
    for (const lang of languages) {
      if (!(languageCode.test(lang))) throw new Error(`invalid language: ${lang}`)
    }
  },
  claims: claims => claims.split(/\||&/g).forEach(validateClaim)
}
