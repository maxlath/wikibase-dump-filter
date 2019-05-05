require('should')
const { exec } = require('child_process')

describe('integration', () => {
  it('should do as expected', done => {
    exec('cat ./test/fixtures/entities | ./bin/wikidata-filter -k id -c P31:Q5', (err, stdout, stderr) => {
      if (err) return done(err)
      JSON.parse(stdout.split('\n')[0]).id.should.equal('Q23')
      JSON.parse(stdout.split('\n')[1]).id.should.equal('Q185')
      JSON.parse(stdout.split('\n')[2]).id.should.equal('Q255')
      JSON.parse(stdout.split('\n')[3]).id.should.equal('Q306')
      done()
    })
  })
})
