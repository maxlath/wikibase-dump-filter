const should = require('should')
const fs = require('fs')

const wdFilter = require('../lib/wikidata_filter')
const entityLine = fs.readFileSync('./test/fixtures/entity', { encoding: 'utf-8' })

describe('sitelinks', function () {
  it('should return the entity if it has the specified sitelink', function (done) {
    const result = wdFilter({ sitelink: 'frwiki' })(entityLine)
    result.should.be.a.String()
    done()
  })
  it("should not return the entity if it doesn't have the sitelink", function (done) {
    const result = wdFilter({ sitelink: 'commonswiki' })(entityLine)
    should(result).not.be.ok()
    done()
  })
  it('should return the entity if it has one of the possible sitelink', function (done) {
    const result = wdFilter({ sitelink: 'commonswiki|frwiki' })(entityLine)
    result.should.be.a.String()
    done()
  })
  it("should not return the entity if it donesn't have one of the required sitelinks", function (done) {
    const result = wdFilter({ sitelink: 'commonswiki&frwiki' })(entityLine)
    should(result).not.be.ok()
    done()
  })
  it('should return the entity if it matches all the required groups', function (done) {
    const result = wdFilter({ sitelink: 'commonswiki|frwiki&enwiki' })(entityLine)
    result.should.be.a.String()
    done()
  })
  it("should not return the entity if it doesn't match all the required groups", function (done) {
    const result = wdFilter({ sitelink: 'frwiki|enwiki&commonswiki' })(entityLine)
    should(result).not.be.a.String()
    done()
  })
  it('should reject invalid sitelinks', function (done) {
    should(() => wdFilter({ sitelink: 'frwi-ki|enwiki&commonswiki' })).throw()
    done()
  })
})
