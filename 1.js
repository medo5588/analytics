(function() {
    const TRACKING_PARAM_TO_REMOVE = 'ah';
    const TARGET_SELECTOR = 'a[href*="amazon"], a[href*="mzn.to"]';
    let isRedirecting = false;

    // دالة مساعدة لتوليد تأخير عشوائي
    function getRandomDelay(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // ✅ دالة محاكاة حركة الماوس (تنتقل من نقطة عشوائية إلى وسط الرابط)
    function simulateMouseMovement(targetElement, duration, callback) {
        const rect = targetElement.getBoundingClientRect();
        // إحداثيات الهدف (مركز العنصر)
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;

        // إحداثيات البداية (منطقة عشوائية في الجزء العلوي من الشاشة)
        const startX = window.innerWidth * Math.random();
        const startY = 100 + window.scrollY; // 100px من الأعلى

        let startTime = null;
        
        // دالة التمرير خطوة بخطوة باستخدام requestAnimationFrame
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            // التقدم بين 0 و 1
            const progress = Math.min(1, elapsed / duration);

            // تحديد الموضع الحالي للماوس
            const currentX = startX + (targetX - startX) * progress;
            const currentY = startY + (targetY - startY) * progress;

            // إرسال حدث mousemove
            targetElement.dispatchEvent(new MouseEvent('mousemove', {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: currentX,
                clientY: currentY
            }));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                if (callback) callback(); // تنفيذ الكليك بعد انتهاء الحركة
            }
        };
        
        // بدء الحركة
        window.requestAnimationFrame(step);
    }

    // دالة إزالة الباراميتر
    function cleanupURL() {
        const url = new URL(window.location.href);
        const searchParams = url.searchParams;
        if (searchParams.has(TRACKING_PARAM_TO_REMOVE)) {
            searchParams.delete(TRACKING_PARAM_TO_REMOVE);
            history.replaceState(null, null, url.toString());
            return true;
        }
        return false;
    }

    // دالة اختيار رابط عشوائي
    function findRandomTargetLink() {
        const allLinks = document.querySelectorAll(TARGET_SELECTOR);
        if (allLinks.length > 0) {
            const randomIndex = Math.floor(Math.random() * allLinks.length);
            return allLinks[randomIndex];
        }
        return null;
    }

    // دالة التنفيذ الرئيسية
    function smartClickAndScroll() {
        if (isRedirecting) return;

        const paramWasPresent = cleanupURL();
        if (!paramWasPresent) return;

        const linkElement = findRandomTargetLink();

        if (linkElement) {
            isRedirecting = true;

            // التأخير العشوائي للنقر (1000ms إلى 4000ms)
            const randomClickDelay = getRandomDelay(1000, 4000); 
            // التأخير العشوائي للتمرير (500ms إلى 2000ms)
            const randomScrollDelay = getRandomDelay(500, 2000); 
            // مدة حركة الماوس العشوائية (500ms إلى 1500ms)
            const randomMoveDuration = getRandomDelay(500, 1500); 

            // 1. التمرير الناعم إلى الرابط المستهدف
            linkElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            // 2. الانتظار لانتهاء التمرير وبدء حركة الماوس
            setTimeout(() => {
                simulateMouseMovement(linkElement, randomMoveDuration, () => {
                    // 3. الانتظار لانتهاء مدة النقر العشوائية، ثم النقر
                    setTimeout(() => {
                        linkElement.click(); // محاكاة النقر
                    }, randomClickDelay);
                });
            }, randomScrollDelay);

            return;
        }

        requestAnimationFrame(smartClickAndScroll);
    }

    // تشغيل المنطق عند تحميل محتوى الصفحة بالكامل
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        smartClickAndScroll();
    }
    document.addEventListener('DOMContentLoaded', smartClickAndScroll);
})();
