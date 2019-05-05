const should = require('should')
const wdFilter = require('../lib/wikidata_filter')
const { getEntity } = require('./utils')

describe('simplify', () => {
  describe('validation', () => {
    it('should reject an invalid boolean', done => {
      should(() => wdFilter({ simplify: 'bulgroz' })).throw()
      done()
    })

    it('should accept an object', done => {
      should(() => wdFilter({ simplify: { keepQualifiers: true } })).not.throw()
      done()
    })
  })

  it('should simplify claims if true', done => {
    const result = wdFilter({ simplify: true })(getEntity())
    result.claims.P31[0].should.equal('Q3336843')
    done()
  })

  it('should not simplify claims if false', done => {
    const result = wdFilter({ simplify: false })(getEntity())
    result.claims.P31[0].should.be.an.Object()

    const result2 = wdFilter({})(getEntity())
    result2.claims.P31[0].should.be.an.Object()
    done()
  })

  describe('options', () => {
    it('should pass the options to the wdk.simplify function', done => {
      const result = wdFilter({ simplify: { keepQualifiers: true } })(getEntity())
      should(result.claims.P1549[2].mainsnak).not.be.ok()
      result.claims.P1549[2].qualifiers.should.be.an.Object()
      result.claims.P1549[2].qualifiers.P518.should.be.an.Object()
      done()
    })
  })
})
