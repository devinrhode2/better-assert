;(function browser_test_main() {
  ;(function main_basic() {
    try {
      console.log('calling assert...')
      assert(window.someFoo === 'bar')
      console.log('basic assert test passed (no synchronous exception)')
    } catch (e) {
      console.error('assert call failed:'+e.stack)
    }
  })()

  ;(function stacktrace_api_tests() {
    assert(Error.captureStackTrace != null)
    assert(function Error$captureStackTraceUndefinedTest(){
      var orig = Error.captureStackTrace
      Error.captureStackTrace = undefined
      try {
        assert('basic truthy value fails')
      } catch (error) {
        assert(error.stack.includes('Error.captureStackTrace'))
      }
      if (orig) {
        Error.captureStackTrace = orig
      } else {
        delete Error.captureStackTrace
      }
      return true;
    })
  })()

  console.log('If you see just "AssertionFailure: window.someFoo === \'bar\'" then the tests are passing')
})()