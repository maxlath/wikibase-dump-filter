attributesList = require './attributes_list'

module.exports = (program)->
  { claim, omit, keep } = program

  if claim?
    [ P, Q ] = claim.split ':'
    unless /^P\d+$/.test P
      throw new Error "invalid claim property: #{P}"
    if Q?
      Qs = Q.split ','
      for q in Qs
        unless /^Q\d+$/.test q
          throw new Error "invalid claim value: #{q}"

  if omit? and keep?
    throw new Error 'use either omit or keep'

  if omit? then validateAttributes 'omit', omit
  if keep? then validateAttributes 'keep', keep

validateAttributes = (label, attributes)->
  valid = true
  for attr in attributes
    unless attr in attributesList
      throw new Error "invalid value for #{label}: #{attr}"
