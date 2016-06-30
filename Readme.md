
# better-assert-browser

  Better c-style assertions using [callsite](https://github.com/visionmedia/callsite) for
  self-documenting failure messages __**IN THE BROWSER**__.

## Installation

    $ npm install better-assert-browser

## Example

 By default assertions are enabled, however setting __window.NO_ASSERT__ to true will deactivate them.

```js
var assert = require('better-assert');

test();

function test() {
  var user = { name: 'apples' };
  assert('apples' == user.name);
  assert('number' == typeof user.age);
}

AssertionError: 'number' == typeof user.age
    at test (/Users/tj/projects/better-assert/example.js:9:3)
    at Object.<anonymous> (/Users/tj/projects/better-assert/example.js:4:1)
    at Module._compile (module.js:449:26)
    at Object.Module._extensions..js (module.js:467:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Module.runMain (module.js:492:10)
    at process.startup.processNextTick.process._tickCallback (node.js:244:9)
```

## Browser (Chrome only?) usage (alpha status)

There's a library used here that uses what I believe is a v8/chrome specific api for interacting with function callsite's and maybe extending the stack trace limit past 10 or something.

### __\#TLDR:__
```
hub clone devinrhode2/better-assert # brew install hub if u kno foo
cd better-assert
npm install -g watchify browserify live-server
watchify browser-test.js -o browserified-browser-test.js
```
In another tab run just:`live-server`

Then check chrome

## MIT License
