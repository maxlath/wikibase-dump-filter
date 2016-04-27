# inspired by the stream-filter module
# but allow to modify the value instead of just filtering
through = require 'through'

module.exports = (test)->
  return through (data)->
    value = test data
    if value? then @emit 'data', value
