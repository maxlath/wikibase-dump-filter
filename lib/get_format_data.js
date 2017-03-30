const { attributes } = require('./lists')
const difference = require('lodash.difference')
const lists = require('./lists')
const validate = require('./validate_arguments')

module.exports = (options) => {
  const { omit, languages, simplified } = options
  var { keep } = options

  // Validate
  if (omit && keep) throw new Error('use either omit or keep')
  if (omit) validate.value('omit', omit, lists.attributes)
  if (keep) validate.value('keep', keep, lists.attributes)
  if (languages) validate.languages(languages)
  if (simplified && typeof simplified !== 'boolean') {
    throw new Error('the simplified option should be a boolean')
  }

  if (!keep && omit) keep = difference(attributes, omit)
  return { keep, languages, simplified }
}
