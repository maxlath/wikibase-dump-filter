import split from 'split'
import parseLine from './parse_line.js'
import stream_ from './stream_utils.js'

export default (stream, options = {}) => {
  const lineStream = stream.pipe(split('\n'))
  Object.assign(lineStream, methods)
  return lineStream.filterAndMap(line => {
    const entity = parseLine(line, options)
    if (!entity) return null
    return entity
  })
}

const streamMethod = streamFn => {
  return function (fn) {
    const modifiedStream = this.pipe(streamFn(fn))
    // Re-setting methods on that newly created stream
    // to be able to chain method calls
    Object.assign(modifiedStream, methods)
    return modifiedStream
  }
}

const methods = {
  map: streamMethod(stream_.map),
  filter: streamMethod(stream_.filter),
  filterAndMap: streamMethod(stream_.filterAndMap),
  tap: streamMethod(stream_.tap),
}
