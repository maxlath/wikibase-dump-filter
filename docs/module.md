# Module

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [parseEntitiesStream](#parseentitiesstream)
- [custom parsers](#custom-parsers)
- [even more custom parsers](#even-more-custom-parsers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

The `wikibase-dump-filter` module exposes the functions used internally by the [CLI](https://github.com/maxlath/wikidata-filter/blob/master/docs/cli.md) to parse, map, filter, and serialize entities from a Wikibase JSON dumps. This should allow to write more custom filters without having to start from scratch.

### parseEntitiesStream
The all-in-one helper

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

const oddEntitiesClaimsStream = GetEntitiesStream(process.stdin)
  .filter(entityIdIsOdd)
  .map(getClaims)
```
