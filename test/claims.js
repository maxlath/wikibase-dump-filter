const should = require('should')
const filterEntity = require('../lib/filter_entity')
const { getEntity } = require('./utils')
const entity = getEntity()

describe('claims', () => {
  describe('validation', () => {
    it('should reject an invalid claim', () => {
      should(() => filterEntity({ claim: 'P31z' })).throw()
      should(() => filterEntity({ claim: 'P31:Q141z' })).throw()
    })
  })

  describe('positive claim', () => {
    it('should return true if it has the specified claim', () => {
      const result = filterEntity({ claim: 'P31:Q3336843' })(entity)
      result.should.be.true()
      const result2 = filterEntity({ claim: 'P31' })(entity)
      result2.should.be.true()
    })

    it('should return true if it has the specified claim as a non-truthy claim', () => {
      const result = filterEntity({ claim: 'P131:Q174193' })(entity)
      result.should.be.true()
    })

    it('should return false if it miss the specified claim', () => {
      const result = filterEntity({ claim: 'P31:Q5' })(entity)
      result.should.be.false()
      const result2 = filterEntity({ claim: 'P2002' })(entity)
      should(result2).be.false()
    })
  })

  describe('negative claim', () => {
    it('should return false if it has the specified claim', () => {
      const result = filterEntity({ claim: '~P31:Q3336843' })(entity)
      result.should.be.false()
      const result2 = filterEntity({ claim: '~P31' })(entity)
      should(result2).be.false()
    })

    it('should return false if it has the specified claim as a non-truthy claim', () => {
      const result = filterEntity({ claim: '~P131:Q174193' })(entity)
      result.should.be.false()
    })

    it('should return true if it miss the specified claim', () => {
      const result = filterEntity({ claim: '~P31:Q5' })(entity)
      should(result).be.true()
      const result2 = filterEntity({ claim: '~P2002' })(entity)
      should(result2).be.true()
    })
  })

  describe('disjonctive claims', () => {
    it('should return true if it has one of the specified claim', () => {
      const result = filterEntity({ claim: 'P31:Q571|P300' })(entity)
      should(result).be.true()
    })

    it('should support multiple claim values', () => {
      const result = filterEntity({ claim: 'P6214214|P31:Q571,Q3336843' })(entity)
      should(result).be.true()
    })

    it('should support negative claims', () => {
      const result = filterEntity({ claim: '~P31|~P2002' })(entity)
      should(result).be.true()
    })
  })

  describe('conjonctive claims', () => {
    it("should return false if it doesn't have all the specified claim", () => {
      const result = filterEntity({ claim: 'P31:Q571&P300' })(entity)
      result.should.be.false()
    })

    it('should return true if it has all the specified claim', () => {
      const result = filterEntity({ claim: 'P31:Q3336843&P300' })(entity)
      should(result).be.true()
    })

    it('should support negative claims', () => {
      const result = filterEntity({ claim: 'P31:Q3336843&P300&~P2002' })(entity)
      should(result).be.true()
    })

    it('should support old dumps where claims might be empty', () => {
      const entity = getEntity()
      delete entity.claims
      const result = filterEntity({ claim: 'P31:Q3336843&P300&~P2002' })(entity)
      should(result).be.false()
    })
  })
})
