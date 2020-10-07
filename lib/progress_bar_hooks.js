const { updateProgressBar } = require('./update_progress_bar')

let total = 0
let kept = 0
let lastEntityId = ''

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
