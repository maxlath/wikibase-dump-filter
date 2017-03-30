module.exports = (type = 'item') => {
  if (type === 'both') {
    return t => true
  } else {
    return t => t === type
  }
}
