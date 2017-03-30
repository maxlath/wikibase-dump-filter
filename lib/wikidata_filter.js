const { attributes } = require('./lists')
const difference = require('lodash.difference')
const getExpectedType = require('./get_expected_type')
const getFilterByClaimData = require('./get_filter_by_claim_data')
const parseLine = require('./parse_line')
const validClaim = require('./valid_claim')
const formatEntity = require('./format_entity')

module.exports = function (options) {
  const { claim, omit, languages, simplified, type } = options
  var { keep } = options

  const expectedType = getExpectedType(type)

  const filterByClaimData = getFilterByClaimData(claim)

  if (!keep && omit) keep = difference(attributes, omit)
  const formatData = { keep, languages, simplified }

  return function wdFilter (line) {
    const entity = parseLine(line)
    if (!entity) return null

    if (!expectedType(entity.type)) return null

    if (!validClaim(entity.claims, filterByClaimData)) return null

    return formatEntity(entity, formatData)
  }
}
