const validate = require('./validate_arguments')

module.exports = claimOption => {
  if (claimOption == null) return
  validate.claim(claimOption)

  var [ P, Q ] = claimOption.split(':')
  const negatedProp = P[0] === '~'
  const filterByClaimValue = Q != null
  if (negatedProp) P = P.slice(1)

  return { P, Q, negatedProp, filterByClaimValue }
}
