require('should')
const formatEntity = require('../lib/filter_entity')
const filterEntity = require('../lib/format_entity')

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
