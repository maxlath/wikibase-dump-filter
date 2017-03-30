# Wikidata filter

Filter a line-delimited json of Wikidata entities (typically a [dump](https://www.wikidata.org/wiki/Wikidata:Database_download#JSON_dumps_.28recommended.29)) into a subset of entities sharing the specified claim.

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Filter entities by claims](#filter-entities-by-claims)
- [Filter entities by sitelinks](#filter-entities-by-sitelinks)
- [Filter entities attributes](#filter-entities-attributes)
- [Options](#options)
- [Donate](#donate)
- [See Also](#see-also)
- [You may also like](#you-may-also-like)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation
this tool requires to have [NodeJs](http://nodejs.org) installed.

```sh
npm install -g wikidata-filter
```

## Filter entities by [claims](https://www.wikidata.org/wiki/Wikidata:Glossary#Claims_and_statements)

* **from a local file**
```sh
cat entities.json | wikidata-filter --claim P31:Q5 > humans.ndjson
cat entities.json | wikidata-filter --claim P18 > entities_with_an_image.ndjson
cat entities.json | wikidata-filter --claim P31:Q5,Q6256 > humans_and_countries.ndjson
```
this command filters `entities_dump.json` into a subset where all lines are the json with an entity having [Q5](https://wikidata.org/entity/Q5) in it's [P31](https://wikidata.org/wiki/Property:P31) claims

(where ndjson stands for newline-delimited json)

* **directly from a Wikidata dump**
```sh
curl https://dumps.wikimedia.org/wikidatawiki/entities/latest-all.json.gz | gzip -d | wikidata-filter --claim P31:Q5 > humans.ndjson
```
this can be quite convinient when you don't have enough space to keep the whole decompressed dump on your disk: here you only write the desired subset.

Of course, **this probably only make sense if the kind of entities you are looking for is somewhere above 100 000 units(?)**, given that under this level, it would probably be faster/more efficient to get the list of ids from [Wikidata Query](http://query.wikidata.org/), then [get the entities data from the API](https://www.wikidata.org/w/api.php?action=help&modules=wbgetentities) ([wikidata-sdk](https://github.com/maxlath/wikidata-sdk#get-entities-by-id) can be helpful there).

## Filter entities by [sitelinks](https://www.wikidata.org/wiki/Wikidata:Glossary#Sitelinks)
Keep only entities with a certain sitelink
```sh
# entities with a page on Wikimedia Commons
cat entities.json | wikidata-filter --sitelink commonswiki > subset.ndjson
# entities with a Dutch Wikipedia article
cat entities.json | wikidata-filter --sitelink nlwiki > subset.ndjson
# entities with a Russian Wikipedia articles or Wikiquote article
cat entities.json | wikidata-filter --sitelink 'ruwiki|ruwikiquote' > subset.ndjson
```
You can even do finer filters by combining conditions with `&` (AND) / `|` (OR).
```sh
# entities with Chinese and French Wikipedia articles
cat entities.json | wikidata-filter --sitelink 'zhwiki&frwiki' > subset.ndjson
# entities with Chinese and French Wikipedia articles, or Chinese and Spanish articles
cat entities.json | wikidata-filter --sitelink 'zhwiki&frwiki|eswiki' > subset.ndjson
```
**NB**: `A&B|C` is interpreted as `A AND (B OR C)`

## Filter entities attributes

Wikidata entities have the following attributes: `id`, `type`, `labels`, `descriptions`, `aliases`, `claims`, `sitelinks`.
All in all, this whole takes a lot of place and might not be needed in your use case: for instance, if your goal is to do [full text search on a subset of Wikidata](http://github.com/inventaire/inv-elasticsearch), you just need to keep the labels, aliases and descriptions, and you can omit the claims and sitelinks that do take a lot of space.

This can be done with either the `--keep` or the `--omit` command:
```sh
cat entities.json | wikidata-filter --claim P31:Q5 --omit claims,sitelinks > humans.ndjson
# which is equivalent to
cat entities.json | wikidata-filter --claim P31:Q5 --keep id,type,labels,descriptions,aliases > humans.ndjson
```

## Options

```
  Usage: wikidata-filter [options]

  Options:

    -h, --help                   output usage information

    -V, --version                output the version number

    -c, --claim <claim>          Specify the claim the entity should have to pass the filter.
                                 Example: to keep only entities of humans: `wikidata-filter -c P31:Q5`

    -o, --omit <attributes>      Specify the entities attributes to omit among wikidata entities attributes:
                                 type, labels, descriptions, aliases, claims, sitelinks.
                                 Example: to keep only labels and descriptions: `wikidata-filter -o aliases,claims,sitelink`

    -k, --keep <attributes>      The inverse of omit: specify the attributes to keep.
                                 Example: to keep only labels and descriptions: `wikidata-filter -k labels,descriptions`

    -t, --type <type>            Specify which entity type should be kept: item, property or both.
                                 Defaults to item.

    -l, --languages <languages>  Specify for which languages labels, descriptions and aliases should be kept.

    -s, --simplified             Flag to simplify claims values.
                                 Defaults to false.
```


## Donate

We are developing and maintaining tools to work with Wikidata from NodeJS, the browser, or simply the command line, with quality and ease of use at heart. Any donation will be interpreted as a "please keep going, your work is very much needed and awesome. PS: love". [Donate](https://liberapay.com/WikidataJS)

## See Also
* [import-wikidata-dump-to-couchdb](https://github.com/maxlath/import-wikidata-dump-to-couchdb): Import a subset or a full Wikidata dump into a CouchDB database
* [wikidata-cli](https://www.npmjs.com/package/wikidata-cli): The command-line interface to Wikidata
* [wikidata-subset-search-engine](https://github.com/inventaire/wikidata-subset-search-engine): Tools to setup an ElasticSearch instance fed with subsets of Wikidata
* [wikidata-sdk](https://www.npmjs.com/package/wikidata-sdk): A javascript tool suite to query and work with Wikidata data, heavily used by wikidata-cli
* [wikidata-edit](https://www.npmjs.com/package/wikidata-edit): Edit Wikidata from NodeJS, used in wikidata-cli for all [write operations](#write-operations)
* [wikidata-taxonomy](https://github.com/nichtich/wikidata-taxonomy): A command-line tool to extract taxonomies from Wikidata
* [Other Wikidata external tools](https://www.wikidata.org/wiki/Wikidata:Tools/External_tools)
-------------

## You may also like

[![inventaire banner](https://inventaire.io/public/images/inventaire-brittanystevens-13947832357-CC-BY-lighter-blue-4-banner-500px.png)](https://inventaire.io)

Do you know [inventaire.io](https://inventaire.io/)? It's a web app to share books with your friends, built on top of Wikidata! And its [libre software](http://github.com/inventaire/inventaire) too.

## License
[MIT](LICENSE.md)
