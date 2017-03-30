const should = require('should')
const fs = require('fs')

const wdFilter = require('../lib/wikidata_filter')
const entityLine = fs.readFileSync('./test/fixtures/entity', { encoding: 'utf-8' })

describe('claims', function () {
  describe('positive claim', function () {
    it('should return the entity if it has the specified claim', function (done) {
      const result = wdFilter({ claim: 'P31:Q1454986' })(entityLine)
      result.should.be.a.String()
      const result2 = wdFilter({ claim: 'P31' })(entityLine)
      result2.should.be.a.String()
      done()
    })

    it('should not return the entity if it miss the specified claim', function (done) {
      const result = wdFilter({ claim: 'P31:Q5' })(entityLine)
      should(result).not.be.ok()
      const result2 = wdFilter({ claim: 'P2002' })(entityLine)
      should(result2).not.be.ok()
      done()
    })
  })

  describe('negative claim', function () {
    it('should not return the entity if it has the specified claim', function (done) {
      const result = wdFilter({ claim: '~P31:Q1454986' })(entityLine)
      should(result).not.be.ok()
      const result2 = wdFilter({ claim: '~P31' })(entityLine)
      should(result2).not.be.ok()
      done()
    })

    it('should return the entity if it miss the specified claim', function (done) {
      const result = wdFilter({ claim: '~P31:Q5' })(entityLine)
      should(result).be.ok()
      const result2 = wdFilter({ claim: '~P2002' })(entityLine)
      should(result2).be.ok()
      done()
    })
  })
})
