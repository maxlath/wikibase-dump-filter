const should = require('should')
const fs = require('fs')

const wdFilter = require('../lib/wikidata_filter')
const entityLine = fs.readFileSync('./test/fixtures/entity', { encoding: 'utf-8' })

describe('wikidata_filter', function () {
  describe('general', function () {
    it('should return a function', function (done) {
      wdFilter({}).should.be.a.Function()
      done()
    })
  })

  describe('claim', function () {
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

  describe('attributes', function () {
    describe('keep', function () {
      it('should keep specified attributes, omit the others', function (done) {
        const options = { keep: ['id'] }
        const result = JSON.parse(wdFilter(options)(entityLine))
        result.id.should.be.ok()
        should(result.type).not.be.ok()
        should(result.aliases).not.be.ok()
        should(result.labels).not.be.ok()
        should(result.descriptions).not.be.ok()
        should(result.sitelinks).not.be.ok()
        done()
      })
    })

    describe('omit', function () {
      it('should omit specified attributes, keep the others', function (done) {
        const options = { omit: ['sitelinks'] }
        const result = JSON.parse(wdFilter(options)(entityLine))
        result.id.should.be.ok()
        result.type.should.be.ok()
        result.aliases.should.be.ok()
        result.labels.should.be.ok()
        result.descriptions.should.be.ok()
        should(result.sitelinks).not.be.ok()
        done()
      })
    })
  })

  describe('type', function () {
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

  describe('languages', function () {
    it('should keep data for the specified languages', function (done) {
      const result = JSON.parse(wdFilter({ languages: ['es', 'de'] })(entityLine))
      result.labels.es.should.be.ok()
      result.labels.de.should.be.ok()
      Object.keys(result.labels).length.should.equal(2)
      result.descriptions.es.should.be.ok()
      result.descriptions.de.should.be.ok()
      Object.keys(result.descriptions).length.should.equal(2)
      result.aliases.es.should.be.ok()
      result.aliases.de.should.be.ok()
      Object.keys(result.aliases).length.should.equal(2)
      done()
    })
  })

  describe('simplified', function () {
    it('should simplify claims if true', function (done) {
      const result = JSON.parse(wdFilter({ simplified: true })(entityLine))
      result.claims.P31[0].should.equal('Q1454986')
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
})
