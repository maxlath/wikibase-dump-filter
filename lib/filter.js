// inspired by the stream-filter module
// but allow to modify the value instead of just filtering
const through = require('through')

module.exports = function (test) {
  return through(function (data) {
    const value = test(data)
    if (value) this.queue(value)
  })
}
