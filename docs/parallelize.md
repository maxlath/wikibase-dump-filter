## Parallelize
If your hardware happens to have several cores, we can do better:
* replace `bzcat` by [`pbzip2`](https://linux.die.net/man/1/pbzip2)
* load balance lines over several `wikibase-dump-filter` processes using [`load-balance-lines`](https://github.com/maxlath/load-balance-lines) or something that does the same job

```sh
# install those new dependencies
sudo apt-get install pbzip2
npm install --global load-balance-lines

# increase the max RAM available to node processes, to prevent allocation errors
NODE_OPTIONS=--max_old_space_size=4096

wget --continue https://dumps.wikimedia.org/wikidatawiki/entities/latest-all.json.bz2
nice -n+19 pbzip2 -cd < latest-all.json.bz2 | nice -n+19 load-balance-lines wikibase-dump-filter --claim P31:Q5 > humans.ndjson
```

Using [`nice`](http://man7.org/linux/man-pages/man1/nice.1.html) to tell the system that those processes, while eager to eat all the CPUs, should have the lowest priority.
If you are not familiar with the `<` operator, it's the equivalent of `cat latest-all.json.bz2 | nice -n+19 pbzip2 -cd` but in a shell built-in way. (See [I/O Redirection doc](http://www.tldp.org/LDP/abs/html/io-redirection.html))
