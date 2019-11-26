# Wikidata filter

Filter and format a newline-delimited JSON stream of Wikidata entities

Typically useful to create a formatted subset of a [dump](https://www.wikidata.org/wiki/Wikidata:Database_download#JSON_dumps_.28recommended.29)).

While this tool is named `wikidata-filter`, it can actually be used for any Wikibase instance.

This project is [funded by a Wikimedia Project Grant](https://meta.wikimedia.org/wiki/Grants:Project/WikidataJS).

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E=%20v6.4.0-brightgreen.svg)](http://nodejs.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

[![wikidata](https://raw.githubusercontent.com/maxlath/wikidata-sdk/master/assets/wikidata.jpg)](https://wikidata.org)

[![NPM](https://nodei.co/npm/wikidata-filter.png?stars&downloads&downloadRank)](https://npmjs.com/package/wikidata-filter/)

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [How-to](docs/how_to.md)
  - [CLI](docs/cli.md)
  - [module](docs/module.md)
- [Donate](#donate)
- [See Also](#see-also)
- [You may also like](#you-may-also-like)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install
this tool requires to have [NodeJs](http://nodejs.org) installed.

```sh
npm install -g wikidata-filter
```

## How-to
See [How-to](docs/how_to.md):
### [CLI](docs/cli.md)
### [module](docs/module.md)

## Donate

We are developing and maintaining tools to work with Wikidata from NodeJS, the browser, or simply the command line, with quality and ease of use at heart. Any donation will be interpreted as a "please keep going, your work is very much needed and awesome. PS: love". [Donate](https://liberapay.com/WikidataJS)

## See Also
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
