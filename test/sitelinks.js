import should from 'should'
import filterEntity from '../lib/filter_entity.js'
import { getEntity } from './utils.js'

const entity = getEntity()

describe('sitelinks', () => {
  describe('validation', () => {
    it('should reject invalid sitelinks', () => {
      should(() => filterEntity({ sitelink: 'frwi-ki|enwiki&elficwiki' })).throw()
    })
  })
  it('should return true if it has the specified sitelink', () => {
    const result = filterEntity({ sitelink: 'frwiki' })(entity)
    result.should.be.true()
  })
  it("should return false if it doesn't have the sitelink", () => {
    const result = filterEntity({ sitelink: 'elficwiki' })(entity)
    result.should.be.false()
  })
  it('should return true if it has one of the possible sitelink', () => {
    const result = filterEntity({ sitelink: 'elficwiki|frwiki' })(entity)
    result.should.be.true()
  })
  it("should return false if it doesn't have one of the required sitelinks", () => {
    const result = filterEntity({ sitelink: 'elficwiki&frwiki' })(entity)
    result.should.be.false()
  })
  it('should return true if it matches all the required groups', () => {
    const result = filterEntity({ sitelink: 'elficwiki|frwiki&enwiki' })(entity)
    result.should.be.true()
  })
  it("should return false if it doesn't match all the required groups", () => {
    const result = filterEntity({ sitelink: 'frwiki|enwiki&elficwiki' })(entity)
    result.should.be.false()
  })

  it('should support old dumps where sitelinks might be empty', () => {
    const entity = getEntity()
    delete entity.sitelinks
    const result = filterEntity({ sitelink: 'frwiki|enwiki&elficwiki' })(entity)
    should(result).be.false()
  })
})
