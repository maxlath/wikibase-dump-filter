import fs from 'fs'

const Q22 = fs.readFileSync('./tests/fixtures/Q22.json', { encoding: 'utf-8' })

// Return a new object at every call, to avoid side effects of mutable functions
export const getEntity = () => JSON.parse(Q22)
