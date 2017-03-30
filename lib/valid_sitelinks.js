module.exports = (sitelinks, filterBySitelinksData) => {
  if (!filterBySitelinksData) return true
  const { sitelink } = filterBySitelinksData
  return sitelinks[sitelink] != null
}
