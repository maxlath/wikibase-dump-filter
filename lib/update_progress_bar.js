const throttle = require('lodash.throttle')
const log = process.stderr.write.bind(process.stderr)
const startTime = Date.now()
const round = num => Math.round(1000 * num) / 1000
const pad = (arg, length) => arg.toString().padStart(length)

const progressBar = (entityId, filtered, total) => {
  const timestamp = new Date().toLocaleTimeString()
  const averageTime = round((Date.now() - startTime) / total)
  log(`\rparsed: ${pad(total, 10)} | average parse time: ${pad(averageTime, 5)}ms | kept: ${pad(filtered, 10)} | last kept: ${pad(entityId, 10)} | last kept time: ${timestamp}         `)
}

module.exports = throttle(progressBar, 1000)
