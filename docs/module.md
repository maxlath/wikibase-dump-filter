# Module

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Functions](#functions)
  - [getEntitiesStream](#getentitiesstream)
  - [parseEntitiesStream](#parseentitiesstream)
  - [buildFilter](#buildfilter)
  - [buildFormatter](#buildformatter)
  - [serialize](#serialize)
- [Stream methods](#stream-methods)
  - [map](#map)
  - [filter](#filter)
  - [filterAndMap](#filterandmap)
- [Examples](#examples)
  - [custom parsers](#custom-parsers)
  - [even more custom parsers](#even-more-custom-parsers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

The `wikibase-dump-filter` module exposes the functions used internally by the [CLI](https://github.com/maxlath/wikidata-filter/blob/master/docs/cli.md) to parse, map, filter, and serialize entities from a Wikibase JSON dumps. This should allow to write more custom filters without having to start from scratch. One particular concern to keep in mind is that the performance bottleneck is always manipulating JSON - `JSON.parse` and `JSON.stringify` -, so making sure those function are called only once is critical for performance.

## Functions
### getEntitiesStream
`getEntitiesStream` takes a stream as unique argument, typically `process.stdin`, and converts it into a stream of entity objects, with additional [stream methods](#stream-methods). It can be convenient to use it when you desire to output in a custom format.

Example: use in combination with [`filterAndMap`](#filterAndMap) to convert a dump into a list of all the entity ids linked by a P279 claim, in the format `Q8,Q16748867\n`:
```js
const { getEntitiesStream } = require('wikibase-dump-filter')
const { propertyClaims: simplifyPropertyClaims } = require('wikibase-sdk').simplify

getEntitiesStream(process.stdin)
.filterAndMap(item => {
  if (item.type === 'item' && item.claims && item.claims.P279) {
    return simplifyPropertyClaims(item.claims.P279)
      .map(qid => item.id + ',' + qid)
      .join('\n') + '\n'
  }
})
.pipe(process.stdout)
```

### parseEntitiesStream
The all-in-one helper, to use when just passing a set of options is custom enough for your need. The output is a stream of entities as JSON strings, one entity per line, which can typically be piped to `process.stdout` to output valid newline-delimited JSON (NDJSON).

```js
const { parseEntitiesStream } = require('wikibase-dump-filter')

const options = {
  type: 'item',
  keep: [ 'labels', 'claims' ]
  simplify: true,
  languages: [ 'zh', 'fr' ]
}

parseEntitiesStream(process.stdin, options)
.pipe(process.stdout)
```

### buildFilter
### buildFormatter
### serialize
A function to turn a JS object into a JSON string finishing by a newline break, so that it can be piped to `process.stdout` to generate NDJSON. It's this kind of cases where showing you the [code](https://github.com/maxlath/wikibase-dump-filter/blob/master/lib/serialize_entity.js) might be clearer:
```js
const serialize = entity => JSON.stringify(entity) + '\n'
```

## Stream methods
Streams returned by `getEntitiesStream` and `parseEntitiesStream` have the following additional methods, which take a function as unique argument. That function will be sequentially applied to the stream elements, be it entity JS objects in the case of `getEntitiesStream`, or JSON strings in the case of `parseEntitiesStream`

### map
Like the `map` method of Arrays, but on a stream.

Example: transform a dump in a list of entities `lastrevid`
```js
const { getEntitiesStream } = require('wikibase-dump-filter')

getEntitiesStream(process.stdin)
.map(entity => `${entity.lastrevid}\n`)
// The generated stream outputs strings, so no need to pass it to serialize
.pipe(process.stdout)
```
> Note that it's a silly example, not only because I can't think of a use-case, but also because this would be much more performantly be done from the command line with tools like `awk` or `sed`, no need to start a NodeJS process to parse JSON when parsing the dump as text is enough:
>
> `cat dump.json | grep lastrevid | sed 's/.*lastrevid"://' | sed 's/}.*//'`

### filter
Like the `filter` method of Arrays, but on a stream.

```js
const { getEntitiesStream, serialize } = require('wikibase-dump-filter')

getEntitiesStream(process.stdin)
.filter(entity => entity.id.includes('123'))
// The generated stream being a stream of entity objects, we need to serialize the results, that is, not convert it to newline-delimited JSON
.map(serialize)
.pipe(process.stdout)
```

### filterAndMap
Combines `filter` and `map` into a single function (mostly for the sake of performance): if the function returns a falsy value, its value is filtered-out, otherwise that returned value is passed down the stream.

```js
const { getEntitiesStream, serialize } = require('wikibase-dump-filter')

getEntitiesStream(process.stdin)
.filterAndMap(entity => {
  if (entity.id.includes('123')) {
    return serialize(entity)
  }
})
.pipe(process.stdout)
```

## Examples
### custom parsers
The same behavior can be implemented by using the underlying helpers:
```js
const { getEntitiesStream, buildFilter, buildFormatter, serialize } = require('wikibase-dump-filter')

// Build a filter from options documented above
const customFilter = buildFilter({
  type: 'item',
  claim: 'P31:Q571&P300',
  sitelink: 'zhwiki&frwiki'
})

// Build a formatter from options documented above
const customFormatter = buildFormatter({
  simplify: true,
  keep: [ 'labels', 'claims' ]
  languages: [ 'zh', 'fr' ]
})

// Get a stream of entities with `map`, `filter`, `filterAndMap`, and `tap` methods
getEntitiesStream(process.stdin)
.filter(customFilter)
.map(customFormatter)
.map(serialize)
.pipe(process.stdout)
```

Or in a more condensed way
```js
const { filterFormatAndSerialize } = require('wikibase-dump-filter')
const options = {
  type: 'item',
  keep: [ 'labels', 'claims' ]
  simplify: true,
  languages: [ 'zh', 'fr' ]
}
getEntitiesStream(process.stdin)
.filterAndMap(filterFormatAndSerialize(options))
.pipe(process.stdout)
```

### even more custom parsers

Even more customized behaviors can be implemented by writting your own filter and map functions
```js
const entityIdIsOdd= entity => parseInt(entity.id.slice(1)) % 2 === 1
const getClaims = entity => entity.claims

const oddEntitiesClaimsStream = getEntitiesStream(process.stdin)
  .filter(entityIdIsOdd)
  .map(getClaims)
  .pipe(process.stdout)
```
