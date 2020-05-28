# CLI

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Filter entities](#filter-entities)
  - [By claims](#by-claims)
    - [claims logical operators](#claims-logical-operators)
    - [Long claim option](#long-claim-option)
  - [By sitelinks](#by-sitelinks)
  - [By type](#by-type)
  - [By something else](#by-something-else)
- [Format entities](#format-entities)
  - [Filter attributes](#filter-attributes)
  - [Filter languages](#filter-languages)
  - [Simplify entity data](#simplify-entity-data)
- [Other options](#other-options)
- [Tips](#tips)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Filter entities
### By [claims](https://www.wikidata.org/wiki/Wikidata:Glossary#Claims_and_statements)

* **from a local file**
```sh
cat entities.json | wikibase-dump-filter --claim P31:Q5 > humans.ndjson
cat entities.json | wikibase-dump-filter --claim P18 > entities_with_an_image.ndjson
cat entities.json | wikibase-dump-filter --claim P31:Q5,Q6256 > humans_and_countries.ndjson
```
this command filters `entities_dump.json` into a subset where all lines are the json with an entity having [Q5](https://wikidata.org/entity/Q5) in it's [P31](https://wikidata.org/wiki/Property:P31) claims

(where ndjson stands for newline-delimited json)

* **directly from a Wikidata dump**
```sh
curl https://dumps.wikimedia.org/wikidatawiki/entities/latest-all.json.gz | gzip -d | wikibase-dump-filter --claim P31:Q5 > humans.ndjson
```
this can be quite convinient when you don't have enough space to keep the whole decompressed dump on your disk: here you only write the desired subset.

Of course, **this probably only make sense if the kind of entities you are looking for is somewhere above 2 000 000 units(?)**, given that under this level, it would probably be faster/more efficient to get the list of ids from your Wikibase Query Service (see [Wikidata Query Service](http://query.wikidata.org/)), then [get the entities data from the API](https://www.wikidata.org/w/api.php?action=help&modules=wbgetentities) (which could easily be done using [wikibase-cli `wb data`](https://github.com/maxlath/wikibase-cli/blob/master/docs/read_operations.md#wb-data)).

#### claims logical operators
**and**
```sh
# operator: &
cat entities.json | wikibase-dump-filter --claim 'P31:Q571&P50' > books_with_an_author.ndjson
```

**or**
```sh
# operator: |
cat entities.json | wikibase-dump-filter --claim 'P31:Q146|P31:Q144' > cats_and_dogs.ndjson

# the 'or' operator has priority on the 'and' operator:
# this claim filter is equivalent to (P31:Q571 && (P50 || P110))
cat entities.json | wikibase-dump-filter --claim 'P31:Q571&P50|P110' > books_with_an_author_or_an_illustrator.ndjson
```

**not**
```sh
# operator: ~
cat entities.json | wikibase-dump-filter --claim 'P31:Q571&~P50' > books_without_author.ndjson
```

#### Long claim option
If [your claim is too long and triggers a `Argument list too long` error](https://github.com/maxlath/wikibase-dump-filter/issues/13), you can pass a file instead:
```sh
echo 'P31:Q5,Q6256' > ./claim
cat entities.json | wikibase-dump-filter --claim ./claim > humans_and_countries.ndjson
```

### By [sitelinks](https://www.wikidata.org/wiki/Wikidata:Glossary#Sitelinks)
Keep only entities with a certain sitelink
```sh
# entities with a page on Wikimedia Commons
cat entities.json | wikibase-dump-filter --sitelink commonswiki > subset.ndjson
# entities with a Dutch Wikipedia article
cat entities.json | wikibase-dump-filter --sitelink nlwiki > subset.ndjson
# entities with a Russian Wikipedia articles or Wikiquote article
cat entities.json | wikibase-dump-filter --sitelink 'ruwiki|ruwikiquote' > subset.ndjson
```
You can even do finer filters by combining conditions with `&` (AND) / `|` (OR).
```sh
# entities with Chinese and French Wikipedia articles
cat entities.json | wikibase-dump-filter --sitelink 'zhwiki&frwiki' > subset.ndjson
# entities with Chinese and French Wikipedia articles, or Chinese and Spanish articles
cat entities.json | wikibase-dump-filter --sitelink 'zhwiki&frwiki|eswiki' > subset.ndjson
```
**NB**: `A&B|C` is interpreted as `A AND (B OR C)`

### By [type](https://www.wikidata.org/wiki/Wikidata:Glossary#Entities.2C_items.2C_properties_and_queries)
Default: `item`
```sh
cat entities.json | wikibase-dump-filter --type item
cat entities.json | wikibase-dump-filter --type property
cat entities.json | wikibase-dump-filter --type both
```

### By something else
Need another kind of filter? Just [ask for it in the issues](https://github.com/maxlath/wikibase-dump-filter/issues), or make a pull request!

## Format entities
### Filter attributes

Wikidata entities have the following attributes: `id`, `type`, `labels`, `descriptions`, `aliases`, `claims`, `sitelinks`.
All in all, this whole takes a lot of place and might not be needed in your use case: for instance, if your goal is to do [full text search on a subset of Wikidata](http://github.com/inventaire/inv-elasticsearch), you just need to keep the labels, aliases and descriptions, and you can omit the claims and sitelinks that do take a lot of space.

This can be done with either the `--keep` or the `--omit` command:
```sh
cat entities.json | wikibase-dump-filter --omit claims,sitelinks > humans.ndjson
# which is equivalent to
cat entities.json | wikibase-dump-filter --keep id,type,labels,descriptions,aliases > humans.ndjson
```

### Filter languages
Keep only the desired languages for labels, descriptions, aliases, and sitelinks.
```sh
cat entities.json | wikibase-dump-filter --languages en,fr,de,zh,eo > subset.ndjson
```

### Simplify entity data
Uses [wikidata-sdk `simplify.entity` function](https://github.com/maxlath/wikidata-sdk/blob/master/docs/simplify_entities_data.md) to parse the labels, descriptions, aliases, claims, and sitelinks.
```sh
# Default simplify options
cat entities.json | wikibase-dump-filter --simplify > simplified_dump.ndjson
# Custom options, see wdk.simplify.entity documentation https://github.com/maxlath/wikidata-sdk/blob/master/docs/simplify_entities_data.md
# and specifically for claims options, see https://github.com/maxlath/wikidata-sdk/blob/master/docs/simplify_claims.md#options
cat entities.json | wikibase-dump-filter --simplify '{"keepRichValues":"true","keepQualifiers":"true","keepReferences":"true"}' > simplified_dump.ndjson
# The options can also be passed in a lighter, urlencoded-like, key=value format
# that's simpler than typing all those JSON double quotes
cat entities.json | wikibase-dump-filter --simplify 'keepRichValues=true&keepQualifiers=true&keepReferences=true' > simplified_dump.ndjson
```

All the options (see [`wbk.simplify.entity` documentation](https://github.com/maxlath/wikibase-sdk/blob/master/docs/simplify_entities_data.md#simplify-entity) for more details):

* claims simplification options:
  * [`entityPrefix` and `propertyPrefix`](https://github.com/maxlath/wikibase-sdk/blob/master/docs/simplify_claims.md#add-prefixes-to-entities-and-properties-ids) (string)
  * [`keepRichValues`](https://github.com/maxlath/wikibase-sdk/blob/master/docs/simplify_claims.md#keep-rich-values) (boolean)
  * [`keepQualifiers`](https://github.com/maxlath/wikibase-sdk/blob/master/docs/simplify_claims.md#keep-qualifiers) (boolean)
  * [`keepReferences`](https://github.com/maxlath/wikibase-sdk/blob/master/docs/simplify_claims.md#keep-references) (boolean)
  * [`keepIds`](https://github.com/maxlath/wikibase-sdk/blob/master/docs/simplify_claims.md#keep-ids) (boolean)
  * [`keepHashes`](https://github.com/maxlath/wikibase-sdk/blob/master/docs/simplify_claims.md#keep-hashes) (boolean)
  * [`keepNonTruthy`](https://github.com/maxlath/wikibase-sdk/blob/master/docs/simplify_claims.md#keep-non-truthy-statements) (boolean)
* sitelinks simplification options:
  * [`addUrl`](https://github.com/maxlath/wikibase-sdk/blob/master/docs/simplify_entities_data.md#add-sitelinks-urls)  (boolean)

## Other options
```
-h, --help                     output usage information
-p, --progress                 enable the progress bar
-q, --quiet                    disable the progress bar
-V, --version                  output the version number
```

## Tips
* [examples](https://github.com/maxlath/wikidata-sdk/blob/master/docs/examples.md)
* [parallelize](https://github.com/maxlath/wikidata-sdk/blob/master/docs/Parallelize.md)
