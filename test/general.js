require('should')
const wdFilter = require('../lib/wikidata_filter')

describe('general', () => {
  it('should return a function', done => {
    wdFilter({}).should.be.a.Function()
    done()
  })
})
