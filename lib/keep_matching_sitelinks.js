// Keep sitelinks from projects in the requested language
module.exports = (sitelinks, languages) => {
  const sitelinksToKeep = {}
  Object.keys(sitelinks).forEach(sitelinkName => {
    for (let lang of languages) {
      if (sitelinkName.startsWith(lang)) {
        sitelinksToKeep[sitelinkName] = sitelinks[sitelinkName]
        return
      }
    }
  })
  return sitelinksToKeep
}
