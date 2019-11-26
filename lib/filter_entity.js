const getExpectedType = require('./get_expected_type')
const getFilterByClaimsData = require('./get_filter_by_claims_data')
const getFilterBySitelinksData = require('./get_filter_by_sitelinks_data')
const validClaims = require('./valid_claims')
const validSitelinks = require('./valid_sitelinks')

module.exports = options => {
  const expectedType = getExpectedType(options.type)
  const filterByClaimsData = getFilterByClaimsData(options.claim)
  const filterBySitelinksData = getFilterBySitelinksData(options.sitelink)
  return entity => {
    if (!expectedType(entity.type)) return false
    if (!validClaims(entity.claims, filterByClaimsData)) return false
    if (!validSitelinks(entity.sitelinks, filterBySitelinksData)) return false
    return true
  }
}
