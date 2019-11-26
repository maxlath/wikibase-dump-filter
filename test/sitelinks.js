const should = require('should')
const filterEntity = require('../lib/filter_entity')
const { getEntity } = require('./utils')
const entity = getEntity()

describe('sitelinks', () => {
  describe('validation', () => {
    it('should reject invalid sitelinks', done => {
      should(() => filterEntity({ sitelink: 'frwi-ki|enwiki&elficwiki' })).throw()
      done()
    })
  })
  it('should return true if it has the specified sitelink', done => {
    const result = filterEntity({ sitelink: 'frwiki' })(entity)
    result.should.be.true()
    done()
  })
  it("should return false if it doesn't have the sitelink", done => {
    const result = filterEntity({ sitelink: 'elficwiki' })(entity)
    result.should.be.false()
    done()
  })
  it('should return true if it has one of the possible sitelink', done => {
    const result = filterEntity({ sitelink: 'elficwiki|frwiki' })(entity)
    result.should.be.true()
    done()
  })
  it("should return false if it doesn't have one of the required sitelinks", done => {
    const result = filterEntity({ sitelink: 'elficwiki&frwiki' })(entity)
    result.should.be.false()
    done()
  })
  it('should return true if it matches all the required groups', done => {
    const result = filterEntity({ sitelink: 'elficwiki|frwiki&enwiki' })(entity)
    result.should.be.true()
    done()
  })
  it("should return false if it doesn't match all the required groups", done => {
    const result = filterEntity({ sitelink: 'frwiki|enwiki&elficwiki' })(entity)
    result.should.be.false()
    done()
  })
})
