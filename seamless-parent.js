(function (win, doc) {


    /**
     * By default, the targetOrigin of window.postMessage is * meaning all
     * domains. In some cases you will want to restrict this to help prevent
     * XSS and other unscrupulus uses.
     */
    var allowed_domain = '*',

        extra_space = 60,

        iframes = doc.getElementsByTagName('iframe'),
        iframes_count = iframes.length,
        frame, i,


        getTarget = function(frame) {
            return (frame.contentWindow || frame.contentDocument);
        },


        setFrameHeight = function(e) {
            if (e.data.hasOwnProperty('height') && e.data.hasOwnProperty('href')) {
                for (i = 0; i < iframes_count; i++) {
                    frame = iframes[i];
                    if (getTarget(frame).location.href === e.data.href) {
                        frame.style.height = (parseInt(e.data.height, 10) || 0 ) + extra_space + 'px';
                        frame = null;
                        return;
                    }
                }
            }
        };


        for (i = 0; i < iframes_count; i++) {
            frame = iframes[i];
            if (frame.getAttribute('seamless') !== null) {
                getTarget(frame).postMessage({
                    request: 'height'
                }, allowed_domain);
            }
        }
        frame = null;


        window.addEventListener('message', function(e) {
            setFrameHeight(e);
        });

})(window, document);

