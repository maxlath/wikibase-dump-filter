require 'coffee-errors'
should = require 'should'
fs = require 'fs'

wdFilter = require '../src/lib/wikidata_filter'
entityLine = fs.readFileSync './test/fixtures/entity', {encoding: 'utf-8'}

describe 'wikidata_filter', ->
  describe 'general', ->
    it 'should return a function', (done)->
      wdFilter({}).should.be.a.Function()
      done()

  describe 'claim', ->
    describe 'positive claim', ->
      it 'should return the entity if it has the specified claim', (done)->
        result = wdFilter({ claim: 'P31:Q1454986' })(entityLine)
        result.should.be.a.String()
        result = wdFilter({ claim: 'P31' })(entityLine)
        result.should.be.a.String()
        done()

      it 'should not return the entity if it miss the specified claim', (done)->
        result = wdFilter({ claim: 'P31:Q5' })(entityLine)
        should(result).not.be.ok()
        result = wdFilter({ claim: 'P2002' })(entityLine)
        should(result).not.be.ok()
        done()

    describe 'negative claim', ->
      it 'should not return the entity if it has the specified claim', (done)->
        result = wdFilter({ claim: '~P31:Q1454986' })(entityLine)
        should(result).not.be.ok()
        result = wdFilter({ claim: '~P31' })(entityLine)
        should(result).not.be.ok()
        done()

      it 'should return the entity if it miss the specified claim', (done)->
        result = wdFilter({ claim: '~P31:Q5' })(entityLine)
        should(result).be.ok()
        result = wdFilter({ claim: '~P2002' })(entityLine)
        should(result).be.ok()
        done()

  describe 'attributes', ->
    describe 'keep', ->
      it 'should keep specified attributes, omit the others', (done)->
        options = { keep: ['id'] }
        result = JSON.parse wdFilter(options)(entityLine)
        result.id.should.be.ok()
        should(result.type).not.be.ok()
        should(result.aliases).not.be.ok()
        should(result.labels).not.be.ok()
        should(result.descriptions).not.be.ok()
        should(result.sitelinks).not.be.ok()
        done()

    describe 'omit', ->
      it 'should omit specified attributes, keep the others', (done)->
        options = { omit: ['sitelinks'] }
        result = JSON.parse wdFilter(options)(entityLine)
        result.id.should.be.ok()
        result.type.should.be.ok()
        result.aliases.should.be.ok()
        result.labels.should.be.ok()
        result.descriptions.should.be.ok()
        should(result.sitelinks).not.be.ok()
        done()

  describe 'type', ->
    it 'should keep entities of the specified type', (done)->
      result = wdFilter({ type: 'item' })(entityLine)
      should(result).be.ok()
      result = wdFilter({ type: 'property' })(entityLine)
      should(result).not.be.ok()
      result = wdFilter({ type: 'both' })(entityLine)
      should(result).be.ok()
      done()

  describe 'languages', ->
    it 'should keep data for the specified languages', (done)->
      result = JSON.parse wdFilter({ languages: ['es', 'de'] })(entityLine)
      result.labels.es.should.be.ok()
      result.labels.de.should.be.ok()
      Object.keys(result.labels).length.should.equal 2
      result.descriptions.es.should.be.ok()
      result.descriptions.de.should.be.ok()
      Object.keys(result.descriptions).length.should.equal 2
      result.aliases.es.should.be.ok()
      result.aliases.de.should.be.ok()
      Object.keys(result.aliases).length.should.equal 2
      done()

  describe 'simplified', ->
    it 'should simplify claims if true', (done)->
      result = JSON.parse wdFilter({ simplified: true })(entityLine)
      result.claims.P31[0].should.equal 'Q1454986'
      done()

    it 'should not simplify claims if false', (done)->
      result = JSON.parse wdFilter({ simplified: false })(entityLine)
      result.claims.P31[0].should.be.an.Object()
      result = JSON.parse wdFilter({})(entityLine)
      result.claims.P31[0].should.be.an.Object()
      done()
