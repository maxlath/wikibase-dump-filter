module.exports = function (arrayA, arrayB) {
  for (let valueA of arrayA) {
    for (let valueB of arrayB) {
      if (valueA === valueB) return true
    }
  }

  return false
}
