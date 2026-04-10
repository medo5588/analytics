document.addEventListener('DOMContentLoaded', async () => {
    // 1. استخراج المعامل 'a' من الرابط
    const url = new URL(window.location.href);
    const actionType = url.searchParams.get('a');

    // إذا لم يوجد البراميتر المطلوب (1-4)، يتوقف الكود تماماً لحماية الصفحة
    if (!['1', '2', '3', '4'].includes(actionType)) return;

    // 2. تنظيف الرابط فوراً (لإخفاء التتبع عن الزائر وضمان ريفير نظيف 100%)
    if (window.history.replaceState) {
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({path: cleanUrl}, "", cleanUrl);
    }

    // 3. دالة البحث الشاملة عن جميع الروابط المستهدفة
    const getTargetLink = () => {
        const selectors = [
            'a[href*="ebay.us"]',
            'a[href*="ebay.ca"]',
            'a[href*="rzekl.com"]',
            'a[href*="click.linksynergy.com"]',
            'a[href*="viiukuhe.com"]' // النطاق الجديد
        ];
        return document.querySelector(selectors.join(', '));
    };

    // 4. تنفيذ النقرة "الاحترافية" لضمان العمولة والكوكيز
    const forceAffiliateClick = (link) => {
        if (!link) return;

        // إزالة أي قيود قد تحجب الـ Referrer (مثل rel="noreferrer")
        link.removeAttribute('rel'); 
        link.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
        
        // محاكاة حدث نقر كامل (MouseEvent) لضمان أن النظام يراها كأنه مستخدم حقيقي
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        
        link.dispatchEvent(clickEvent);

        // نسخة احتياطية سريعة جداً للانتقال في حال كان المتصفح يمنع الـ dispatchEvent
        setTimeout(() => { if(link) link.click(); }, 50);
    };

    // 5. سيناريوهات التنفيذ (مزيج من السرعة والأنسنة لضمان الكوكيز)
    const simulationActions = {
        '1': async () => {
            await new Promise(r => setTimeout(r, 400)); // انتظار بسيط للاستقرار
            forceAffiliateClick(getTargetLink());
        },
        '2': async () => {
            window.scrollTo({ top: 150, behavior: 'auto' }); // تمرير خاطف
            await new Promise(r => setTimeout(r, 300));
            forceAffiliateClick(getTargetLink());
        },
        '3': async () => {
            await new Promise(r => setTimeout(r, 200)); // الأسرع على الإطلاق
            forceAffiliateClick(getTargetLink());
        },
        '4': async () => {
            window.scrollTo({ top: 250, behavior: 'smooth' }); // تمرير ناعم (بشري جداً)
            await new Promise(r => setTimeout(r, 700)); 
            forceAffiliateClick(getTargetLink());
        }
    };

    try {
        if (simulationActions[actionType]) {
            await simulationActions[actionType]();
        }
    } catch (e) {
        // فشل صامت لعدم إثارة الشبهات
    }
});
