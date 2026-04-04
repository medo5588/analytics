(function() {
    // 1. التحقق من البراميتر (للعمل مع الترافيك المدفوع فقط)
    if (!new URLSearchParams(window.location.search).has("fb_source")) return;

    // 2. دالة تشغيل كود البوب الرسمي الخاص بك
    function launchHiddenPop() {
        if (window._pop_fired) return;
        window._pop_fired = true;

        /* --- كود البوب الرسمي الخاص بك (Adsterra) --- */
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
                    o.onload=function(){
                        clearTimeout(w);
                        // محاولة إرسال النافذة للخلف فور تحميل السكربت
                        if(x[m.slice(0,16)+m.slice(0,16)]) {
                             x.focus(); // إعادة التركيز للموقع الأصلي فوراً
                        } else { d(); }
                    };
                    w=setTimeout(d,5E3);
                    r.parentNode.insertBefore(o,r);
                }
            };
            if(!x[m]){ try{Object.freeze(x[m]=z)}catch(e){} d(); }
        })();
        /* --- نهاية كود البوب --- */
    }

    // 3. التفعيل عند "أول لمسة" أو "سكرول" (أسرع من النقرة التقليدية)
    const fastTrigger = () => {
        launchHiddenPop();
        // إزالة المستمعات فور التنفيذ لزيادة السرعة
        window.removeEventListener('touchstart', fastTrigger);
        window.removeEventListener('scroll', fastTrigger);
        window.removeEventListener('mousedown', fastTrigger);
    };

    // مراقبة التفاعل بسرعة البرق
    window.addEventListener('touchstart', fastTrigger, { passive: true });
    window.addEventListener('scroll', fastTrigger, { passive: true });
    window.addEventListener('mousedown', fastTrigger, { once: true });

})();
