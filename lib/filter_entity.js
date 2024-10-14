import getExpectedType from './get_expected_type.js'
import getFilterByClaimsData from './get_filter_by_claims_data.js'
import getFilterBySitelinksData from './get_filter_by_sitelinks_data.js'
import validClaims from './valid_claims.js'
import validSitelinks from './valid_sitelinks.js'

export default options => {
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
