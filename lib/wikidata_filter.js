const getExpectedType = require('./get_expected_type')
const getFilterByClaimData = require('./get_filter_by_claim_data')
const parseLine = require('./parse_line')
const getFormatData = require('./get_format_data')
const validClaim = require('./valid_claim')
const formatEntity = require('./format_entity')

module.exports = function (options) {
  const expectedType = getExpectedType(options.type)
  const filterByClaimData = getFilterByClaimData(options.claim)
  const formatData = getFormatData(options)

  return function wdFilter (line) {
    const entity = parseLine(line)
    if (!entity) return null

    if (!expectedType(entity.type)) return null

    if (!validClaim(entity.claims, filterByClaimData)) return null

    return formatEntity(entity, formatData)
  }
}
