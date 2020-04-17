# wikibase-dump-filter

**Filter and format a [newline-delimited JSON](https://en.wikipedia.org/wiki/NDJSON) stream of Wikibase entities.**

Typically useful to create a formatted subset of a Wikibase JSON dump. See [Wikidata dump](https://www.wikidata.org/wiki/Wikidata:Database_download#JSON_dumps_.28recommended.29).

**Some context**: This tool was formerly known as `wikidata-filter`. [Wikidata](https://en.wikipedia.org/wiki/Wikidata) is an instance of [Wikibase](https://en.wikipedia.org/wiki/Wikibase). This tool was primarly designed with Wikidata in mind, but should be usable for any Wikibase instance.

This project [received a Wikimedia Project Grant](https://meta.wikimedia.org/wiki/Grants:Project/WikidataJS).

<div align="center">
  <br>
  <a href="https://wikiba.se"><img height="150" src="https://raw.githubusercontent.com/maxlath/wikibase-sdk/master/assets/wikibase.png" alt="wikibase"></a>
  <!-- yeay hacky margin \o/ -->
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://wikidata.org"><img src="https://raw.githubusercontent.com/maxlath/wikibase-sdk/master/assets/wikidata.jpg" alt="wikidata"></a>
  <br>
  <br>
</div>

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E=%20v6.4.0-brightgreen.svg)](http://nodejs.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

[![NPM](https://nodei.co/npm/wikidata-filter.png?stars&downloads&downloadRank)](https://npmjs.com/package/wikidata-filter/)

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [How-to](docs/how_to.md)
- [Donate](#donate)
- [See Also](#see-also)
- [You may also like](#you-may-also-like)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install
this tool requires to have [NodeJs](http://nodejs.org) installed.

```sh
# Install globally
npm install -g wikibase-dump-filter
# Or install just to be used in the scripts of the current project
npm install wikibase-dump-filter
```

## How-to
This package can both be used as a command-line tool (CLI) and as a NodeJS module. Those 2 uses have there own documentation page but the options stay the same, and are documented in the CLI section

* [CLI documentation](docs/cli.md)
* [module documentation](docs/module.md)

## Donate

We are developing and maintaining tools to work with Wikidata from NodeJS, the browser, or simply the command line, with quality and ease of use at heart. Any donation will be interpreted as a "please keep going, your work is very much needed and awesome. PS: love". [Donate](https://liberapay.com/WikidataJS)

## See Also
* [wikibase-dump-formatter](https://github.com/maxlath/wikibase-dump-formatter): Extends Wikibase dump prefixed URIs with a custom domain.
* [wikibase-cli](https://www.npmjs.com/package/wikibase-cli): The command-line interface to Wikibase
* [wikibase-sdk](https://www.npmjs.com/package/wikibase-sdk): A javascript tool suite to query and work with Wikibase data
* [wikibase-edit](https://www.npmjs.com/package/wikibase-edit): Edit Wikibase from NodeJS, used in wikidata-cli for all [write operations](#write-operations)
* [wikidata-subset-search-engine](https://github.com/inventaire/entities-search-engine/tree/wikidata-subset-search-engine): Tools to setup an ElasticSearch instance fed with subsets of Wikidata
* [import-wikidata-dump-to-couchdb](https://github.com/maxlath/import-wikidata-dump-to-couchdb): Import a subset or a full Wikidata dump into a CouchDB database
* [wikidata-taxonomy](https://github.com/nichtich/wikidata-taxonomy): A command-line tool to extract taxonomies from Wikidata
* [Other Wikidata external tools](https://www.wikidata.org/wiki/Wikidata:Tools/External_tools)
-------------

## You may also like

[![inventaire banner](https://inventaire.io/public/images/inventaire-brittanystevens-13947832357-CC-BY-lighter-blue-4-banner-500px.png)](https://inventaire.io)

Do you know [Inventaire](https://inventaire.io/)? It's a web app to share books with your friends, built on top of Wikidata! And its [libre software](http://github.com/inventaire/inventaire) too.

## License
[MIT](LICENSE.md)
