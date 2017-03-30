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
})
