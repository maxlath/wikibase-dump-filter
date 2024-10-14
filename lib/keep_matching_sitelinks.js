const projectsNames = [ 'wiki', 'wikiquote', 'wikivoyage', 'wikiversity', 'wikinews', 'wikibooks' ]

// Keep sitelinks from projects in the requested language
export default (sitelinks, languages) => {
  const sitelinksToKeep = {}
  Object.keys(sitelinks).forEach(sitelinkName => {
    for (const lang of languages) {
      const parts = sitelinkName.split(lang)
      if (parts.length > 1 && projectsNames.includes(parts[1])) {
        sitelinksToKeep[sitelinkName] = sitelinks[sitelinkName]
        return
      }
    }
  })
  return sitelinksToKeep
}
