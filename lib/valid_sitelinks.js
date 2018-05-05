const haveAMatch = require('./have_a_match')

module.exports = (sitelinks, filterBySitelinksData) => {
  if (!filterBySitelinksData) return true
  const sitelinksNames = Object.keys(sitelinks)
  const { requiredGroups } = filterBySitelinksData

  for (let possibilitiesGroupHash of requiredGroups) {
    // If any required group can't find a match between its possibilities
    // and the entity's sitelinks, the entity should be filtered out
    if (!haveAMatch(possibilitiesGroupHash, sitelinksNames)) return false
  }

  return true
}
