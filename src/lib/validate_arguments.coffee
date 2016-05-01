lists = require('./lists')

module.exports = (program)->
  { claim, omit, keep, type, languages } = program

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

  if omit? then validateValue 'omit', omit, lists.attributes
  if keep? then validateValue 'keep', keep, lists.attributes
  if type? then validateValue 'type', [type], lists.types
  if languages? then validateLanguages languages

validateValue = (label, values, list)->
  valid = true
  for attr in values
    unless attr in list
      throw new Error "invalid value for #{label}: #{attr}"

languageCode = /^[a-z]{2}(-[a-z]{2})?$/
validateLanguages = (languages)->
  for lang in languages
    unless languageCode.test lang
      throw new Error "invalid language: #{lang}"
