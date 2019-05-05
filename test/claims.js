const should = require('should')
const fs = require('fs')

const wdFilter = require('../lib/wikidata_filter')
const parsedEntity = JSON.parse(fs.readFileSync('./test/fixtures/entity', { encoding: 'utf-8' }))

describe('claims', function () {
  describe('validation', function () {
    it('should reject an invalid claim', function (done) {
      should(() => wdFilter({ claim: 'P31z' })).throw()
      should(() => wdFilter({ claim: 'P31:Q141z' })).throw()
      done()
    })
  })
  describe('positive claim', function () {
    it('should return the entity if it has the specified claim', function (done) {
      const result = wdFilter({ claim: 'P31:Q3336843' })(parsedEntity)
      result.should.equal(parsedEntity)
      const result2 = wdFilter({ claim: 'P31' })(parsedEntity)
      result2.should.equal(parsedEntity)
      done()
    })

    it('should not return the entity if it miss the specified claim', function (done) {
      const result = wdFilter({ claim: 'P31:Q5' })(parsedEntity)
      should(result).be.null()
      const result2 = wdFilter({ claim: 'P2002' })(parsedEntity)
      should(result2).be.null()
      done()
    })
  })

  describe('negative claim', function () {
    it('should not return the entity if it has the specified claim', function (done) {
      const result = wdFilter({ claim: '~P31:Q3336843' })(parsedEntity)
      should(result).be.null()
      const result2 = wdFilter({ claim: '~P31' })(parsedEntity)
      should(result2).be.null()
      done()
    })

    it('should return the entity if it miss the specified claim', function (done) {
      const result = wdFilter({ claim: '~P31:Q5' })(parsedEntity)
      should(result).equal(parsedEntity)
      const result2 = wdFilter({ claim: '~P2002' })(parsedEntity)
      should(result2).equal(parsedEntity)
      done()
    })
  })

  describe('disjonctive claims', function () {
    it('should return the entity if it has one of the specified claim', function (done) {
      const result = wdFilter({ claim: 'P31:Q571|P300' })(parsedEntity)
      should(result).equal(parsedEntity)
      done()
    })

    it('should support multiple claim values', function (done) {
      const result = wdFilter({ claim: 'P6214214|P31:Q571,Q3336843' })(parsedEntity)
      should(result).equal(parsedEntity)
      done()
    })

    it('should support negative claims', function (done) {
      const result = wdFilter({ claim: '~P31|~P2002' })(parsedEntity)
      should(result).equal(parsedEntity)
      done()
    })
  })

  describe('conjonctive claims', function () {
    it("should not return the entity if it doesn't have all the specified claim", function (done) {
      const result = wdFilter({ claim: 'P31:Q571&P300' })(parsedEntity)
      should(result).be.null()
      done()
    })

    it('should return the entity if it has all the specified claim', function (done) {
      const result = wdFilter({ claim: 'P31:Q3336843&P300' })(parsedEntity)
      should(result).equal(parsedEntity)
      done()
    })

    it('should support negative claims', function (done) {
      const result = wdFilter({ claim: 'P31:Q3336843&P300&~P2002' })(parsedEntity)
      should(result).equal(parsedEntity)
      done()
    })
  })
})
