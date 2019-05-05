# CHANGELOG
*versions follow [SemVer](http://semver.org)*

## 3.0.0 - 2019-05-05
**BREAKING CHANGE**
* [The `--simplified` option was renamed `--simplify` and accepts options as JSON or key=value](https://github.com/maxlath/wikidata-filter/blob/master/docs/how_to.md#simplify-entity-data) ([`64ab6ce`](https://github.com/maxlath/wikidata-filter/commit/64ab6ce), [`54af4ad`](https://github.com/maxlath/wikidata-filter/commit/54af4ad))

## 2.4.0 - 2019-05-05
* Added support for [claim filters with logical operations](https://github.com/maxlath/wikidata-filter/blob/master/docs/how_to.md#claims-logical-operators) ([`642eaa3`](https://github.com/maxlath/wikidata-filter/commit/642eaa3))
* Added progress bar ([`2692f3b`](https://github.com/maxlath/wikidata-filter/commit/2692f3b))

## 2.3.0 - 2018-05-03
* [Simplify creation of a filtered stream](https://github.com/maxlath/wikidata-filter/blob/master/docs/how_to.md#usage-as-module)

## 2.2.0 - 2018-05-03
* Added support for [long claim arguments](https://github.com/maxlath/wikidata-filter/blob/master/docs/how_to.md#long-claim-option)

## 2.1.0 - 2017-09-08
* Added the possibility to [use wikidata-filter as module](https://github.com/maxlath/wikidata-filter/blob/master/docs/how_to.md#usage-as-module)

## 2.0.0 - 2017-03-30
**BREAKING CHANGE**
* Removed the possibility to pass a claim argument as only argument (that is, without the `-c, --claim` prefix)

**Added Features**
* Added [filter by sitelink](https://github.com/maxlath/wikidata-filter/blob/master/docs/how_to.md#by-sitelinks)
