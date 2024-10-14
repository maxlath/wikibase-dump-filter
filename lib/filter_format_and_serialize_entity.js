import serializeEntity from '../lib/serialize_entity.js'
import filterEntity from './filter_entity.js'
import formatEntity from './format_entity.js'

const noop = () => {}

export default options => {
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
