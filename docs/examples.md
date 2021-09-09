## Examples

### Get all entities with a Chinese and a French Wikipedia article, keeping only id, labels, and sitelinks matching those languages

The [equivalent SPARQL query](https://query.wikidata.org/#SELECT%20%3Fs%20%3FsLabel%20WHERE%20%7B%0A%20%20%20%20%3Farticlea%20schema%3Aabout%20%3Fs%20.%0A%20%20%20%20%3Farticlea%20schema%3AisPartOf%20%3Chttps%3A%2F%2Fzh.wikipedia.org%2F%3E%20.%0A%20%20%20%20%3Farticleb%20schema%3Aabout%20%3Fs%20.%0A%20%20%20%20%3Farticleb%20schema%3AisPartOf%20%3Chttps%3A%2F%2Ffr.wikipedia.org%2F%3E%20.%0A%20%20%20%20%23%20The%20article%20shouldn%27t%20be%20a%20disambiguation%20page%0A%20%20%09FILTER%20NOT%20EXISTS%20%7B%20%3Fs%20wdt%3AP31%20wd%3AQ4167410.%20%7D%0A%7D%0ALIMIT%205) times out

```sh
DUMP='https://dumps.wikimedia.org/wikidatawiki/entities/latest-all.json.gz'
curl $DUMP | gzip -d | wikibase-dump-filter --sitelink 'zhwiki&frwiki' --keep id,labels,sitelinks --languages zh,fr --simplify > subset.ndjson
```
