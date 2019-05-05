const should = require('should')
const wdFilter = require('../lib/wikidata_filter')
const { getEntity } = require('./utils')
const entity = getEntity()

describe('claims', () => {
  describe('validation', () => {
    it('should reject an invalid claim', done => {
      should(() => wdFilter({ claim: 'P31z' })).throw()
      should(() => wdFilter({ claim: 'P31:Q141z' })).throw()
      done()
    })
  })
  describe('positive claim', () => {
    it('should return the entity if it has the specified claim', done => {
      const result = wdFilter({ claim: 'P31:Q3336843' })(entity)
      result.should.equal(entity)
      const result2 = wdFilter({ claim: 'P31' })(entity)
      result2.should.equal(entity)
      done()
    })

    it('should not return the entity if it miss the specified claim', done => {
      const result = wdFilter({ claim: 'P31:Q5' })(entity)
      should(result).be.null()
      const result2 = wdFilter({ claim: 'P2002' })(entity)
      should(result2).be.null()
      done()
    })
  })

  describe('negative claim', () => {
    it('should not return the entity if it has the specified claim', done => {
      const result = wdFilter({ claim: '~P31:Q3336843' })(entity)
      should(result).be.null()
      const result2 = wdFilter({ claim: '~P31' })(entity)
      should(result2).be.null()
      done()
    })

    it('should return the entity if it miss the specified claim', done => {
      const result = wdFilter({ claim: '~P31:Q5' })(entity)
      should(result).equal(entity)
      const result2 = wdFilter({ claim: '~P2002' })(entity)
      should(result2).equal(entity)
      done()
    })
  })

  describe('disjonctive claims', () => {
    it('should return the entity if it has one of the specified claim', done => {
      const result = wdFilter({ claim: 'P31:Q571|P300' })(entity)
      should(result).equal(entity)
      done()
    })

    it('should support multiple claim values', done => {
      const result = wdFilter({ claim: 'P6214214|P31:Q571,Q3336843' })(entity)
      should(result).equal(entity)
      done()
    })

    it('should support negative claims', done => {
      const result = wdFilter({ claim: '~P31|~P2002' })(entity)
      should(result).equal(entity)
      done()
    })
  })

  describe('conjonctive claims', () => {
    it("should not return the entity if it doesn't have all the specified claim", done => {
      const result = wdFilter({ claim: 'P31:Q571&P300' })(entity)
      should(result).be.null()
      done()
    })

    it('should return the entity if it has all the specified claim', done => {
      const result = wdFilter({ claim: 'P31:Q3336843&P300' })(entity)
      should(result).equal(entity)
      done()
    })

    it('should support negative claims', done => {
      const result = wdFilter({ claim: 'P31:Q3336843&P300&~P2002' })(entity)
      should(result).equal(entity)
      done()
    })
  })
})
