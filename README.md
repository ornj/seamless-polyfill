#Seamless Polyfill

An experimental Javascript polyfill for the HTML5 iframe's seamless attribute.

This is an experimental polyfill for the [iframe seamless attribute](http://www.w3.org/TR/2011/WD-html5-20110525/the-iframe-element.html#attr-iframe-seamless, 'W3C iframe')
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
    'target_domain': '*'
});
```

On any page that contains frames, call `seamless.parent`.

```js
seamless.parent({
    'allowed_domains': ['http://localhost:5000'],
    'target_domain': '*'
});
```

Any iframes on the parent page with the `seamless` attribute set will be effected.
`seamless` is a boolean attribute so it does not require a value. Simply set it as:

```html
<iframe src="..." frameborder="0" seamless>
```

## Arguments

* _allowed_domains_: Domain whitelist used for `window.postMessage`. If the domains of the frame and parent are not included, one or both will not respond to messages.
* _target_domain_: targetOrigin value used for window.postMessage. Defaults to `*`.

## Notes

* As stated above, this is experimental code. I have not used this in a live production environment and it has not gone through any code reviews.
* I am not providing minified scripts because you really should modify the allowed origins to prevent this method from being accessed by other windows.
* This implementation hasn't been tested on Internet Explorer. I will do this when I have more time available. You should give your iframes a sensible height to start with. Testing is a big "todo".
