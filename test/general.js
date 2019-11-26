require('should')
const formatEntity = require('../lib/filter_entity')
const filterEntity = require('../lib/format_entity')

describe('general', () => {
  describe('format entity', () => {
    it('should return a function', done => {
      formatEntity({}).should.be.a.Function()
      done()
    })
  })

  describe('filter entity', () => {
    it('should return a function', done => {
      filterEntity({}).should.be.a.Function()
      done()
    })
  })
})
