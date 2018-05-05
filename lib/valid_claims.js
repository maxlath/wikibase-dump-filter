const wdk = require('wikidata-sdk')
const haveAMatch = require('./have_a_match')

module.exports = (claims, filterByClaimData) => {
  if (!filterByClaimData) return true

  const { P, QHash, negatedProp, filterByClaimValue } = filterByClaimData
  // filter-out this entity unless it has claims of the desired property
  var propClaims = claims[P]

  if (propClaims && propClaims.length > 0) {
    if (negatedProp && !filterByClaimValue) return false
  } else {
    if (!negatedProp) return false
  }

  // let the possibility to let the claim value unspecified
  // ex: wikidata-filter --claim P184
  if (filterByClaimValue) {
    // filter-out this entity unless it has a claim
    // of the desired property with the desired value
    propClaims = wdk.simplifyPropertyClaims(propClaims)
    if (haveAMatch(QHash, propClaims)) {
      if (negatedProp) return false
    } else {
      if (!negatedProp) return false
    }
  }
  return true
}
