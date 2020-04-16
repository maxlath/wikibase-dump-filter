const throttle = require('lodash.throttle')
const log = process.stderr.write.bind(process.stderr)
const startTime = Date.now()
const round = num => Math.round(1000 * num) / 1000
const pad = (arg, length) => arg.toString().padStart(length)
const padTime = num => num.toString().padStart(2, '0')

const second = 1000
const minute = 60 * second
const hour = 60 * minute

const getTime = ms => {
  const hours = Math.trunc(ms / hour)
  ms = ms - (hours * hour)
  const minutes = Math.trunc(ms / minute)
  ms = ms - (minutes * minute)
  const seconds = Math.trunc(ms / second)
  return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`
}

log(`    parsed | total average parse time | recent average parse time |       kept | % of total |   last kept | last kept time | elapsed time\n`)

let lastTimestamp = Date.now()
let lastTotal = 0

const progressBar = (entityId, filtered, total) => {
  const newlyAdded = total - lastTotal
  const now = Date.now()
  const timestamp = new Date().toLocaleTimeString()
  const elapsedTime = getTime(now - startTime)
  const totalAverageTime = round((now - startTime) / total)
  const recentAverageTime = round((now - lastTimestamp) / newlyAdded)
  lastTotal = total
  lastTimestamp = now
  const rate = Math.round(100 * filtered / total) / 100
  log(`\r${pad(total, 10)} | ${pad(totalAverageTime, 22)}ms | ${pad(recentAverageTime, 23)}ms | ${pad(filtered, 10)} | ${pad(rate, 9)}% | ${pad(entityId, 11)} | ${pad(timestamp, 14)} | ${pad(elapsedTime, 12)}`)
}

module.exports = throttle(progressBar, 1000)
