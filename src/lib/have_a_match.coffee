module.exports = (arrayA, arrayB)->
  for valueA in arrayA
    for valueB in arrayB
      if valueA is valueB then return true

  return false
