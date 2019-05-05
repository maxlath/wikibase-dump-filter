const should = require('should')
const fs = require('fs')

const wdFilter = require('../lib/wikidata_filter')
const parsedEntity = JSON.parse(fs.readFileSync('./test/fixtures/entity', { encoding: 'utf-8' }))

describe('languages', () => {
  describe('validation', () => {
    it('should reject an invalid language', done => {
      should(() => wdFilter({ languages: 'zzzzz' })).throw()
      done()
    })
  })
  it('should keep data for the specified languages', done => {
    const result = wdFilter({ languages: ['es', 'de', 'ca', 'th'] })(parsedEntity)
    result.labels.es.should.be.ok()
    result.labels.de.should.be.ok()
    result.labels.ca.should.be.ok()
    result.labels.th.should.be.ok()
    Object.keys(result.labels).length.should.equal(4)
    result.descriptions.es.should.be.ok()
    result.descriptions.de.should.be.ok()
    result.descriptions.ca.should.be.ok()
    Object.keys(result.descriptions).length.should.equal(3)
    result.aliases.ca.should.be.ok()
    result.aliases.th.should.be.ok()
    Object.keys(result.aliases).length.should.equal(2)
    result.sitelinks.eswikivoyage.should.be.ok()
    Object.keys(result.sitelinks).length.should.equal(10)
    done()
  })
})
