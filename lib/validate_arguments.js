const { isItemId } = require('wikidata-sdk')
const languageCode = /^[a-z]{2}(-[a-z]{2})?$/
// ~ stands for negated properties
const isPropertyId = (str) => /^~?P\d+$/.test(str)

module.exports = {
  value: function (label, values, list) {
    for (let attr of values) {
      if (!(list.includes(attr))) throw new Error(`invalid value for ${label}: ${attr}`)
    }
  },
  languages: function (languages) {
    for (let lang of languages) {
      if (!(languageCode.test(lang))) throw new Error(`invalid language: ${lang}`)
    }
  },
  claim: claim => {
    const [ P, Q ] = claim.split(':')
    if (!(isPropertyId(P))) throw new Error(`invalid claim property: ${P}`)
    if (Q) {
      const Qs = Q.split(',')
      for (let q of Qs) {
        if (!(isItemId(q))) throw new Error(`invalid claim value: ${q}`)
      }
    }
  }
}
