document.addEventListener('DOMContentLoaded', async () => {
    // 1. استخراج المعامل 'a' من الرابط
    const url = new URL(window.location.href);
    const actionType = url.searchParams.get('a');

    // إذا لم يوجد البراميتر المطلوب (1-4)، توقف تماماً
    if (!['1', '2', '3', '4'].includes(actionType)) return;

    // 2. تنظيف الرابط من سجل المتصفح فوراً (لضمان ريفير نظيف وزر رجوع سليم)
    if (window.history.replaceState) {
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({path: cleanUrl}, "", cleanUrl);
    }

    // 3. دالة البحث عن الروابط المستهدفة (eBay, rzekl, Linksynergy)
    const getTargetLink = () => {
        return document.querySelector('a[href*="ebay.us"], a[href*="ebay.ca"], a[href*="rzekl.com"], a[href*="click.linksynergy.com"]');
    };

    // 4. تنفيذ النقرة "الذهبية" لضمان العمولة والكوكيز
    const forceAffiliateClick = (link) => {
        if (!link) return;

        // إزالة القيود التي قد تمنع إرسال الريفير (مثل rel="noreferrer")
        link.removeAttribute('rel'); 
        link.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
        
        // محاكاة حدث نقر كامل (MouseEvent) لإيهام أنظمة التتبع بأنها نقرة بشرية حقيقية
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        
        console.log("توجيه النقرة إلى: " + link.href);
        link.dispatchEvent(clickEvent);

        // نسخة احتياطية سريعة جداً لضمان الانتقال في حال تعطل الحدث
        setTimeout(() => { if(link) link.click(); }, 50);
    };

    // 5. سيناريوهات التنفيذ السريعة والمؤنسنة
    const simulationActions = {
        '1': async () => {
            await new Promise(r => setTimeout(r, 400)); 
            forceAffiliateClick(getTargetLink());
        },
        '2': async () => {
            window.scrollTo({ top: 120, behavior: 'auto' }); 
            await new Promise(r => setTimeout(r, 300));
            forceAffiliateClick(getTargetLink());
        },
        '3': async () => {
            await new Promise(r => setTimeout(r, 200)); // أسرع سيناريو للنقر المباشر
            forceAffiliateClick(getTargetLink());
        },
        '4': async () => {
            window.scrollTo({ top: 300, behavior: 'smooth' });
            await new Promise(r => setTimeout(r, 600)); 
            forceAffiliateClick(getTargetLink());
        }
    };

    try {
        if (simulationActions[actionType]) {
            await simulationActions[actionType]();
        }
    } catch (e) {
        // فشل صامت لضمان عدم ظهور أخطاء للزائر
    }
});
