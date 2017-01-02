// inspired by the stream-filter module
// but allow to modify the value instead of just filtering

module.exports = function (test) {
  return function through (data) {
    const value = test(data)
    if (value) this.queue(value)
  }
}
