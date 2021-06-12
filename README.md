# is-cross-origin

a simple API for telling whether a window is cross origin or same origin

### install

`yarn add is-cross-origin` / `npm install is-cross-origin`

### usage

the API should be provided with one/two arguments, both windows. 
the first is a destination window to test its origin in relation to a source window, and the second is that source window.
second argument is optional, and will be set to current window in case not provided.

```javascript
const isCrossOrigin = require('is-cross-origin');
const result = isCrossOrigin(dstWindow, srcWindow);
if (result) {
    console.log('destination window ', dstWindow, ' is in a cross origin in relation to source window ', srcWindow);
} else {
    console.log('destination window ', dstWindow, ' is in the same origin as the source window ', srcWindow);
}
```

so for example, in order to tell whether a certain iframe is in a cross origin in relation to the current window, this should do the trick:

```html
<html>
    <head></head>
    <body>
        <iframe id="a" src="/"></iframe>
        <iframe id="b" src="//cross-origin.com"></iframe>
        <script>
            window.onload = function() {
                const aIsCrossOrigin = isCrossOrigin(a.contentWindow /*, window*/);
                const bIsCrossOrigin = isCrossOrigin(b.contentWindow /*, window*/);
                console.log('is "a" cross origin? ' + aIsCrossOrigin); // false
                console.log('is "b" cross origin? ' + bIsCrossOrigin); // true
            }
        </script>
    </body>
</html>
```

#### usage update

now a third argument can be passed that will be the `Object` constructor to use when telling whether provided arguments are of type windows or not (default will evaluate to `window.Object`:

```javascript
isCrossOrigin(dstWindow, srcWindow, window.Object /* optional */)
```


### important usage notes

* window should finish loading in order for this API to work. 
if the API is provided with a window that did not finish loading, it will return `false` regardless of whether the iframe is cross origin or not.
to avoid that, call the API with windows that finished loading by using `onload` event handler or something similar.

### compatibility

[compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf#browser_compatibility)
