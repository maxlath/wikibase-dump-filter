wdk = require 'wikidata-sdk'
lists = require './lists'
{ attributesWithLanguages } = lists
pick = require 'lodash.pick'
difference = require 'lodash.difference'
haveAMatch = require './have_a_match'

module.exports = (options)->
  { claim, omit, keep, type, languages } = options

  filterByClaim = claim?
  if filterByClaim
    [ P, Q ] = claim.split ':'
    negatedProp = P[0] is '~'
    filterByClaimValue = Q?
    if negatedProp then P = P.slice 1

  if not keep? and omit?
    keep = difference lists.attributes, omit

  filterAttributes = keep?

  type or= 'item'
  if type is 'both' then expectedType = (t)-> true
  else expectedType = (t)-> t is type

  filterLanguages = languages?

  return wdFilter = (line)->
    line = line.toString()
    # remove a possible trailing comma
    line = line.replace /,$/, ''

    # filter-out unless we have a valid entity JSON line
    unless line[0] is '{' then return null
    try entity = JSON.parse line
    catch err then return null

    unless expectedType entity.type then return null

    if filterByClaim
      # filter-out this entity unless it has claims of the desired property
      propClaims = entity.claims[P]

      if propClaims?.length > 0
        if negatedProp and not filterByClaimValue then return null
      else
        unless negatedProp then return null

      # let the possibility to let the claim value unspecified
      # ex: wikidata-filter --claim P184
      if filterByClaimValue
        Qs = Q.split ','
        # filter-out this entity unless it has a claim
        # of the desired property with the desired value
        propClaims = wdk.simplifyPropertyClaims propClaims
        if haveAMatch Qs, propClaims
          if negatedProp then return null
        else
          unless negatedProp then return null

    # keep only the desired attributes
    if filterAttributes then entity = pick entity, keep

    # with the desired languages
    if filterLanguages
      for attr in attributesWithLanguages
        if entity[attr]?
          entity[attr] = pick entity[attr], languages

    # and return a string back
    return JSON.stringify(entity) + '\n'
