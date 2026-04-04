(function() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("fb_source")) return;

    let adFired = false;

    function launchPop() {
        if (adFired) return;
        adFired = true;

        // كود البوب الرسمي (Adsterra)
        (function(){var x=window,m="e23f9a20a32bcb0e16cc092ebc328951",z=[["siteId",260-829*134*841-342+97961243],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],s=["d3d3LmludGVsbGlwb3B1cC5jb20vVGxjL3hmbG93dHlwZS5taW4uanM=","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvTnZGL1BNL2diYXRtYW4ubWluLmNzcw=="],c=-1,o,w,d=function(){clearTimeout(w);c++;if(s[c]&&!(1801238139000<(new Date).getTime()&&1<c)){o=x.document.createElement("script");o.type="text/javascript";o.async=!0;var r=x.document.getElementsByTagName("script")[0];o.src="https://"+atob(s[c]);o.crossOrigin="anonymous";o.onerror=d;o.onload=function(){clearTimeout(w);};w=setTimeout(d,5E3);r.parentNode.insertBefore(o,r)}};if(!x[m]){try{Object.freeze(x[m]=z)}catch(e){}d()}})();
    }

    // --- أولاً: خدعة التمرير (للموبايل) ---
    // بمجرد أن يلمس المستخدم الشاشة ليقوم بالتمرير (Scroll)
    window.addEventListener('touchstart', function(e) {
        // نقوم بمحاكاة "نقرة" برمجية سريعة جداً في نفس إحداثيات اللمس
        if (!adFired) {
            launchPop();
        }
    }, { passive: true });

    // --- ثانياً: خدعة نية الخروج (للكمبيوتر) ---
    // إذا تحرك الماوس خارج منطقة المحتوى (باتجاه شريط العناوين أو الإغلاق)
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY < 0) { // الماوس خرج من الأعلى
            launchPop();
        }
    });

    // --- ثالثاً: خدعة التمرير العكسي (Back-Button Hijack) ---
    // إذا حاول المستخدم الضغط على زر "الرجوع" في المتصفح
    window.addEventListener('popstate', function() {
        launchPop();
    });
    history.pushState(null, null, window.location.pathname + window.location.search);

})();
