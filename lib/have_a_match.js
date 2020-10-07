module.exports = (hash, array) => {
  for (const value of array) {
    if (hash[value]) return true
  }
  return false
}
