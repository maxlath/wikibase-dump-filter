require('should')
const wdFilter = require('../lib/wikidata_filter')

describe('general', function () {
  it('should return a function', function (done) {
    wdFilter({}).should.be.a.Function()
    done()
  })
})
