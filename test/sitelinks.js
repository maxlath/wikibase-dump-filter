const should = require('should')
const wdFilter = require('../lib/wikidata_filter')
const { getEntity } = require('./utils')
const entity = getEntity()

describe('sitelinks', () => {
  describe('validation', () => {
    it('should reject invalid sitelinks', done => {
      should(() => wdFilter({ sitelink: 'frwi-ki|enwiki&elficwiki' })).throw()
      done()
    })
  })
  it('should return the entity if it has the specified sitelink', done => {
    const result = wdFilter({ sitelink: 'frwiki' })(entity)
    result.should.be.a.Object()
    done()
  })
  it("should not return the entity if it doesn't have the sitelink", done => {
    const result = wdFilter({ sitelink: 'elficwiki' })(entity)
    should(result).not.be.ok()
    done()
  })
  it('should return the entity if it has one of the possible sitelink', done => {
    const result = wdFilter({ sitelink: 'elficwiki|frwiki' })(entity)
    result.should.be.a.Object()
    done()
  })
  it("should not return the entity if it donesn't have one of the required sitelinks", done => {
    const result = wdFilter({ sitelink: 'elficwiki&frwiki' })(entity)
    should(result).not.be.ok()
    done()
  })
  it('should return the entity if it matches all the required groups', done => {
    const result = wdFilter({ sitelink: 'elficwiki|frwiki&enwiki' })(entity)
    result.should.be.a.Object()
    done()
  })
  it("should not return the entity if it doesn't match all the required groups", done => {
    const result = wdFilter({ sitelink: 'frwiki|enwiki&elficwiki' })(entity)
    should(result).not.be.a.Object()
    done()
  })
})
