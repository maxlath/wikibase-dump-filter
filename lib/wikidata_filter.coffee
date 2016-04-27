wdk = require 'wikidata-sdk'

module.exports = (claim)->
  [ P, Q ] = claim.split ':'
  wdFilter = (line)->
    line = line.toString()
    unless line[0] is '{' then return false

    try entity = JSON.parse line
    catch err then return false

    propClaims = entity.claims[P]
    unless propClaims?.length > 0 then return false

    propClaims = wdk.simplifyPropertyClaims propClaims
    return Q in propClaims
