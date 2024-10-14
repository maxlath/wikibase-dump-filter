import should from 'should'
import formatEntity from '../lib/format_entity.js'
import { getEntity } from './utils.js'

describe('simplify', () => {
  describe('validation', () => {
    it('should reject an invalid boolean', () => {
      should(() => formatEntity({ simplify: 'bulgroz' })).throw()
    })

    it('should accept an object', () => {
      should(() => formatEntity({ simplify: { keepQualifiers: true } })).not.throw()
    })
  })

  it('should simplify claims if true', () => {
    const result = formatEntity({ simplify: true })(getEntity())
    result.claims.P31[0].should.equal('Q3336843')
  })

  it('should not simplify claims if false', () => {
    const result = formatEntity({ simplify: false })(getEntity())
    result.claims.P31[0].should.be.an.Object()

    const result2 = formatEntity({})(getEntity())
    result2.claims.P31[0].should.be.an.Object()
  })

  describe('options', () => {
    it('should pass the options to the wbk.simplify function', () => {
      const result = formatEntity({ simplify: { keepQualifiers: true } })(getEntity())
      should(result.claims.P1549[2].mainsnak).not.be.ok()
      result.claims.P1549[2].qualifiers.should.be.an.Object()
      result.claims.P1549[2].qualifiers.P518.should.be.an.Object()
    })
  })
})
