const { propertyClaims: simplifyPropertyClaims } = require('wikibase-sdk').simplify
const haveAMatch = require('./have_a_match')
const every = require('lodash.every')
const some = require('lodash.some')

module.exports = (claims = {}, conjonctiveClaimsFilter) => {
  if (!conjonctiveClaimsFilter) return true
  // ex: P31:Q571&P50|P110 => P31:Q571 && (P50 || P110)
  return every(conjonctiveClaimsFilter, anyDisjonctiveFilter(claims))
}

const anyDisjonctiveFilter = claims => disjonctiveClaimsFilter => {
  return some(disjonctiveClaimsFilter, validClaim(claims))
}

const validClaim = claims => claimsFilterData => {
  const { P, QHash, negatedProp, filterByClaimValue } = claimsFilterData
  // filter-out this entity unless it has claims of the desired property
  let propClaims = claims[P]

  if (propClaims && propClaims.length > 0) {
    if (negatedProp && !filterByClaimValue) return false
  } else {
    if (!negatedProp) return false
  }

  // Let the possibility to let the claim value unspecified
  // ex: wikibase-dump-filter --claim P184
  if (filterByClaimValue) {
    // Filter-out this entity unless it has a claim
    // of the desired property with the desired value
    propClaims = simplifyPropertyClaims(propClaims, { keepNonTruthy: true })
    if (haveAMatch(QHash, propClaims)) {
      if (negatedProp) return false
    } else {
      if (!negatedProp) return false
    }
  }
  return true
}
