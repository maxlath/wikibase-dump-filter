const wdk = require('wikidata-sdk')
const lists = require('./lists')
const { attributesWithLanguages } = lists
const pick = require('lodash.pick')
const difference = require('lodash.difference')
const haveAMatch = require('./have_a_match')

module.exports = function (options) {
  const { claim, omit, languages, simplified } = options
  var { keep, type } = options

  const filterByClaim = claim != null
  var P, Q, negatedProp, filterByClaimValue
  if (filterByClaim) {
    [ P, Q ] = claim.split(':')
    negatedProp = P[0] === '~'
    filterByClaimValue = Q != null
    if (negatedProp) P = P.slice(1)
  }

  if (!keep && omit) {
    keep = difference(lists.attributes, omit)
  }

  const filterAttributes = keep != null

  type = type || 'item'
  var expectedType
  if (type === 'both') {
    expectedType = (t) => true
  } else {
    expectedType = (t) => t === type
  }

  const filterLanguages = languages != null

  return function wdFilter (line) {
    line = line.toString()
    // remove a possible trailing comma
    line = line.replace(/,$/, '')

    // filter-out unless we have a valid entity JSON line
    if (!(line[0] === '{')) return null

    var entity
    try {
      entity = JSON.parse(line)
    } catch (err) {
      return null
    }

    if (!(expectedType(entity.type))) return null

    if (filterByClaim) {
      // filter-out this entity unless it has claims of the desired property
      var propClaims = entity.claims[P]

      if (propClaims && propClaims.length > 0) {
        if (negatedProp && !filterByClaimValue) return null
      } else {
        if (!negatedProp) return null
      }

      // let the possibility to let the claim value unspecified
      // ex: wikidata-filter --claim P184
      if (filterByClaimValue) {
        const Qs = Q.split(',')
        // filter-out this entity unless it has a claim
        // of the desired property with the desired value
        propClaims = wdk.simplifyPropertyClaims(propClaims)
        if (haveAMatch(Qs, propClaims)) {
          if (negatedProp) return null
        } else {
          if (!negatedProp) return null
        }
      }
    }

    // keep only the desired attributes
    if (filterAttributes) entity = pick(entity, keep)

    // with the desired languages
    if (filterLanguages) {
      for (let attr of attributesWithLanguages) {
        if (entity[attr] != null) {
          entity[attr] = pick(entity[attr], languages)
        }
      }
    }

    // with simplified claims if requested
    if (simplified) {
      if (entity.claims != null) {
        entity.claims = wdk.simplifyClaims(entity.claims)
      }
    }

    // and return a string back
    return JSON.stringify(entity) + '\n'
  }
}
