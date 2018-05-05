# How-To

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Filter entities](#filter-entities)
  - [By claims](#by-claims)
    - [Long claim option](#long-claim-option)
  - [By sitelinks](#by-sitelinks)
  - [By type](#by-type)
  - [By something else](#by-something-else)
  - [Parallelize](#parallelize)
- [Format entities](#format-entities)
  - [Filter attributes](#filter-attributes)
  - [Filter languages](#filter-languages)
  - [Simplify entity data](#simplify-entity-data)
- [Other options](#other-options)
- [Usage as module](#usage-as-module)
- [Examples](#examples)
  - [Get all entities with a Chinese and a French Wikipedia article, keeping only id, labels, and sitelinks matching those languages](#get-all-entities-with-a-chinese-and-a-french-wikipedia-article-keeping-only-id-labels-and-sitelinks-matching-those-languages)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Filter entities
### By [claims](https://www.wikidata.org/wiki/Wikidata:Glossary#Claims_and_statements)

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

#### Long claim option
If [your claim is too long and triggers a `Argument list too long` error](https://github.com/maxlath/wikidata-filter/issues/13), you can pass a file instead:
```sh
echo 'P31:Q5,Q6256' > ./claim
cat entities.json | wikidata-filter --claim ./claim > humans_and_countries.ndjson
```

### By [sitelinks](https://www.wikidata.org/wiki/Wikidata:Glossary#Sitelinks)
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

### By [type](https://www.wikidata.org/wiki/Wikidata:Glossary#Entities.2C_items.2C_properties_and_queries)
Default: `item`
```sh
cat entities.json | wikidata-filter --type item
cat entities.json | wikidata-filter --type property
cat entities.json | wikidata-filter --type both
```

### By something else
Need another kind of filter? Just [ask for it in the issues](https://github.com/maxlath/wikidata-filter/issues), or make a pull request!


### Parallelize
If your hardware happens to have several cores, we can do better:
* replace `gzip` by [`pigz`](https://zlib.net/pigz/)
* load balance lines over several `wikidata-filter` processes using [`load-balance-lines`](https://github.com/maxlath/load-balance-lines) or something that does the same job

```sh
# install those new dependencies
sudo apt-get install pigz
npm install --global load-balance-lines

wget --continue https://dumps.wikimedia.org/wikidatawiki/entities/latest-all.json.gz
nice -n+19 pigz -d < latest-all.json.gz | nice -n+19 load-balance-lines wikidata-filter --claim P31:Q5 > humans.ndjson
```

Using [`nice`](http://man7.org/linux/man-pages/man1/nice.1.html) to tell the system that those processes, while eager to eat all the CPUs, should have the lowest priority.
If you are not familiar with the `<` operator, it's the equivalent of `cat latest-all.json.gz | nice -n+19 pigz -d` but in a shell built-in way. (See [I/O Redirection doc](http://www.tldp.org/LDP/abs/html/io-redirection.html))

## Format entities
### Filter attributes

Wikidata entities have the following attributes: `id`, `type`, `labels`, `descriptions`, `aliases`, `claims`, `sitelinks`.
All in all, this whole takes a lot of place and might not be needed in your use case: for instance, if your goal is to do [full text search on a subset of Wikidata](http://github.com/inventaire/inv-elasticsearch), you just need to keep the labels, aliases and descriptions, and you can omit the claims and sitelinks that do take a lot of space.

This can be done with either the `--keep` or the `--omit` command:
```sh
cat entities.json | wikidata-filter --omit claims,sitelinks > humans.ndjson
# which is equivalent to
cat entities.json | wikidata-filter --keep id,type,labels,descriptions,aliases > humans.ndjson
```

### Filter languages
Keep only the desired languages for labels, descriptions, aliases, and sitelinks.
```sh
cat entities.json | wikidata-filter --languages en,fr,de,zh,eo > subset.ndjson
```

### Simplify entity data
Uses [wikidata-sdk `simplify.entity` function](https://github.com/maxlath/wikidata-sdk#simplify-entity) to parse the labels, descriptions, aliases, claims, and sitelinks.
```sh
cat entities.json | wikidata-filter --simplified > simplified_dump.ndjson
```

## Other options
```
-h, --help      output usage information
-V, --version   output the version number
```

## Usage as module

The wikidata-filter module provides helper methods to parse, serialize and filter entities from Wikidata dumps.

```js
const { parser, serializer, filter } = require('wikidata-filter')
```

Chain filter functions
```js
# Filter functions must return a (possibly modified) entity, or undefined or null
# to filter-out the entity
const fixEntities = entity => {
  if (entity.id == 'Q12345') {
    entity.labels.en = { language: 'en', value: 'Count von Count' }
  }
  return entity
}

// Build a filter from options documented above
var langFilter = filter({ type: 'item', languages: [ 'en', 'fr' ] })

// return a stream of entities
parser(process.stdin)
// filter entity stream
.filter(fixEntities)
// filters can be chained
.filter(langFilter)
// serialize entities as newline delimited JSON
.filter(serializer)
.pipe(process.stdout)
```

or directly add a configured filter to a stream of entities
```js
parser(process.stdin, {
  type: 'item',
  keep: [ 'labels', 'claims' ]
  simplified: true,
  languages: [ 'zh', 'fr' ]
})
```

## Examples

### Get all entities with a Chinese and a French Wikipedia article, keeping only id, labels, and sitelinks matching those languages

The [equivalent SPARQL query](https://query.wikidata.org/#SELECT%20%3Fs%20%3FsLabel%20WHERE%20%7B%0A%20%20%20%20%3Farticlea%20schema%3Aabout%20%3Fs%20.%0A%20%20%20%20%3Farticlea%20schema%3AisPartOf%20%3Chttps%3A%2F%2Fzh.wikipedia.org%2F%3E%20.%0A%20%20%20%20%3Farticleb%20schema%3Aabout%20%3Fs%20.%0A%20%20%20%20%3Farticleb%20schema%3AisPartOf%20%3Chttps%3A%2F%2Ffr.wikipedia.org%2F%3E%20.%0A%20%20%20%20%23%20The%20article%20shouldn%27t%20be%20a%20disambiguation%20page%0A%20%20%09FILTER%20NOT%20EXISTS%20%7B%20%3Fs%20wdt%3AP31%20wd%3AQ4167410.%20%7D%0A%7D%0ALIMIT%205) times out

```sh
DUMP='https://dumps.wikimedia.org/wikidatawiki/entities/latest-all.json.gz'
curl $DUMP | gzip -d | wikidata-filter --sitelink 'zhwiki&frwiki' --keep id,labels,sitelinks --languages zh,fr --simplified > subset.ndjson
```
