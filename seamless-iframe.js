(function(win, doc) {

    /**
     * Work around for lack of seamless support in pretty much every browser.
     *
     * This function sends the height of the document to the parent. This is so
     * those pages can set the iframe to an appropriate height.
     */


    /**
     * Add and remove domains to prevent untrusted windows from executing code.
     */
    var allowed_domains = ['http://localhost', 'http://127.0.0.1'],

    domain_count = allowed_domains.length,

    /**
     * By default, the targetOrigin of window.postMessage is * meaning all
     * domains. In some cases you will want to restrict this to help prevent
     * XSS and other unscrupulus uses.
     */
    target_domain = '*',


    checkDomain = function(origin) {
        for (i = 0; i < domain_count; i++) {
            if (allowed_domains[i] === origin) {
                return true;
            }
        }
        return false;
    },


    sendHeight = function() {
        win.parent.postMessage({
            height: doc.body.scrollHeight,
            href: win.location.href
        }, target_domain);
    };


    /**
     * This will listen for a message from parent asking this script to
     * report the document height.
     */
    win.onmessage = function(e) {

        if (!checkDomain(e.origin)) {
            return;
        }

        if (e.data.hasOwnProperty('request') && e.data.request === 'height') {
            sendHeight();
            win.onmessage = null;
        }
    };


    /**
     * Fire off the height of the document in case the parent is already
     * listening for it. This would be the case if the parent was loaded first.
     */
    win.onload = function() {
        sendHeight();
    };

})(window, document);