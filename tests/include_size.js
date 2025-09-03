import should from 'should'
import formatEntity from '../lib/format_entity.js'
import { getEntity } from './utils.js'

describe('include-size', () => {
  it('should include the correct size when true', () => {
    const result = formatEntity({ includeSize: true })(getEntity())
    result.size.should.equal(61454)
  })

  it('should not include size when false', () => {
    const result = formatEntity({ includeSize: false })(getEntity())
    should(result.size).not.be.ok()
  })

  it('should not include size when option is missing', () => {
    const result = formatEntity({})(getEntity())
    should(result.size).not.be.ok()
  })
})
