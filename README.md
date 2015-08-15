#Seamless Polyfill

A Javascript polyfill for the HTML5 iframe's seamless attribute.

This is a polyfill for the [iframe seamless attribute](http://www.w3.org/TR/2011/WD-html5-20110525/the-iframe-element.html#attr-iframe-seamless, 'W3C iframe')
which does not currently have much support amongst stable browsers. In order to
give us a similar effect, this polyfill will use the `window.postMessage` method
to send information about the iframe's `scrollHeight` so it can be used by the
parent to adjust the height of the iframe.


## Usage

Seamless is compatible with AMD and CommonJS module loaders. You can also just
include `seamless.js` manually to create a global `seamless` object.


You can install this package using bower or npm.

```
bower install seamless-polyfill
```

or

```
npm install seamless-polyfill
```

On any page that will be loaded in a frame, call `seamless.frame`.

```js
seamless.frame({
    'allowed_domains': ['http://localhost:5000'],
    'target_origin': '*'
});
```

On any page that contains frames, call `seamless.parent`.

```js
seamless.parent({
    'allowed_domains': ['http://localhost:5000'],
    'target_origin': '*'
});
```

Any iframes on the parent page with the `seamless` attribute set will be effected.
`seamless` is a boolean attribute so it does not require a value. Simply set it as:

```html
<iframe src="..." frameborder="0" seamless>
```

## Arguments

* _allowed_domains_: Domain whitelist used for `window.postMessage`. If the domains of the frame and parent are not included, one or both will not respond to messages.
* _target_origin_: targetOrigin value used for window.postMessage. Defaults to `*`.
