import 'should'
import formatEntity from '../lib/filter_entity.js'
import filterEntity from '../lib/format_entity.js'

describe('general', () => {
  describe('format entity', () => {
    it('should return a function', () => {
      formatEntity({}).should.be.a.Function()
    })
  })

  describe('filter entity', () => {
    it('should return a function', () => {
      filterEntity({}).should.be.a.Function()
    })
  })
})
