;(function(win, doc) {

    "use strict";

    /**
     * Work around for lack of seamless support in pretty much every browser.
     */


    /**
     * List of domains that are allowed to read data in postMessage.
     */
    var allowed_domains = ['*'];


    /**
     * Will be used to store length of allowed_domains so it doesn't need to be
     * checked every time allowed_domains is looped over.
     */
     var allowed_domains_length = allowed_domains.length;


    /**
     * By default, the targetOrigin of window.postMessage is * meaning all
     * domains. In some cases you will want to restrict this to help prevent
     * XSS and other unscrupulus uses.
     */
    var target_origin = '*';


    /**
     * Will contain mapping of frame src => element
     */
    var frames = {};

    /**
     * Stores passed options (keyword arguments) to local variables.
     */
    var setOptions = function(options) {
        if (options.allowed_domains) {
            allowed_domains = options.allowed_domains;
            allowed_domains_length = allowed_domains.length;
        }
        if (options.target_origin) {
            target_origin = options.target_origin;
        }
    };


    /**
     * Convenience function to determine if the origin is in the list of
     * allowed domains.
     */
    var checkDomain = function(origin) {
        var i;
        for (i = 0; i < allowed_domains_length; i++) {
            if (allowed_domains[i] === origin) {
                return true;
            }
        }
        return false;
    };


    /**
     * Send message containing the height of the document to the parent frame.
     */
    var sendHeight = function() {
        win.parent.postMessage(JSON.stringify({
            height: doc.body.scrollHeight,
            href: win.location.href
        }), target_origin);
    };


    /**
     * Listener to respond to postMessage containing a request for information
     * about a frame document's height.
     */
    var heightListener = function(evt) {
        if (!checkDomain(evt.origin)) {
            return;
        }
        var data = JSON.parse(evt.data);
        if (data.request && data.request === 'height') {
            sendHeight();
        }
    };


    var setFrameHeight = function(evt) {
        if (!checkDomain(evt.origin)) {
            return;
        }
        var data = JSON.parse(evt.data), frame;
        if (data.height && data.href) {
            frame = frames[data.href];
            if (frame) {
                frame.style.height = parseInt(data.height, 10 || 0) + 'px';
            }
        }
    };


    /**
     * Function to call to enable an framed page to communicate it's height to
     * it's parent frame.
     *
     * options arguments:
     *     - allowed_domains: list of domains from which to accept messages
     *     - target_origin: targetOrigin value for window.postMessage
     */
    var frame = function(options) {
        setOptions(options);
        win.onmessage = heightListener;
        win.onload = sendHeight;
    };


    /**
     * Function to call to enable parent frame to respond check child frame
     * heights.
     *
     * option arguments:
     *     - allowed_domains: list of domains from which to accept messages
     *     - target_origin: targetOrigin value for window.postMessage
     */
    var parent = function(options) {
        setOptions(options);
        var elements = doc.querySelectorAll('iframe[seamless]'),
            len = elements.length, i;
        for (i = 0; i < len; i++) {
            frames[elements[i].src] = elements[i];
        }
        window.addEventListener('message', setFrameHeight);
    };


    var seamless = {'frame': frame, 'parent': parent};


    if (typeof define === 'function' && define.amd) {
        define([], function () { return seamless; });
    } else if (typeof module !== 'undefined' && module !== null) {
        module.exports = seamless;
    } else {
        window.seamless = seamless;
    }


})(window, document);
