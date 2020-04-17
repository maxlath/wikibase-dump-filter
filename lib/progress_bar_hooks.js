const { updateProgressBar } = require('./update_progress_bar')

var total = 0
var kept = 0
var lastEntityId = ''

const updateWithLastData = () => {
  updateProgressBar(lastEntityId, kept, total)
}

module.exports = {
  beforeFilter: () => total++,

  afterFilter: entity => {
    kept++
    lastEntityId = entity.id
    updateWithLastData()
  },

  afterNegativeFilter: updateWithLastData,

  updateWithLastData
}
