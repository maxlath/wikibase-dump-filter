const should = require('should')
const fs = require('fs')

const wdFilter = require('../lib/wikidata_filter')
const entityLine = fs.readFileSync('./test/fixtures/entity', { encoding: 'utf-8' })

describe('simplified', function () {
  describe('validation', function () {
    it('should reject an invalid boolean', function (done) {
      should(() => wdFilter({ simplified: 'bulgroz' })).throw()
      done()
    })
  })
  it('should simplify claims if true', function (done) {
    const result = JSON.parse(wdFilter({ simplified: true })(entityLine))
    result.claims.P31[0].should.equal('Q3336843')
    done()
  })

  it('should not simplify claims if false', function (done) {
    const result = JSON.parse(wdFilter({ simplified: false })(entityLine))
    result.claims.P31[0].should.be.an.Object()
    const result2 = JSON.parse(wdFilter({})(entityLine))
    result2.claims.P31[0].should.be.an.Object()
    done()
  })
})
