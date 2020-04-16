const updateProgressBar = require('./update_progress_bar')

var total = 0
var filtered = 0
var lastEntityId

module.exports = {
  beforeFilter: () => total++,

  afterFilter: entity => {
    filtered++
    lastEntityId = entity.id
    updateProgressBar(lastEntityId, filtered, total)
  },

  afterNegativeFilter: () => {
    updateProgressBar(lastEntityId, filtered, total)
  }
}
