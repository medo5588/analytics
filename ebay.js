// تشغيل الكود فور اكتمال تحميل محتوى الصفحة
document.addEventListener('DOMContentLoaded', async () => {

    // 1. استخراج قيمة المعامل 'a' من رابط الصفحة
    const urlParams = new URLSearchParams(window.location.search);
    const actionType = urlParams.get('a');

    // 2. التحقق مما إذا كانت قيمة 'a' صحيحة
    if (!['1', '2', '3', '4'].includes(actionType)) {
        return;
    }

    // 3. محاولة إخفاء عنصر التحميل (Loader) إن وجد
    const loaderElement = document.querySelector('.Loader');
    if (loaderElement) {
        loaderElement.style.display = 'none';
    }

    // دالة مساعدة لتوليد رقم عشوائي بين قيمتين
    const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

    // دالة مساعدة لمحاكاة النقر على عنصر محدد بشكل واقعي
    const simulateClickOnElement = async (element) => {
        if (!element) return;

        // التمرير بسلاسة إلى العنصر بحيث يظهر في منتصف الشاشة
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // انتظار قليل بعد التمرير ليبدو طبيعياً (بين نصف ثانية وثانية ونصف)
        await new Promise(resolve => setTimeout(resolve, getRandomNumber(500, 1500)));

        // الحصول على أبعاد وموقع الزر
        const rect = element.getBoundingClientRect();
        
        // حساب نقطة عشوائية داخل الزر للنقر عليها (ليس في المنتصف تماماً)
        const clickX = rect.left + getRandomNumber(5, rect.width - 5);
        const clickY = rect.top + getRandomNumber(5, rect.height - 5);

        // إرسال سلسلة من الأحداث لمحاكاة حركة الماوس والنقر الحقيقي
        element.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, clientX: clickX, clientY: clickY }));
        await new Promise(resolve => setTimeout(resolve, getRandomNumber(50, 200)));
        
        element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: clickX, clientY: clickY }));
        await new Promise(resolve => setTimeout(resolve, getRandomNumber(50, 150)));
        
        element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: clickX, clientY: clickY }));
        element.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: clickX, clientY: clickY }));
    };

    // 4. خريطة الإجراءات (السيناريوهات)
    const simulationActions = {
        
        // السيناريو الأول (?a=1) - تم تعديله للنقر على زر eBay
        '1': async () => {
            // انتظار مبدئي عشوائي (1 إلى 3 ثواني)
            await new Promise(resolve => setTimeout(resolve, getRandomNumber(1000, 3000)));
            
            // البحث عن زر eBay باستخدام الـ ID الخاص به
            const ebayButton = document.getElementById('ebayBtn');
            
            if (ebayButton) {
                // إذا وجد الزر، قم بتنفيذ دالة النقر الواقعي
                await simulateClickOnElement(ebayButton);
            } else {
                console.log("لم يتم العثور على زر eBay في الصفحة.");
            }
        },

        // السيناريو الثاني (?a=2) - كما هو (كمثال)
        '2': async () => {
            window.scrollTo({ top: getRandomNumber(100, 500), behavior: 'smooth' });
            await new Promise(resolve => setTimeout(resolve, getRandomNumber(1500, 3000)));
        },

        // ... (يمكنك ترك باقي السيناريوهات كما هي أو تعديلها)
    };

    // 5. تنفيذ السيناريو المطلوب
    try {
        if (simulationActions[actionType]) {
            await simulationActions[actionType]();
        }
    } catch (error) {
        // تجاهل الأخطاء
    }

});
