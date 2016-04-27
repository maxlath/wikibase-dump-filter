module.exports = (err)->
  # if the next stream refuse the input
  # this stream should stop
  # see: http://stackoverflow.com/a/15884508/3324977
  if err.code is 'EPIPE' then process.exit 0
  else console.error err
