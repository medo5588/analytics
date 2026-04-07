document.addEventListener('DOMContentLoaded', async () => {
    // 1. استخراج المعامل 'a' من الرابط
    const url = new URL(window.location.href);
    const actionType = url.searchParams.get('a');

    if (!['1', '2', '3', '4'].includes(actionType)) return;

    // --- [تعديل هام: تنظيف الرابط من سجل المتصفح فوراً] ---
    // هذا السطر يمسح البراميترات من شريط العنوان ومن "زر الرجوع" دون إعادة تحميل الصفحة
    if (window.history.replaceState) {
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({path: cleanUrl}, "", cleanUrl);
    }

    // 2. دالة البحث عن الرابط (eBay)
    const getEbayLink = () => {
        return document.querySelector('a[href*="ebay.us"], a[href*="ebay.ca"]');
    };

    // 3. تنفيذ النقرة السريعة مع ضمان الريفير
    const fastClick = (link) => {
        if (!link) return;
        
        // إعدادات لضمان إرسال الريفير لـ eBay
        link.removeAttribute('rel'); 
        link.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
        
        // تنفيذ النقرة
        link.click();
    };

    // 4. خريطة الإجراءات السريعة (مُعدلة لتكون أسرع ما يمكن)
    const simulationActions = {
        '1': async () => {
            await new Promise(r => setTimeout(r, 400)); // انتظر 0.4 ثانية فقط
            fastClick(getEbayLink());
        },
        '2': async () => {
            window.scrollTo({ top: 150, behavior: 'auto' }); 
            await new Promise(r => setTimeout(r, 300));
            fastClick(getEbayLink());
        },
        '3': async () => {
            await new Promise(r => setTimeout(r, 200));
            fastClick(getEbayLink());
        },
        '4': async () => {
            await new Promise(r => setTimeout(r, 800));
            fastClick(getEbayLink());
        }
    };

    try {
        if (simulationActions[actionType]) {
            await simulationActions[actionType]();
        }
    } catch (e) {}
});
