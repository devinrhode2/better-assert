(function(){

if (!Error.prepareStackTrace) {
  throw new Error('Error.prepareStackTrace is undefined, better-assert-browser only works in browsers supporting this function.')
  alert('Error.prepareStackTrace is undefined, better-assert-browser only works in browsers supporting this function.')
}

/**
 * Module dependencies.
 */

//copied and modified from https://github.com/nodejs/node/blob/master/lib/assert.js#L44
function AssertionError(options) {
  this.name = 'AssertionError'
  this.actual = options.actual
  this.expected = options.expected
  this.operator = options.operator
  this.message = options.message
  Error.captureStackTrace(this, options.stackStartFunction || fail)
}
function callsite() {
  var orig = Error.prepareStackTrace
  Error.prepareStackTrace = function(_, stack){ return stack }
  var err = new Error
  Error.captureStackTrace(err, arguments.callee)
  var stack = err.stack
  Error.prepareStackTrace = orig //make sure we don't globally modify anything,
  //which could possibly affect other javascript
  return stack
}

/**
 * Assert the given `expr`.
 */

function assert(expr) {
  if (expr) return

  var stack = callsite()
  var call = stack[1]
  var file = call.getFileName()
  var lineno = call.getLineNumber()
  var src = fs.readFileSync(file, 'utf8')
  var line = src.split('\n')[lineno-1]
  var src = line.match(/assert\((.*)\)/)[1]

  throw new AssertionError({
    message: src,
    stackStartFunction: stack[0].getFunction()
  })
}

/**
 * Expose `assert`.
 */

window.assert = window.NO_ASSERT ? function(){} : assert

})();
