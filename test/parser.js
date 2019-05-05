require('should')
const { parser } = require('../index.js')
const fs = require('fs')

describe('parser', () => {
  it('should be a function', (done) => {
    parser.should.be.a.Function()
    done()
  })
  it('should parse with filter', (done) => {
    var simplifiedValue
    var stream = fs.createReadStream('./test/fixtures/Q22.json', { encoding: 'utf-8' })

    stream.on('close', () => {
      simplifiedValue.should.equal('Q3336843')
      done()
    })

    parser(stream, { simplified: true })
    .filter(entity => {
      simplifiedValue = entity.claims.P31[0]
    })
  })
})
