import fs from 'fs'
import path from 'path'
import hash from './hash.js'
import validate from './validate_arguments.js'

export default conjonctiveClaimsFilter => {
  if (conjonctiveClaimsFilter == null) return

  // Accept a path as claim option to work around long arguments limitations
  try {
    conjonctiveClaimsFilter = fs.readFileSync(path.resolve(conjonctiveClaimsFilter)).toString().trim()
  } catch (err) {
    if (err.code !== 'ENOENT') throw err
  }

  validate.claims(conjonctiveClaimsFilter)

  return conjonctiveClaimsFilter
  .split(/&/g)
  .map(disjonctiveClaimsFilter => {
    return disjonctiveClaimsFilter
    .split(/\|/g)
    .map(claimsData)
  })
}

const claimsData = claim => {
  let [ P, Q ] = claim.split(':')
  const negatedProp = P[0] === '~'
  const filterByClaimValue = Q != null
  if (negatedProp) P = P.slice(1)

  const data = { P, negatedProp, filterByClaimValue }

  if (Q) data.QHash = hash(Q.split(','))

  return data
}
