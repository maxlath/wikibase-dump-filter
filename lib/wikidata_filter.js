const getExpectedType = require('./get_expected_type')
const getFilterByClaimsData = require('./get_filter_by_claims_data')
const getFilterBySitelinksData = require('./get_filter_by_sitelinks_data')
const getFormatData = require('./get_format_data')
const validClaims = require('./valid_claims')
const validSitelinks = require('./valid_sitelinks')
const formatEntity = require('./format_entity')
const progressBar = require('./progress_bar')

var total = 0
var filtered = 0

module.exports = options => {
  const expectedType = getExpectedType(options.type)
  const filterByClaimsData = getFilterByClaimsData(options.claim)
  const filterBySitelinksData = getFilterBySitelinksData(options.sitelink)
  const formatData = getFormatData(options)

  const isntTTY = process.stdout.isTTY == null

  const progress = options.progress !== 'false' && (isntTTY || options.progress === 'true')

  return entity => {
    total++
    if (!expectedType(entity.type)) return null
    if (!validClaims(entity.claims, filterByClaimsData)) return null
    if (!validSitelinks(entity.sitelinks, filterBySitelinksData)) return null
    filtered++
    if (progress) progressBar(entity.id, filtered, total)
    return formatEntity(entity, formatData)
  }
}
