require('should')
const { execSync } = require('child_process')

describe('program', () => {
  it('should work', () => {
    execSync('cat ./test/fixtures/entities | ./bin/wikibase-dump-filter -c P31:Q5 -k id').toString()
    .should.equal('{"id":"Q23"}\n{"id":"Q185"}\n{"id":"Q255"}\n{"id":"Q306"}\n')
  })
})
