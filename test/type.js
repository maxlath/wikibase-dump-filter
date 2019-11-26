const should = require('should')
const filter = require('../lib/filter_entity')
const { getEntity } = require('./utils')
const entity = getEntity()

describe('type', () => {
  describe('validation', () => {
    it('should reject an invalid type', done => {
      should(() => filter({ type: 'bulgroz' })).throw()
      done()
    })
  })
  it('should keep entities of the specified type', done => {
    const result = filter({ type: 'item' })(entity)
    should(result).be.ok()
    const result2 = filter({ type: 'property' })(entity)
    should(result2).not.be.ok()
    const result3 = filter({ type: 'both' })(entity)
    should(result3).be.ok()
    done()
  })
})
