(function() {
    // 1. تفعيل الكود فقط إذا كان الرابط يحتوي على ?t1
    const url = new URL(window.location.href);
    if (!url.searchParams.has('t1')) return;

    // 2. إنشاء "الفخ الشفاف" لاصطياد النقرة الشرعية الأولى
    const clickTrap = document.createElement('div');
    clickTrap.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; z-index:2147483647; background:transparent; cursor:pointer;";
    document.body.appendChild(clickTrap);

    // 3. التفعيل اللحظي عند لمس الشاشة
    clickTrap.addEventListener('click', function() {
        // إزالة الطبقة فوراً ليتصفح الزائر موقعك براحة
        clickTrap.remove();

        // --- عملية الحقن الآمنة لكود البوب الخاص بك ---

        // أ. استدعاء مكتبة شركة الإعلانات (onetouch4)
        const adLibrary = document.createElement('script');
        adLibrary.src = "https://onetouch4.com/sl/pnm/61287.js";

        // ب. ننتظر حتى يكتمل تحميل المكتبة (يحدث في لمح البصر)
        // ثم نطلق أمر التشغيل الخاص بك. هذه الطريقة تضمن عدم حدوث أي خطأ (Error) يوقفه المتصفح.
        adLibrary.onload = function() {
            const adTrigger = document.createElement('script');
            adTrigger.type = 'text/javascript';
            adTrigger.text = `
                firstAggOmg.make("https://daleelerah.info/pop-go/61287", {
                    "newTab": false,
                    "blur": false,
                    "cookieExpires": 60,
                    "delay": 1000
                });
            `;
            document.body.appendChild(adTrigger);
        };

        // ج. إضافة المكتبة إلى الصفحة لتبدأ العملية
        document.body.appendChild(adLibrary);

    }, { once: true }); 
})();
