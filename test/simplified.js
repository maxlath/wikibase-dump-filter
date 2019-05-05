const should = require('should')
const wdFilter = require('../lib/wikidata_filter')
const { getEntity } = require('./utils')

describe('simplified', () => {
  describe('validation', () => {
    it('should reject an invalid boolean', done => {
      should(() => wdFilter({ simplified: 'bulgroz' })).throw()
      done()
    })
  })

  it('should simplified claims if true', done => {
    const result = wdFilter({ simplified: true })(getEntity())
    result.claims.P31[0].should.equal('Q3336843')
    done()
  })

  it('should not simplified claims if false', done => {
    const result = wdFilter({ simplified: false })(getEntity())
    result.claims.P31[0].should.be.an.Object()

    const result2 = wdFilter({})(getEntity())
    result2.claims.P31[0].should.be.an.Object()
    done()
  })
})
