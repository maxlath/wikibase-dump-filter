import querystring from 'querystring'
import difference from 'lodash.difference'
import isPlainObject from 'lodash.isplainobject'
import { attributes } from './lists.js'
import validate from './validate_arguments.js'

export default options => {
  let { omit, languages, simplify } = options
  let { keep } = options

  // Validate
  if (omit && keep) throw new Error('use either omit or keep')
  if (omit) validate.value('omit', omit, attributes)
  if (keep) validate.value('keep', keep, attributes)
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
