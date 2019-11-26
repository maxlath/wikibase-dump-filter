require('should')
const getEntitiesStream = require('../lib/get_entities_stream.js')
const fs = require('fs')

describe('get entities stream', () => {
  it('should be a function', done => {
    getEntitiesStream.should.be.a.Function()
    done()
  })

  it('should have stream methods', done => {
    const stream = fs.createReadStream('./test/fixtures/Q22.json', { encoding: 'utf-8' })
    const entitiesStream = getEntitiesStream(stream)
    entitiesStream.map.should.be.a.Function()
    entitiesStream.filter.should.be.a.Function()
    entitiesStream.mapAndFilter.should.be.a.Function()
    entitiesStream.tap.should.be.a.Function()
    done()
  })

  describe('map', () => {
    it('should return formatted results', done => {
      const stream = fs.createReadStream('./test/fixtures/Q22.json', { encoding: 'utf-8' })
      const entitiesStream = getEntitiesStream(stream)

      entitiesStream
      .map(entity => entity.id)
      .map(id => {
        id.should.equal('Q22')
        done()
      })
    })
  })

  describe('filter', () => {
    it('should keep entities passing the test', done => {
      const stream = fs.createReadStream('./test/fixtures/Q22.json', { encoding: 'utf-8' })
      const entitiesStream = getEntitiesStream(stream)

      entitiesStream
      .filter(entity => entity.id === 'Q22')
      .map(entity => {
        entity.id.should.equal('Q22')
        done()
      })
    })

    it('should reject entities not passing the test', done => {
      const stream = fs.createReadStream('./test/fixtures/Q22.json', { encoding: 'utf-8' })
      const entitiesStream = getEntitiesStream(stream)

      entitiesStream
      .filter(entity => entity.id !== 'Q22')
      .map(entity => {
        done(new Error("shouldn't be called"))
      })
      .on('close', () => done())
    })
  })

  describe('mapAndFilter', () => {
    it('should keep and format entities passing the test', done => {
      const stream = fs.createReadStream('./test/fixtures/Q22.json', { encoding: 'utf-8' })
      const entitiesStream = getEntitiesStream(stream)

      entitiesStream
      .mapAndFilter(entity => {
        if (entity.id === 'Q22') return entity.id
      })
      .map(id => {
        id.should.equal('Q22')
        done()
      })
    })

    it('should reject entities not passing the test', done => {
      const stream = fs.createReadStream('./test/fixtures/Q22.json', { encoding: 'utf-8' })
      const entitiesStream = getEntitiesStream(stream)

      entitiesStream
      .mapAndFilter(entity => {
        if (entity.id !== 'Q22') return entity.id
      })
      .map(entity => {
        done(new Error("shouldn't be called"))
      })
      .on('close', () => done())
    })
  })
})
