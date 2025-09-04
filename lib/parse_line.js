import { Buffer } from 'node:buffer'

let count = -1

export default (line, options) => {
  count++
  line = line
    .toString()
    // Wikibase JSON dump may end lines with ',\r\n'
    // Known case: dump generated from dumpJson.php
    // https://github.com/wikimedia/mediawiki-extensions-Wikibase/blob/master/repo/maintenance/dumpJson.php
    .trim()
    // remove a possible trailing comma
    .replace(/,$/, '')

  // filter-out unless we have a valid entity JSON line
  if (line[0] !== '{') return null

  try {
    const parsedLine = JSON.parse(line)
    if (options.includeSize) {
      parsedLine.size = Buffer.byteLength(line, 'utf8')
    }
    return parsedLine
  } catch (err) {
    console.error('parsing error:', err)
    console.error(`line ${count}: ${line} (${typeof line})`)
    return null
  }
}
