const should = require('should')
const fs = require('fs')

const wdFilter = require('../lib/wikidata_filter')
const entityLine = fs.readFileSync('./test/fixtures/entity', { encoding: 'utf-8' })

describe('type', function () {
  describe('validation', function () {
    it('should reject an invalid type', function (done) {
      should(() => wdFilter({ type: 'bulgroz' })).throw()
      done()
    })
  })
  it('should keep entities of the specified type', function (done) {
    const result = wdFilter({ type: 'item' })(entityLine)
    should(result).be.ok()
    const result2 = wdFilter({ type: 'property' })(entityLine)
    should(result2).not.be.ok()
    const result3 = wdFilter({ type: 'both' })(entityLine)
    should(result3).be.ok()
    done()
  })
})
