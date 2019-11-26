const getEntitiesStream = require('./get_entities_stream')
const filterFormatAndSerialize = require('./filter_format_and_serialize_entity')

const parseEntitiesStream = (stream, options) => {
  return getEntitiesStream(stream)
  .filterAndMap(filterFormatAndSerialize(options))
}

module.exports = {
  parseEntitiesStream,
  getEntitiesStream,
  buildFilter: require('./filter_entity'),
  buildFormat: require('./format_entity'),
  serialize: require('./serialize_entity'),
  filterFormatAndSerialize
}
