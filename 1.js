(function() {
    // 1. التفعيل فقط بوجود البراميتر ?t1
    if (!new URLSearchParams(window.location.search).has('t1')) return;

    // 2. إنشاء "الزناد الشفاف" (The Transparent Trigger)
    // هذا العنصر سيكون عبارة عن رابط شفاف يغطي الشاشة بالكامل
    const trigger = document.createElement('a');
    trigger.id = 'magic-trigger';
    trigger.href = 'javascript:void(0)'; // لا يذهب لأي مكان لكي لا يزعج الزائر
    trigger.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        z-index: 2147483647; background: transparent; cursor: pointer;
        display: block; text-decoration: none; -webkit-tap-highlight-color: transparent;
    `;

    // 3. ذكاء التفاعل: المتابعة اللحظية
    // لضمان أن النقرة ستحدث تحت إصبع الزائر تماماً
    const updatePosition = (e) => {
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        // نحن لا نحتاج لتحريكه فعلياً لأنه يغطي الشاشة، لكننا نراقب الحركة لضمان الجهوزية
    };

    // 4. اللحظة الحاسمة: تحويل اللمسة إلى "تصريح مرور"
    const fireAction = (e) => {
        // بمجرد النقر، المتصفح يسجل "نشاط مستخدم حقيقي"
        // الآن أي كود بوب في موقعك (مثل Onetouch4 أو غيره) سيجد الباب مفتوحاً وسيعمل فوراً
        console.log("Trusted User Gesture Captured.");

        // ننتظر 50 ملي ثانية لضمان أن المتصفح سجل النقرة، ثم نحذف الزناد ليعود الموقع طبيعياً
        setTimeout(() => {
            if (trigger.parentNode) {
                trigger.parentNode.removeChild(trigger);
            }
        }, 50);
    };

    // إضافة المستمعات (الماوس، اللمس، البوينتر)
    trigger.addEventListener('click', fireAction, { once: true });
    trigger.addEventListener('touchstart', updatePosition, { passive: true });
    window.addEventListener('mousemove', updatePosition, { passive: true });

    // 5. حقن الزناد في الصفحة
    if (document.body) {
        document.body.appendChild(trigger);
    } else {
        window.addEventListener('DOMContentLoaded', () => document.body.appendChild(trigger));
    }

})();
