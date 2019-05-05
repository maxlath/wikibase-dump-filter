const should = require('should')
const wdFilter = require('../lib/wikidata_filter')
const { getEntity } = require('./utils')
const entity = getEntity()

describe('type', () => {
  describe('validation', () => {
    it('should reject an invalid type', done => {
      should(() => wdFilter({ type: 'bulgroz' })).throw()
      done()
    })
  })
  it('should keep entities of the specified type', done => {
    const result = wdFilter({ type: 'item' })(entity)
    should(result).be.ok()
    const result2 = wdFilter({ type: 'property' })(entity)
    should(result2).not.be.ok()
    const result3 = wdFilter({ type: 'both' })(entity)
    should(result3).be.ok()
    done()
  })
})
