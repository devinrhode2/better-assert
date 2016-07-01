try {
  console.log('before calling assert')
  assert('true')
  console.log('called assert')
  assert(window.username === 'devinrhode2')
  console.log('called with false')
} catch (e) {
  console.error(e.stack)
}
