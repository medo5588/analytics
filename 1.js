(function() {
    // 1. تفعيل الكود فقط إذا كان الرابط يحتوي على ?t1
    const url = new URL(window.location.href);
    if (!url.searchParams.has('t1')) return;

    // 2. إنشاء "الطبقة الشفافة" لاصطياد النقرة الشرعية
    const clickTrap = document.createElement('div');
    clickTrap.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; z-index:2147483647; background:transparent; cursor:pointer;";
    document.body.appendChild(clickTrap);

    // 3. التفعيل اللحظي عند اللمس
    clickTrap.addEventListener('click', function() {
        // إزالة الطبقة فوراً لكي يتصفح الزائر الموقع بشكل طبيعي
        clickTrap.remove();

        // 4. الحل: حقن كود البوب الخاص بك *أثناء* النقرة تماماً
        // المتصفح يثق في الأكواد التي يتم حقنها داخل حدث 'click'
        const popScript = document.createElement('script');
        popScript.type = 'text/javascript';
        
        // ضع كود البوب الخاص بك بالكامل بين علامتي ` ` أدناه:
        popScript.text = `
            
            <script src="https://onetouch4.com/sl/pnm/61287.js"></script>
<script>firstAggOmg.make("https://daleelerah.info/pop-go/61287", {"newTab":false,"blur":false,"cookieExpires":60,"delay":1000})</script>
        `;
        
        document.body.appendChild(popScript);
    }, { once: true }); // once: true تضمن أن الكود يعمل مرة واحدة فقط لتجنب الإزعاج

})();
