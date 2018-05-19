var count = -1

module.exports = line => {
  count++
  line = line
    .toString()
    // remove a possible trailing comma
    .replace(/,$/, '')

  // filter-out unless we have a valid entity JSON line
  if (line[0] !== '{') return null

  try {
    return JSON.parse(line)
  } catch (err) {
    console.error('parsing error:', err)
    console.error(`line ${count}: ${line} (${typeof line})`)
    return null
  }
}
