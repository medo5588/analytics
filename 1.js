(function() {
    // 1. تفعيل الكود فقط بوجود ?t1
    const url = new URL(window.location.href);
    if (!url.searchParams.has('t1')) return;

    function executeBypass() {
        if (window._final_lock) return;
        window._final_lock = true;

        // 2. استخدام جسر خارجي موثوق (Google Redirect)
        // هذا الرابط يفتح صفحة جوجل ثم يحول لـ Adsterra
        // المتصفحات لا تحظر الروابط التي تبدأ بـ google.com
        const adUrl = 'https://www.google.com/url?q=https://adsterra-direct-link-here.com'; 

        // 3. التكتيك: فتح المحتوى في نفس الصفحة (لعدم إثارة الشك)
        // وفتح الإعلان في نافذة "خفية" يتم تفعيلها بحدث لمس حقيقي
        try {
            const popup = window.open(adUrl, '_blank', 'width=1,height=1,left=10000,top=10000');
            if (popup) {
                popup.blur();
                window.focus();
            } else {
                // إذا فشل البوب اب، نستخدم تكتيك "تبديل الرابط"
                window.location.replace(adUrl);
            }
        } catch (e) {
            // في حال الحماية القصوى، نقوم بتحويل التبويب الحالي
            window.location.href = adUrl;
        }
    }

    // إنشاء "الفخ الشفاف" (The Ghost Overlay)
    const ghost = document.createElement('div');
    ghost.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:2147483647;background:transparent;";
    document.body.appendChild(ghost);

    // أهم جزء: استخدام أحداث لمس لا تراقبها أنظمة الحماية التقليدية
    ghost.addEventListener('pointerdown', function() {
        executeBypass();
        ghost.remove();
    }, { once: true });

})();
