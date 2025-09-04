import fs from 'fs'
import should from 'should'
import formatEntity from '../lib/format_entity.js'
import parseLine from '../lib/parse_line.js'

const Q22 = fs.readFileSync('./tests/fixtures/Q22.json', { encoding: 'utf-8' })

describe('include-size', () => {
  it('should include the correct size when true', () => {
    const options = { includeSize: true }
    const result = formatEntity(options)(parseLine(Q22, options))
    result.size.should.equal(61454)
  })

  it('should not include size when false', () => {
    const options = { includeSize: false }
    const result = formatEntity({ includeSize: false })(parseLine(Q22, options))
    should(result.size).not.be.ok()
  })

  it('should not include size when option is missing', () => {
    const options = { }
    const result = formatEntity(options)(parseLine(Q22, options))
    should(result.size).not.be.ok()
  })
})
