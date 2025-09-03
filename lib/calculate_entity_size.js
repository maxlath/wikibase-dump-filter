export default entity => {
  return Buffer.byteLength(JSON.stringify(entity), 'utf8')
}
