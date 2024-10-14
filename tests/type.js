import should from 'should'
import filter from '../lib/filter_entity.js'
import { getEntity } from './utils.js'

const entity = getEntity()

describe('type', () => {
  describe('validation', () => {
    it('should reject an invalid type', () => {
      should(() => filter({ type: 'bulgroz' })).throw()
    })
  })
  it('should keep entities of the specified type', () => {
    const result = filter({ type: 'item' })(entity)
    should(result).be.ok()
    const result2 = filter({ type: 'property' })(entity)
    should(result2).not.be.ok()
    const result3 = filter({ type: 'both' })(entity)
    should(result3).be.ok()
  })
})
