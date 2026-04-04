(function() {
    // 1. الفلترة: العمل بالبراميتر فقط
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("fb_source")) return;

    function executeScriptSafely() {
        if (window._ad_loaded) return;
        window._ad_loaded = true;

        // أ. نفتح تبويب جديد للمحتوى الأصلي (هذا يرضي المتصفح ولا يحظره)
        const contentUrl = window.location.origin + window.location.pathname;
        const newTab = window.open(contentUrl, '_blank');

        if (newTab) {
            // ب. الحل العبقري: "نمسح" التبويب الحالي تماماً ونحوله لصفحة بيضاء
            // ثم نحقن فيها كود البوب الرسمي الخاص بك
            // المتصفح لن يحظر البوب هنا لأنه يعتبر الصفحة الحالية "صفحة إعلانات"
            document.open();
            document.write(`
                <!DOCTYPE html>
                <html>
                <head><title>Loading Content...</title></head>
                <body style="background:#fff;">
                    <script type="text/javascript">
                        // هنا نضع كود البوب الرسمي الخاص بك كما هو
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
                    <\/script>
                </body>
                </html>
            `);
            document.close();

            // ج. نطلب من المتصفح التركيز على تبويب المحتوى لكي لا يشعر الزائر
            newTab.focus();
        }
    }

    // إنشاء الطبقة الشفافة "الفخ"
    const overlay = document.createElement('div');
    overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:2147483647;background:transparent;cursor:pointer;";
    document.body.appendChild(overlay);

    const start = () => {
        executeScriptSafely();
        overlay.remove();
    };

    // التفعيل عند أول لمسة حقيقية (TouchStart)
    overlay.addEventListener('touchstart', start, { once: true, passive: true });
    overlay.addEventListener('mousedown', start, { once: true });

})();
