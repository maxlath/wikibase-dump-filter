## Prefilter

Filtering a full dump takes a lot of time, and one of the reasons for that is that `wikibase-dump-filter` takes every line of the dump, and passes it through `JSON.parse` to be then able to make tests on it as a JS object. While there could be [ways to parse JSON objects faster](https://arxiv.org/abs/1902.08318), the biggest gains come from NOT parsing it in the first place, which can be done by pre-filtering the lines based on what you know of the entities you are looking for.

The following documentation might look like a `grep` tutorial. Because it's one ;)
This prefiltering step could theoretically be integrated directly in to `wikibase-dump-filter`, but that would mean more code for something other tools do already very well, and with potentially better performance that what we could achieve in NodeJS.

### Basic prefilter

For instance, if you are looking for all the instances of paintings in the dump (`P31:Q5`), instead of directly running
```sh
cat entities.json | wikibase-dump-filter --claim P31:Q5 > humans.ndjson
```
you could prefilter the dump, based on the knowledge that any of the lines for entities that have a `P31:Q5` claim, need to contain the string `"Q5"`:
```sh
cat entities.json | grep '"Q5"' | wikibase-dump-filter --claim P31:Q5 > humans.ndjson
```

### Property+entity prefilter

With such a prefilter, `wikibase-dump-filter` just have to deal with case that need deeper data analysis: in the previous example, that would mean just having to filter-out entities that either are THE `Q5`, or link to it in non-`P31` claims, in qualifiers, or in references, or even that have `"Q5"` in a label, description, alias, string claim, etc.

Given the gains, **it is very much recommended to prefilter**, but in some complex filter cases it might get tricky, so here are some more examples.

In the previous `P31:Q5` example, we didn't make use of the property id, as `P31` is present on so many entities that it wouldn't have contributed much; but with other properties, that becomes possible. For instance, if we have a `--claim P106:Q36180` filter, a prefilter could be:
```sh
cat entities.json | grep '"P106".*"Q36180"' | wikibase-dump-filter --claim P106:Q36180 > writers.ndjson
```

### AND prefilter
```sh
# NB: using a single pattern is impossible here, as you don't know in which order the researched strings will appear
cat entities.json | grep '"Q571"' | grep '"P50"' | wikibase-dump-filter --claim 'P31:Q571&P50' > books_with_an_author.ndjson
```

### OR prefilter
```sh
# NB: `grep` needs the `-E, --extended-regexp` option to be able to this kind of OR filters
cat entities.json | grep -E '("Q146"|"Q144")' | wikibase-dump-filter --claim 'P31:Q146|P31:Q144' > cats_and_dogs.ndjson
```

### NOT prefilter
In the case of the NOT filter (`~`), there is nothing more we can do to prefilter, as using something like `grep -v "P50"'` (filter-out lines that match `"P50"`) would generate false negatives.
```sh
cat entities.json | grep '"Q571"' | wikibase-dump-filter --claim 'P31:Q571&~P50' > books_without_author.ndjson
```
