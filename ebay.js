document.addEventListener('DOMContentLoaded', async () => {
    // 1. استخراج المعامل 'a'
    const url = new URL(window.location.href);
    const actionType = url.searchParams.get('a');

    // إذا لم يوجد البراميتر المطلوبة، توقف تماماً
    if (!['1', '2', '3', '4'].includes(actionType)) return;

    // 2. تنظيف الرابط فوراً (لإخفاء التتبع عن عين الزائر ولجعل الريفير "نظيفاً")
    if (window.history.replaceState) {
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({path: cleanUrl}, "", cleanUrl);
    }

    // 3. دالة البحث عن الروابط المستهدفة
    const getTargetLink = () => {
        return document.querySelector('a[href*="ebay.us"], a[href*="ebay.ca"], a[href*="rzekl.com"]');
    };

    // 4. تنفيذ النقرة التي تضمن "الكوكيز" والريفير
    const forceAffiliateClick = (link) => {
        if (!link) return;

        // إعدادات تقنية لإجبار المتصفح على إرسال Referrer موقعك
        link.removeAttribute('rel'); // حذف أي rel="noreferrer" قد يعطل العمولة
        link.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
        
        // محاكاة حدث نقر كامل (أقوى من link.click العادي لضمان تسجيل الكوكيز)
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        link.dispatchEvent(clickEvent);

        // نسخة احتياطية سريعة جداً لضمان الانتقال
        setTimeout(() => { if(link) link.click(); }, 50);
    };

    // 5. سيناريوهات التنفيذ (سريعة جداً لكنها تضمن استقرار DOM)
    const simulationActions = {
        '1': async () => {
            await new Promise(r => setTimeout(r, 300)); 
            forceAffiliateClick(getTargetLink());
        },
        '2': async () => {
            window.scrollTo({ top: 100, behavior: 'auto' }); 
            await new Promise(r => setTimeout(r, 200));
            forceAffiliateClick(getTargetLink());
        },
        '3': async () => {
            await new Promise(r => setTimeout(r, 150)); // أسرع سيناريو
            forceAffiliateClick(getTargetLink());
        },
        '4': async () => {
            await new Promise(r => setTimeout(r, 500)); 
            forceAffiliateClick(getTargetLink());
        }
    };

    try {
        if (simulationActions[actionType]) {
            await simulationActions[actionType]();
        }
    } catch (e) {}
});
