import filterFormatAndSerialize from './filter_format_and_serialize_entity.js'
import getEntitiesStream from './get_entities_stream.js'

const parseEntitiesStream = (stream, options) => {
  return getEntitiesStream(stream, options)
  .filterAndMap(filterFormatAndSerialize(options))
}

export default {
  parseEntitiesStream,
  getEntitiesStream,
  buildFilter: require('./filter_entity'),
  buildFormat: require('./format_entity'),
  serialize: require('./serialize_entity'),
  filterFormatAndSerialize,
}
