import { types } from './lists.js'
import validate from './validate_arguments.js'

export default (type = 'item') => {
  // Validate
  if (type) validate.value('type', [ type ], types)

  if (type === 'both') {
    return t => true
  } else {
    return t => t === type
  }
}
