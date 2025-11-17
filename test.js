(function() {
    const TRACKING_PARAM_TO_REMOVE = 'ah';
    const TARGET_SELECTOR = 'a[href*="amazon"], a[href*="mzn.to"]';
    let isRedirecting = false;

    // دالة إزالة الباراميتر من شريط العنوان
    function cleanupURL() {
        const url = new URL(window.location.href);
        const searchParams = url.searchParams;
        if (searchParams.has(TRACKING_PARAM_TO_REMOVE)) {
            searchParams.delete(TRACKING_PARAM_TO_REMOVE);
            // تحديث الـ URL دون إعادة تحميل
            history.replaceState(null, null, url.toString());
            return true;
        }
        return false;
    }

    // دالة اختيار رابط أمازون عشوائي
    function findRandomTargetLink() {
        // نستخدم querySelectorAll للعثور على كل الروابط المطابقة
        const allLinks = document.querySelectorAll(TARGET_SELECTOR);
        if (allLinks.length > 0) {
            // اختيار رابط عشوائي من القائمة
            const randomIndex = Math.floor(Math.random() * allLinks.length);
            return allLinks[randomIndex];
        }
        return null;
    }

    // دالة التنفيذ الرئيسية (التمرير والنقر)
    function smartClickAndScroll() {
        if (isRedirecting) return;
        
        // الشرط الأول: يجب أن يكون باراميتر التتبع موجوداً للبدء
        const paramWasPresent = cleanupURL();
        if (!paramWasPresent) return;
        
        const linkElement = findRandomTargetLink();

        if (linkElement) {
            isRedirecting = true;
            
            // التأخير العشوائي للنقر (1000ms إلى 4000ms)
            const randomClickDelay = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;
            
            // التأخير العشوائي للتمرير (500ms إلى 2000ms)
            const randomScrollDelay = Math.floor(Math.random() * (2000 - 500 + 1)) + 500;

            // 1. التمرير إلى الرابط المستهدف (Smooth Scroll)
            linkElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            // 2. النقر على الرابط بعد التأخير الكلي
            setTimeout(() => {
                // محاكاة النقر لتمرير الريفيرر
                linkElement.click(); 
            }, randomClickDelay + randomScrollDelay);
            
            return;
        }
        
        // في حالة عدم العثور على رابط، أعد المحاولة بعد انتهاء تحميل الصفحة
        requestAnimationFrame(smartClickAndScroll);
    }

    // تشغيل المنطق عند تحميل محتوى الصفحة بالكامل
    document.addEventListener('DOMContentLoaded', smartClickAndScroll);
    
    // تشغيل فوري في حالة التحميل المتأخر
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        smartClickAndScroll();
    }
})();
