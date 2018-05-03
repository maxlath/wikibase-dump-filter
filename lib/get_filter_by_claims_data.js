const fs = require('fs')
const path = require('path')
const validate = require('./validate_arguments')

module.exports = claimOption => {
  if (claimOption == null) return

  // Accept a path as claim option to work around long arguments limitations
  try {
    claimOption = fs.readFileSync(path.resolve(claimOption)).toString().trim()
  } catch (err) {
    if (err.code !== 'ENOENT') throw err
  }

  validate.claim(claimOption)

  var [ P, Q ] = claimOption.split(':')
  const negatedProp = P[0] === '~'
  const filterByClaimValue = Q != null
  if (negatedProp) P = P.slice(1)

  return { P, Q, negatedProp, filterByClaimValue }
}
