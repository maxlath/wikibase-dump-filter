const lists = require('./lists')
const wdk = require('wikidata-sdk')

module.exports = function (program) {
  const { claim, omit, keep, type, languages } = program

  if (claim) {
    const [ P, Q ] = claim.split(':')
    if (!(isPropertyId(P))) throw new Error(`invalid claim property: ${P}`)
    if (Q) {
      const Qs = Q.split(',')
      for (let q of Qs) {
        if (!(wdk.isItemId(q))) throw new Error(`invalid claim value: ${q}`)
      }
    }
  }

  if (omit && keep) throw new Error('use either omit or keep')

  if (omit) validateValue('omit', omit, lists.attributes)
  if (keep) validateValue('keep', keep, lists.attributes)
  if (type) validateValue('type', [type], lists.types)
  if (languages) validateLanguages(languages)
}

// ~ stands for negated properties
const isPropertyId = (str) => /^~?P\d+$/.test(str)

const validateValue = function (label, values, list) {
  for (let attr of values) {
    if (!(list.includes(attr))) throw new Error(`invalid value for ${label}: ${attr}`)
  }
}

const languageCode = /^[a-z]{2}(-[a-z]{2})?$/
const validateLanguages = function (languages) {
  for (let lang of languages) {
    if (!(languageCode.test(lang))) throw new Error(`invalid language: ${lang}`)
  }
}
