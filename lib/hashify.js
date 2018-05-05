module.exports = array => {
  return array.reduce((hash, value) => {
    hash[value] = true
    return hash
  }, {})
}
