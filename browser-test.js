try {
  console.log('before calling assert')
  assert('true')
  console.log('called assert')
  assert(false)
  console.log('called with false')
} catch (e) {
  console.error(e.stack)
}
