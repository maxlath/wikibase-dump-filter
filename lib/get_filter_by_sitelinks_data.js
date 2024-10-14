import hash from './hash.js'

export default sitelink => {
  if (sitelink == null) return
  const requiredGroups = getRequiredGroups(sitelink)
  validateSitelinks(requiredGroups)
  return { requiredGroups }
}

const getRequiredGroups = sitelinkOption => {
  // Should validate all the required groups (separated by '&')
  return sitelinkOption.split('&')
  // Should validate at least one possible sitelink (separated by '|')
  // by required group
  .map(possibilitiesGroup => hash(possibilitiesGroup.split('|')))
}

const validateSitelinks = requiredGroups => {
  for (const sitelinkHash of flatten(requiredGroups)) {
    for (const sitelinkName of Object.keys(sitelinkHash)) {
      if (!validateSitelink(sitelinkName)) {
        throw new Error(`invalid sitelink: ${sitelinkName}`)
      }
    }
  }
}

const validateSitelink = str => /^[a-z_]{2,20}$/.test(str)
const flatten = arrays => [].concat.apply([], arrays)
