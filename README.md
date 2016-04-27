# Wikidata filter

Filter a line-delimited json of Wikidata entities (typically a [dump](https://www.wikidata.org/wiki/Wikidata:Database_download#JSON_dumps_.28recommended.29)) into a subset of entities sharing the specified claim.

## Filter entities by [claim](https://www.wikidata.org/wiki/Wikidata:Glossary/en#Claims_and_statements)

* **from a local file**
```sh
cat entities.json |wikidata-filter --claim P31:Q5 > humans.ndjson
```
this command filters `entities_dump.json` into a subset where all lines are the json with an entity having [Q5](https://wikidata.org/entity/Q5) in it's [P31](https://wikidata.org/wiki/Property:P31) claims

(where ndjson stands for newline-delimited json)

* **directly from a Wikidata dump**
```sh
curl https://dumps.wikimedia.org/wikidatawiki/entities/latest-all.json.gz |gzip -d |wikidata-filter --claim P31:Q5 > humans.ndjson
```
this can be quite convinient when you don't have enough space to keep the whole decompressed dump on your disk: here you only write the desired subset.

Of course, **this probably only make sense if the kind of entities you are looking for is somewhere above 100 000 units(?)**, given that under this level, it would probably be faster/more efficient to get the list of ids from [Wikidata Query](http://query.wikidata.org/), then [get the entities data from the API](https://www.wikidata.org/w/api.php?action=help&modules=wbgetentities) ([wikidata-sdk](https://github.com/maxlath/wikidata-sdk#get-entities-by-id) can be helpful there).

## Filter entities attributes

Wikidata entities have the following attributes: `id`, `type`, `labels`, `descriptions`, `aliases`, `claims`, `sitelinks`.
All in all, this whole takes a lot of place and might not be needed in your use case: for instance, if your goal is to do [full text search on a subset of Wikidata](http://github.com/inventaire/inv-elasticsearch), you just need to keep the labels, aliases and descriptions, and you can omit the claims and sitelinks that do take a lot of space.

This can be done with either the `--keep` or the `--omit` command:
```sh
cat entities.json |wikidata-filter --claim P31:Q5 --omit claims,sitelinks > humans.ndjson
# which is equivalent to
cat entities.json |wikidata-filter --claim P31:Q5 --keep id,type,labels,descriptions,aliases > humans.ndjson
```

## Options

```
  Usage: wikidata-filter [options]

  Options:

    -h, --help               output usage information

    -V, --version            output the version number

    -c, --claim <claim>      Specify the claim the entity should have to pass the filter.
                             Example: to keep only entities of humans: `wikidata-filter -c P31:Q5`

    -o, --omit <attributes>  Specify the entities attributes to omit among wikidata entities attributes:
                             type, labels, descriptions, aliases, claims, sitelinks.
                             Example: to keep only labels and descriptions: `wikidata-filter -o aliases,claims,sitelink`

    -k, --keep <attributes>  The inverse of omit: specify the attributes to keep.
                             Example: to keep only labels and descriptions: `wikidata-filter -k labels,descriptions`

```
