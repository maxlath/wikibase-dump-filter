const second = 1000
const minute = 60 * second
const hour = 60 * minute

const padTime = num => num.toString().padStart(2, '0')

module.exports = {
  getTime: ms => {
    const hours = Math.trunc(ms / hour)
    ms = ms - (hours * hour)
    const minutes = Math.trunc(ms / minute)
    ms = ms - (minutes * minute)
    const seconds = Math.trunc(ms / second)
    return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`
  }
}
