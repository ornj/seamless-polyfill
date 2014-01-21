# Seamless Polyfill

This is an experimental polyfill for the [iframe seamless attribute](http://www.w3.org/TR/2011/WD-html5-20110525/the-iframe-element.html#attr-iframe-seamless, 'W3C iframe')
which does not currently have much support amongst stable browsers. In order to
give us a similar effect, this polyfill will use the `window.postMessage` method
to send information about the iframe's scrollHeight so it can be used by the
parent to adjust the height of the iframe.


## Usage

Place `seamless-parent.js` or `seamless-parent.min.js` on the page that contains
iframes. Place `seamless-iframe.js` or `seamless-iframe.min.js` on any pages
that will be loaded within an iframe.

Any iframes on the parent page with the `seamless` attribute set will be effected.
`seamless` is a boolean attribute so it does not require a value. Simply set it as:

```html
<iframe src="..." frameborder="0" seamless>
```

## Notes

* As stated above, this is experimental code. I have not used this in a live production environment and it has not gone through any code reviews.
* I am not providing minified scripts because you really should modify the allowed origins to prevent this method from being accessed by other windows.
* This implementation hasn't been tested on Internet Explorer. I will do this when I have more time available. You should give your iframes a sensible height to start with.
