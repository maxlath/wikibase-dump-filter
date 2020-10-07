const { attributes } = require('./lists')
const difference = require('lodash.difference')
const isPlainObject = require('lodash.isplainobject')
const lists = require('./lists')
const validate = require('./validate_arguments')
const querystring = require('querystring')

module.exports = options => {
  let { omit, languages, simplify } = options
  let { keep } = options

  // Validate
  if (omit && keep) throw new Error('use either omit or keep')
  if (omit) validate.value('omit', omit, lists.attributes)
  if (keep) validate.value('keep', keep, lists.attributes)
  if (languages) validate.languages(languages)

  let simplifyOptions
  if (simplify) {
    if (typeof simplify === 'string') {
      if (simplify.match(/=/)) simplify = querystring.parse(simplify)
      else if (simplify[0] === '{') simplify = JSON.parse(simplify)
    }
    if (isPlainObject(simplify)) {
      simplifyOptions = simplify
      simplify = true
    } else {
      simplifyOptions = {}
    }
    if (typeof simplify !== 'boolean') {
      throw new Error('the simplify option should be a boolean or an option object')
    }
  }

  if (!keep && omit) keep = difference(attributes, omit)
  return { keep, languages, simplify, simplifyOptions }
}
