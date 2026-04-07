// تشغيل الكود فور اكتمال تحميل محتوى الصفحة
document.addEventListener('DOMContentLoaded', async () => {

    // 1. استخراج قيمة المعامل 'a' من رابط الصفحة
    const urlParams = new URLSearchParams(window.location.search);
    const actionType = urlParams.get('a');

    // 2. التحقق من القيم المسموحة
    if (!['1', '2', '3', '4'].includes(actionType)) {
        return;
    }

    // دالة للبحث عن رابط eBay والضغط عليه
    const clickOnEbay = () => {
        const ebayLink = Array.from(document.querySelectorAll('a'))
            .find(a => a.href.includes('ebay.us') || a.href.includes('ebay.ca'));
        
        if (ebayLink) {
            console.log("تم العثور على رابط eBay: " + ebayLink.href);
            ebayLink.click();
        } else {
            console.log("لم يتم العثور على روابط eBay في هذه الصفحة.");
        }
    };

    // دالة مساعدة لتوليد رقم عشوائي
    const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

    // 4. خريطة الإجراءات (السيناريوهات) معدلة لتنتهي بنقرة على eBay
    const simulationActions = {
        
        // السيناريو الأول: انتظار ثم ضغط
        '1': async () => {
            await new Promise(resolve => setTimeout(resolve, getRandomNumber(1000, 2500)));
            clickOnEbay();
        },

        // السيناريو الثاني: تمرير ثم ضغط
        '2': async () => {
            window.scrollTo({
                top: getRandomNumber(200, 500),
                behavior: 'smooth'
            });
            await new Promise(resolve => setTimeout(resolve, getRandomNumber(2000, 3500)));
            clickOnEbay();
        },

        // السيناريو الثالث: حركة ماوس وهمية ثم ضغط
        '3': async () => {
            await new Promise(resolve => setTimeout(resolve, getRandomNumber(500, 1500)));
            window.dispatchEvent(new MouseEvent('mousemove', {
                bubbles: true,
                clientX: getRandomNumber(100, 500),
                clientY: getRandomNumber(100, 500)
            }));
            await new Promise(resolve => setTimeout(resolve, 1000));
            clickOnEbay();
        },

        // السيناريو الرابع: تفاعل معقد ثم ضغط
        '4': async () => {
            window.scrollTo({
                top: getRandomNumber(400, 800),
                behavior: 'smooth'
            });
            await new Promise(resolve => setTimeout(resolve, getRandomNumber(2500, 4500)));
            clickOnEbay();
        }
    };

    // 5. تنفيذ السيناريو
    try {
        if (simulationActions[actionType]) {
            await simulationActions[actionType]();
        }
    } catch (error) {
        // تجاهل الأخطاء
    }
});
