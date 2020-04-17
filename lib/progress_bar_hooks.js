const updateProgressBar = require('./update_progress_bar')

var total = 0
var filtered = 0
var lastEntityId = ''

const updateWithLastData = () => {
  updateProgressBar(lastEntityId, filtered, total)
}

module.exports = {
  beforeFilter: () => total++,

  afterFilter: entity => {
    filtered++
    lastEntityId = entity.id
    updateProgressBar(lastEntityId, filtered, total)
  },

  afterNegativeFilter: updateWithLastData,

  updateWithLastData
}
