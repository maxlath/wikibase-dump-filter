const updateProgressBar = require('./update_progress_bar')

var total = 0
var filtered = 0

module.exports = {
  beforeFilter: () => total++,

  afterFilter: entity => {
    filtered++
    updateProgressBar(entity.id, filtered, total)
  }
}
