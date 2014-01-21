(function(win, doc) {

    /**
     * Work around for lack of seamless support in pretty much every browser.
     *
     * This function sends the height of the document to the parent. This is so
     * those pages can set the iframe to an appropriate height.
     *
     * You may wish to change the value of allowed_domain to the one you are
     * targeting. By default the targetOrigin is '*' meaning all domains.
     */
    var allowed_domain = '*',
        sendHeight = function() {
            win.parent.postMessage({
                height: doc.body.scrollHeight,
                href: win.location.href
            }, allowed_domain);
        };


    /**
     * This will listen for a message from support.iframe asking this script to
     * report the document height.
     */
    win.onmessage = function(e) {
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