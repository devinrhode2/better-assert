
# better-assert-browser

  Better c-style assertions using for self-documenting
  failure messages __**IN THE BROWSER**__.

## Installation

    npm install devinrhode2/better-assert-browser --save-dev

## Example

 By default assertions are enabled, however setting __window.NO_ASSERT__ to true will deactivate them.

```js
try {
  console.log('before calling assert')
  assert('truthy')
  console.log('called assert')
  assert(window.someFoo === 'bar')
  console.log('called with false')
} catch (e) {
  console.error('assert() failed:'+e.stack)
}
```

This library/function is dependent upon the v8/chrome stacktrace api.

To get stacktraces for failed assertions, you need to check "Async" in the
right sidebar of the chrome devtools sources pane

This is because this function makes a request for the javascript file at the file url
indicated in the stack trace using window.fetch, which returns a promise, inside this we
throw an assertion error with the code asserted.

This library won't work unless your server responds to requests for individual files.

### Contributing
```
hub clone devinrhode2/better-assert # brew install hub if u kno foo
cd better-assert
npm install -g live-server
live-server
```
Open up http://127.0.0.1:8080/browser-test.html

You should then be able to open better-assert-browser.js and browser-test.js in chrome devtools sources pane, hit esc to show the console, and livedit

## MIT License, see LICENSE file
