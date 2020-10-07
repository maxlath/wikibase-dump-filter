const validate = require('./validate_arguments')
const lists = require('./lists')

module.exports = (type = 'item') => {
  // Validate
  if (type) validate.value('type', [ type ], lists.types)

  if (type === 'both') {
    return t => true
  } else {
    return t => t === type
  }
}
