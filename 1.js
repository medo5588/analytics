(async function() {
    const TRACKING_PARAM = 'ah';
    const TARGET_SELECTOR = 'a[href*="omg10.com"]';

    const sleep = ms => new Promise(res => setTimeout(res, ms));

    function cleanupURL() {
        const url = new URL(window.location.href);
        if (url.searchParams.has(TRACKING_PARAM)) {
            url.searchParams.delete(TRACKING_PARAM);
            history.replaceState(null, '', url.toString());
            return true;
        }
        return false;
    }

    async function executeSmartClick() {
        if (!cleanupURL()) return;

        const links = document.querySelectorAll(TARGET_SELECTOR);
        
        if (links.length > 0) {
            const randomLink = links[Math.floor(Math.random() * links.length)];
            
            // --- الجزء الخاص بالريفير (Referrer) ---
            const currentReferrer = document.referrer || 'direct'; // إذا لم يوجد ريفير يكتب direct
            const targetURL = new URL(randomLink.href);
            
            // إضافة الريفير كباراميتر باسم 'ref' أو 'source'
            targetURL.searchParams.set('ref', currentReferrer);
            randomLink.href = targetURL.toString();
            // ---------------------------------------

            // التمرير إلى الرابط
            randomLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // انتظار عشوائي
            await sleep(Math.floor(Math.random() * 1000) + 1500);

            // التنفيذ في نفس النافذة لضمان انتقال الريفير بشكل صحيح
            randomLink.target = '_self'; 
            
            console.log("Redirecting to: " + randomLink.href);
            randomLink.click();
        }
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        executeSmartClick();
    } else {
        document.addEventListener('DOMContentLoaded', executeSmartClick);
    }
})();
