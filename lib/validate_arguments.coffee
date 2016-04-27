attributesList = require './attributes_list'

module.exports = (program)->
  { claim, omit, keep } = program

  unless /^P\d+:Q\d+$/.test claim
    throw new Error "invalid claim: #{claim}"

  if omit? and keep?
    throw new Error 'use either omit or keep'

  if omit? then validateAttributes 'omit', omit
  if keep? then validateAttributes 'keep', keep

validateAttributes = (label, attributes)->
  valid = true
  for attr in attributes
    unless attr in attributesList
      throw new Error "invalid value for #{label}: #{attr}"
