# CHANGELOG
*versions follow [SemVer](http://semver.org)*

## 6.0.0 - 2024-10-14
**BREAKING CHANGE**: `wikibase-dump-filter` now uses the [ES module](https://nodejs.org/api/esm.html) syntax. This also requires to bump the minimal NodeJS version to `>= v14.0.0`.

## 5.0.0 - 2020-04-17
Rename project: `wikidata-filter` -> `wikibase-dump-filter`

To update from `wikidata-filter` (assuming that you had `wikidata-filter` installed globally):
```sh
npm uninstall --global wikidata-filter
npm install --global wikibase-dump-filter
```

## 4.0.0 - 2019-11-26
### BREAKING CHANGES

Rewrote the [module interface](https://github.com/maxlath/wikibase-dump-filter/blob/main/docs/module.md). Convert your code from `v3` to `v4`:
* `parse` -> `getEntitiesStream`
* `filter` -> `filterFormatAndSerialize`
* `serializer` -> `serialize`
* stream method `filter` -> `filterAndMap`

### New features
* CLI
  * Added [`--quiet` option](https://github.com/maxlath/wikibase-dump-filter/blob/main/docs/cli.md#other-options)
* NodeJS module
  * get access to more internal helpers: `getEntitiesStream`, `buildFilter`, `buildFormatter`
  * streams returned by `getEntitiesStream` have new methods: `filter`, `map`, `tap`

## 3.0.0 - 2019-05-05
### BREAKING CHANGES
* [The `--simplified` option was renamed `--simplify` and accepts options as JSON or key=value](https://github.com/maxlath/wikibase-dump-filter/blob/main/docs/cli.md#simplify-entity-data) ([`64ab6ce`](https://github.com/maxlath/wikibase-dump-filter/commit/64ab6ce), [`54af4ad`](https://github.com/maxlath/wikibase-dump-filter/commit/54af4ad))

## 2.4.0 - 2019-05-05
* Added support for [claim filters with logical operations](https://github.com/maxlath/wikibase-dump-filter/blob/main/docs/cli.md#claims-logical-operators) ([`642eaa3`](https://github.com/maxlath/wikibase-dump-filter/commit/642eaa3))
* Added progress bar ([`2692f3b`](https://github.com/maxlath/wikibase-dump-filter/commit/2692f3b))

## 2.3.0 - 2018-05-03
* [Simplify creation of a filtered stream](https://github.com/maxlath/wikibase-dump-filter/blob/main/docs/module.md)

## 2.2.0 - 2018-05-03
* Added support for [long claim arguments](https://github.com/maxlath/wikibase-dump-filter/blob/main/docs/cli.md#long-claim-option)

## 2.1.0 - 2017-09-08
* Added the possibility to [use wikidata-filter as module](https://github.com/maxlath/wikibase-dump-filter/blob/main/docs/module.md)

## 2.0.0 - 2017-03-30
### BREAKING CHANGES
* Removed the possibility to pass a claim argument as only argument (that is, without the `-c, --claim` prefix)

### New features
* Added [filter by sitelink](https://github.com/maxlath/wikibase-dump-filter/blob/main/docs/cli.md#by-sitelinks)
