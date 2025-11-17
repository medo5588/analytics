<script>
(function() {
    // === الإعدادات ===
    
    // الباراميترات المراد إزالتها من شريط العنوان (ah, am)
    const TRACKING_PARAMS_TO_REMOVE = ['ah', 'am']; 

    // قائمة الروابط المستهدفة للتحويل الفوري (Amazon, Riviuo, etc.)
    const TARGET_SELECTORS = [
        'a[href*="amazon.com"]',
        'a[href*="mzn.to"]',
        'a[href*="riviuo.com"]' 
    ];
    
    let isRedirecting = false;
    let targetLink = null;

    // دالة توليد التأخير العشوائي (1000ms إلى 4000ms)
    function getRandomDelay() {
        const min = 1000; // 1 ثانية
        const max = 4000; // 4 ثواني
        // توليد رقم عشوائي بين 1000 و 4000
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // دالة لإزالة باراميترات التتبع وتحديث الـ URL في التاريخ
    function cleanupURL() {
        const url = new URL(window.location.href);
        const searchParams = url.searchParams;
        let urlChanged = false;

        TRACKING_PARAMS_TO_REMOVE.forEach(param => {
            if (searchParams.has(param)) {
                searchParams.delete(param);
                urlChanged = true;
            }
        });

        if (urlChanged) {
            // استخدام replaceState لإزالة الباراميتر من شريط العنوان دون إعادة تحميل الصفحة
            history.replaceState(null, null, url.toString());
        }
        return urlChanged;
    }

    // دالة للبحث عن الرابط المستهدف
    function findTargetLink() {
        if (targetLink) return targetLink;

        for (const selector of TARGET_SELECTORS) {
            const link = document.querySelector(selector);
            if (link && link.href) {
                targetLink = link;
                return targetLink;
            }
        }
        return null;
    }

    // دالة التنفيذ الرئيسي والتحويل
    function smartRedirect() {
        if (isRedirecting) return;
        
        // 1. التحقق والتنظيف: إذا كان أحد الباراميترات موجودًا، نقوم بالتنظيف
        const paramWasPresent = cleanupURL();
        
        // 2. البحث عن الرابط المستهدف فقط إذا كان الباراميتر موجودًا
        if (!paramWasPresent) return;
        
        const linkElement = findTargetLink();

        if (linkElement && linkElement.href) {
            isRedirecting = true;
            const redirectURL = linkElement.href;
            
            // ✅ تطبيق التأخير العشوائي المطلوب
            const randomDelay = getRandomDelay();
            
            // يمكنك إلغاء تعليق السطر التالي لأغراض الاختبار
            // console.log(`Redirecting in ${randomDelay}ms to: ${redirectURL}`); 

            // 3. تنفيذ التحويل مع التأخير المحدد
            setTimeout(() => {
                // ✅ استخدام replace() لـ "منع ترافيك الـ Jump"
                // هذه الطريقة أفضل من .href في مساعدة متصفحات معينة على عدم تمرير الـ Referrer.
                window.location.replace(redirectURL);
            }, randomDelay);
            
            return;
        }
        
        // إعادة المحاولة عند عدم العثور على الرابط (لإتاحة وقت لتحميل عناصر DOM)
        requestAnimationFrame(smartRedirect);
    }

    // === تشغيل المنطق ===
    
    // 1. محاولة التشغيل فوراً في حال كانت الصفحة محملة مسبقاً
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        smartRedirect();
    }
    
    // 2. الاستماع لحدث تحميل DOM
    document.addEventListener('DOMContentLoaded', smartRedirect);
    
})();
</script>
