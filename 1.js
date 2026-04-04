(function() {
    // التحقق من البراميتر - تأكد أنك تكتبه في المتصفح بدقة
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("fb_source")) {
        console.log("No Parameter Found");
        return; 
    }

    console.log("Parameter Found - Initializing...");

    function launchPop() {
        if (window._is_running) return;
        window._is_running = true;

        /* كود Adsterra الرسمي الخاص بك */
        (function(){
            var x=window, m="e23f9a20a32bcb0e16cc092ebc328951",
            z=[["siteId",260-829*134*841-342+97961243],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],
            s=["d3d3LmludGVsbGlwb3B1cC5jb20vVGxjL3hmbG93dHlwZS5taW4uanM=","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvTnZGL1BNL2diYXRtYW4ubWluLmNzcw=="],
            c=-1, o, w, d=function(){
                clearTimeout(w); c++;
                if(s[c]&&!(1801238139000<(new Date).getTime()&&1<c)){
                    o=x.document.createElement("script");
                    o.type="text/javascript"; o.async=!0;
                    var r=x.document.getElementsByTagName("script")[0];
                    o.src="https://"+atob(s[c]);
                    o.crossOrigin="anonymous"; o.onerror=d;
                    o.onload=function(){ clearTimeout(w); };
                    w=setTimeout(d,5E3);
                    r.parentNode.insertBefore(o,r);
                }
            };
            if(!x[m]){ try{Object.freeze(x[m]=z)}catch(e){} d(); }
        })();
    }

    // تفعيل فوري عند أي حركة (أكثر حساسية)
    const events = ['touchstart', 'scroll', 'mousedown', 'keydown'];
    events.forEach(event => {
        window.addEventListener(event, function() {
            launchPop();
        }, { once: true, passive: true });
    });

})();
