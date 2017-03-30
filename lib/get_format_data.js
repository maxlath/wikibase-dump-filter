const { attributes } = require('./lists')
const difference = require('lodash.difference')

module.exports = (options) => {
  const { omit, languages, simplified } = options
  var { keep } = options
  if (!keep && omit) keep = difference(attributes, omit)
  return { keep, languages, simplified }
}
