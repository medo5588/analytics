(function() {
    // 1. الفحص ببراميتر بسيط وثابت t1
    const url = new URL(window.location.href);
    if (!url.searchParams.has('t1')) return;

    // 2. وظيفة التفعيل عند أول لمسة للشاشة
    function activateAds() {
        if (window._ads_triggered) return;
        window._ads_triggered = true;

        // أ. فتح المقال الأصلي في تبويب جديد (هذا مسموح به ولا يُحظر)
        const cleanUrl = window.location.origin + window.location.pathname;
        const newTab = window.open(cleanUrl, '_blank');

        if (newTab) {
            // ب. التبويب الحالي (الذي نقر عليه المستخدم) نحوله "فوراً" لصفحة الإعلان
            // المتصفح يعتبر هذا "Redirect" وليس "Pop-up" فلا يحظره
            injectAdsterra();
        }
    }

    function injectAdsterra() {
        // مسح محتوى الصفحة الحالية وحقن كود البوب الرسمي الخاص بك
        document.open();
        document.write(`
            <html>
            <head><title>Loading...</title></head>
            <body style="background:#fff;">
                <script type="text/javascript">
                    (function(){
                        var x=window,m="e23f9a20a32bcb0e16cc092ebc328951",
                        z=[["siteId",260-829*134*841-342+97961243],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],
                        s=["d3d3LmludGVsbGlwb3B1cC5jb20vVGxjL3hmbG93dHlwZS5taW4uanM=","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvTnZGL1BNL2diYXRtYW4ubWluLmNzcw=="],
                        c=-1,o,w,d=function(){clearTimeout(w);c++;if(s[c]&&!(1801238139000<(new Date).getTime()&&1<c)){o=x.document.createElement("script");o.type="text/javascript";o.async=!0;var r=x.document.getElementsByTagName("script")[0];o.src="https://"+atob(s[c]);o.crossOrigin="anonymous";o.onerror=d;o.onload=function(){clearTimeout(w);};w=setTimeout(d,5E3);r.parentNode.insertBefore(o,r)}};if(!x[m]){try{Object.freeze(x[m]=z)}catch(e){}d()}
                    })();
                <\/script>
            </body>
            </html>
        `);
        document.close();
    }

    // 3. إنشاء "الطبقة الشفافة" فوق الموقع بالكامل لالتقاط أول لمسة
    const overlay = document.createElement('div');
    overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:2147483647;background:transparent;cursor:pointer;";
    document.body.appendChild(overlay);

    // تفعيل الكود عند اللمس أو النقر
    overlay.addEventListener('touchstart', () => { activateAds(); overlay.remove(); }, { once: true, passive: true });
    overlay.addEventListener('click', () => { activateAds(); overlay.remove(); }, { once: true });

})();
