(function(){

/**
 * Module dependencies.
 */

function getRawStacktrace() {
  var orig = Error.prepareStackTrace //NORMALLY UNDEFINED!

  //this is absolutely necessary, otherwise the stack is a regular string and lines 3,4,5 of assert will fail
  Error.prepareStackTrace = function(_, stack){ return stack }
  var err = new Error() //****
  Error.captureStackTrace(err, arguments.callee)
  var stack = err.stack

  //make sure we don't globally modify anything,
  //which could possibly affect other javascript:
  if (orig) {
    Error.prepareStackTrace = orig
  } else {
    delete Error.prepareStackTrace
  }

  return stack
}

function AssertionError(options) {
  //copied and modified from https://github.com/nodejs/node/blob/master/lib/assert.js#L44
  this.name = 'AssertionError'
  this.message = options.message
  Error.captureStackTrace(this, options.stackStartFunction)
}

function assert(expr) {
  if (expr) return
  var stack = getRawStacktrace()
  var call = stack[1]
  var lineno = call.getLineNumber()

  fetch(call.getFileName()).then(function(response) {
    response.text().then(function(src) {
      var line = src.split('\n')[lineno-1]
      console.warn('error line: "'+line+'"')
      var message = line.match(/assert\((.*)\)/)[1]
      console.log('message:', message)
      //could throw "Error.captureStackTrace is not a function".
      throw new AssertionError({
        message: message,
        stackStartFunction: stack[0].getFunction()
      })
    })
  }).catch(function(error){
    if (error.name === 'AssertionError') {
      throw error
    }
  })
}

/**
 * Expose `assert`.
 */

window.assert = window.NO_ASSERT ? function(){} : assert

})();
