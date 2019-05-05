const fs = require('fs')
const Q22 = fs.readFileSync('./test/fixtures/Q22.json', { encoding: 'utf-8' })

// Return a new object at every call, to avoid side effects of mutable functions
const getEntity = () => JSON.parse(Q22)

module.exports = { getEntity }
