import pkg from 'lodash'
const { throttle } = pkg
import { getTime } from './progress_bar_utils.js'

const log = process.stderr.write.bind(process.stderr)
const startTime = Date.now()
const round = num => Math.round(1000 * num) / 1000
const pad = (arg = '', length) => arg.toString().padStart(length)

export const logHeaders = () => {
  log('    parsed | total average parse time | recent average parse time |       kept | % of total |   last kept | last kept time | elapsed time\n')
}

let lastTimestamp = Date.now()
let lastKeptTime = 0
let lastTotal = 0
let lastKept = 0

const _updateProgressBar = (entityId, kept, total) => {
  const newlyAdded = total - lastTotal
  lastTotal = total
  const now = Date.now()
  const elapsedTime = getTime(now - startTime)
  let totalAverageTime = round((now - startTime) / total)
  let recentAverageTime = round((now - lastTimestamp) / newlyAdded)
  lastTimestamp = now
  if (lastKept !== kept) lastKeptTime = new Date().toLocaleTimeString()
  lastKept = kept
  let rate = Math.round(100000 * kept / total) / 1000
  if (totalAverageTime === Infinity) totalAverageTime = 0
  if (recentAverageTime === Infinity) recentAverageTime = 0
  if (Number.isNaN(rate)) rate = 0
  log(`\r${pad(total, 10)} | ${pad(totalAverageTime, 22)}ms | ${pad(recentAverageTime, 23)}ms | ${pad(kept, 10)} | ${pad(rate, 9)}% | ${pad(entityId, 11)} | ${pad(lastKeptTime, 14)} | ${pad(elapsedTime, 12)}`)
}

export const updateProgressBar = throttle(_updateProgressBar, 1000)
