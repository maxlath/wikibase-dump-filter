# wikibase-dump-filter

**Filter and format a [newline-delimited JSON](https://en.wikipedia.org/wiki/NDJSON) stream of Wikibase entities.**

Typically useful to create a formatted subset of a Wikibase JSON dump.

**Some context**: This tool was formerly known as [`wikidata-filter`](https://www.npmjs.com/package/wikidata-filter). [Wikidata](https://en.wikipedia.org/wiki/Wikidata) is an instance of [Wikibase](https://en.wikipedia.org/wiki/Wikibase). This tool was primarly designed with Wikidata in mind, but should be usable for any Wikibase instance.

This project [received a Wikimedia Project Grant](https://meta.wikimedia.org/wiki/Grants:Project/WikidataJS).

<div align="center">
  <br>
  <a href="https://wikiba.se"><img height="150" src="https://raw.githubusercontent.com/maxlath/wikibase-sdk/main/assets/wikibase.png" alt="wikibase"></a>
  <!-- yeay hacky margin \o/ -->
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://wikidata.org"><img src="https://raw.githubusercontent.com/maxlath/wikibase-sdk/main/assets/wikidata.jpg" alt="wikidata"></a>
  <br>
  <br>
</div>

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E=%20v6.4.0-brightgreen.svg)](http://nodejs.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

[![NPM](https://nodei.co/npm/wikidata-filter.png?stars&downloads&downloadRank)](https://npmjs.com/package/wikibase-dump-filter/)
[Download stats](https://npm-stat.com/charts.html?package=wikibase-dump-filter)

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [Changelog](#changelog)
- [Download dump](#download-dump)
  - [Wikidata dumps](#wikidata-dumps)
  - [Your own Wikibase instance dump](#your-own-wikibase-instance-dump)
- [How-to](#how-to)
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

## Changelog
See [CHANGELOG.md](CHANGELOG.md) for version info

## Download dump

### Wikidata dumps
Wikidata provides a bunch of [database dumps](https://www.wikidata.org/wiki/Wikidata:Database_download), among which the desired [JSON dump](https://www.wikidata.org/wiki/Wikidata:Database_download#JSON_dumps_.28recommended.29). As a Wikidata dump is a very laaarge file (April 2020: 75GB compressed), it is recommended to download that file first before doing operations on it, so that if anything crashes, you don't have to start the download from zero (the download time being usually the bottleneck).
```sh
wget -c https://dumps.wikimedia.org/wikidatawiki/entities/latest-all.json.gz
cat latest-all.json.gz | gzip -d | wikibase-dump-filter --claim P31:Q5 > humans.ndjson
```

### Your own Wikibase instance dump
You can generate a JSON dump using the script [`dumpJson.php`](https://github.com/wikimedia/mediawiki-extensions-Wikibase/blob/master/repo/maintenance/dumpJson.php). If you are running Wikibase with [`wikibase-docker`](https://github.com/wmde/wikibase-docker), you could use the following command:
```sh
cd wikibase-docker
docker-compose exec wikibase /bin/sh -c "php ./extensions/Wikibase/repo/maintenance/dumpJson.php --log /dev/null" > dump.json
cat dump.json | wikibase-dump-filter --claim P1:Q1 > entities_with_claim_P1_Q1.ndjson
```

## How-to
This package can both be used as a command-line tool (CLI) and as a NodeJS module. Those 2 uses have their own documentation page but the options stay the same, and are documented in the CLI section

* [CLI documentation](docs/cli.md)
* [module documentation](docs/module.md)

## See Also
* [wikibase-dump-formatter](https://github.com/maxlath/wikibase-dump-formatter): Extends Wikibase RDF dump prefixed URIs with a custom domain.
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
