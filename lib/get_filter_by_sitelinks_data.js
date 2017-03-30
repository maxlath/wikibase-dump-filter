module.exports = sitelink => {
  if (sitelink == null) return
  return { requiredGroups: getRequiredGroups(sitelink) }
}

const getRequiredGroups = (sitelinkOption) => {
  // Should validate all the required groups (separated by '&')
  return sitelinkOption.split('&')
  // Should validate at least one possible sitelink (separated by '|')
  // by required group
  .map(possibilitiesGroup => possibilitiesGroup.split('|'))
}
