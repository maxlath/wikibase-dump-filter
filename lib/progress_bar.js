const throttle = require('lodash.throttle')
const log = process.stderr.write.bind(process.stderr)

const progressBar = (entityId, filtered, total) => {
  const timestamp = new Date().toLocaleTimeString()
  log(`\rin: ${filtered} | total: ${total} | last entity in: ${entityId} | last add time: ${timestamp}         `)
}

module.exports = throttle(progressBar, 1000)
