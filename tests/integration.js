import { exec } from 'child_process'
import should from 'should'

describe('integration', () => {
  it('should do as expected', done => {
    exec('cat ./tests/fixtures/entities | ./bin/wikibase-dump-filter -k id -c P31:Q5', (err, stdout, stderr) => {
      if (err) return done(err)
      JSON.parse(stdout.split('\n')[0]).id.should.equal('Q23')
      JSON.parse(stdout.split('\n')[1]).id.should.equal('Q185')
      JSON.parse(stdout.split('\n')[2]).id.should.equal('Q255')
      JSON.parse(stdout.split('\n')[3]).id.should.equal('Q306')
      done()
    })
  })

  it('should parse json simplify options', done => {
    exec('cat ./tests/fixtures/Q22.json | ./bin/wikibase-dump-filter -s \'{"keepQualifiers":true}\'', (err, stdout, stderr) => {
      if (err) return done(err)
      const entity = JSON.parse(stdout)
      entity.id.should.equal('Q22')
      should(entity.claims.P1549[2].mainsnak).not.be.ok()
      entity.claims.P1549[2].qualifiers.should.be.an.Object()
      entity.claims.P1549[2].qualifiers.P518.should.be.an.Object()
      done()
    })
  })

  it('should parse url-encoded simplify options', done => {
    exec('cat ./tests/fixtures/Q22.json | ./bin/wikibase-dump-filter -s "keepQualifiers=true"', (err, stdout, stderr) => {
      if (err) return done(err)
      const entity = JSON.parse(stdout)
      entity.id.should.equal('Q22')
      should(entity.claims.P1549[2].mainsnak).not.be.ok()
      entity.claims.P1549[2].qualifiers.should.be.an.Object()
      entity.claims.P1549[2].qualifiers.P518.should.be.an.Object()
      done()
    })
  })
})
