const filterEntity = require('./filter_entity')
const formatEntity = require('./format_entity')
const serializeEntity = require('../lib/serialize_entity')
const noop = () => {}

module.exports = options => {
  const filterTest = filterEntity(options)
  const formatFn = formatEntity(options)

  const beforeFilter = options.beforeFilter || noop
  const afterFilter = options.afterFilter || noop
  const afterNegativeFilter = options.afterNegativeFilter || noop

  return entity => {
    beforeFilter()
    if (filterTest(entity)) {
      afterFilter(entity)
      return serializeEntity(formatFn(entity))
    } else {
      afterNegativeFilter()
    }
  }
}
