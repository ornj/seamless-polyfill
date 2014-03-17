(function (win, doc) {

    /**
     * Add and remove domains to prevent untrusted windows from executing code.
     */
    var allowed_domains = ['http://localhost', 'http://127.0.0.1'],

    /**
     * By default, the targetOrigin of window.postMessage is * meaning all
     * domains. In some cases you will want to restrict this to help prevent
     * XSS and other unscrupulus uses.
     */
    target_domain = '*',

    extra_space = 60,

    iframes = doc.querySelectorAll('iframe[seamless]'),
    iframes_count = iframes.length,
    domain_count = allowed_domains.length,
    frame,


    checkDomain = function(origin) {
        var i = 0;
        for ( ; i < domain_count; i++) {
            if (allowed_domains[i] === origin) {
                return true;
            }
        }
        return false;
    },


    getTarget = function(frame) {
        return (frame.contentWindow || frame.contentDocument);
    },


    setFrameHeight = function(e) {

        if (!checkDomain(e.origin)) {
            return;
        }

        var data = JSON.parse(e.data), i;

        if (data.height && data.href) {
            for (i = 0; i < iframes_count; i++) {
                frame = iframes[i];
                if (getTarget(frame).location.href === data.href) {
                    frame.style.height = (parseInt(data.height, 10) || 0 ) +
                        extra_space + 'px';
                    frame = null;
                    return;
                }
            }
        }
    };


    for (i = 0; i < iframes_count; i++) {
        frame = iframes[i];
        getTarget(frame).postMessage(JSON.stringify({
            request: 'height'
        }), target_domain);
    }
    frame = null;


    window.addEventListener('message', function(e) {
        setFrameHeight(e);
    });

})(window, document);

