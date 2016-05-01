wdk = require 'wikidata-sdk'
attributesList = require './attributes_list'
pick = require 'lodash.pick'
difference = require 'lodash.difference'

module.exports = (options)->
  { claim, omit, keep } = options

  filterByClaim = claim?
  if filterByClaim
    [ P, Q ] = claim.split ':'

  if not keep? and omit?
    keep = difference attributesList, omit

  return wdFilter = (line)->
    line = line.toString()
    # remove a possible trailing comma
    line = line.replace /,$/, ''

    # filter-out unless we have a valid entity JSON line
    unless line[0] is '{' then return null
    try entity = JSON.parse line
    catch err then return null

    if filterByClaim
      # filter-out this entity has claims of the desired property
      propClaims = entity.claims[P]
      unless propClaims?.length > 0 then return null

      # let the possibility to let the claim value unspecified
      # ex: wikidata-filter --claim P184
      if Q?
        # filter-out this entity a claim of the desired property
        # with the desired value
        propClaims = wdk.simplifyPropertyClaims propClaims
        unless Q in propClaims then return null

    # keep only the desired attributes
    if keep? then entity = pick entity, keep
    # and return a string back
    return JSON.stringify(entity) + '\n'
