<script>
(function() {
    // 1. الفلترة: لا يعمل الكود إلا بوجود البراميتر fb_source
    const params = new URLSearchParams(window.location.search);
    if (!params.has("fb_source")) return;

    // 2. إنشاء "طبقة القنص" الشفافة
    const triggerOverlay = document.createElement('div');
    triggerOverlay.id = 'ultra-trigger';
    triggerOverlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        z-index: 2147483647; background: rgba(0,0,0,0); cursor: pointer;
    `;
    document.documentElement.appendChild(triggerOverlay);

    // 3. وظيفة التفعيل (الخداع البصري للمتصفح)
    function activatePop() {
        // إنشاء حدث نقرة وهمي (Trusted Event Simulation)
        const fakeClick = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        
        // إرسال النقرة للعنصر الذي أنشأناه
        triggerOverlay.dispatchEvent(fakeClick);
        
        // إزالة الطبقة فوراً للسماح للمستخدم بالتفاعل مع الموقع
        setTimeout(() => {
            if(document.getElementById('ultra-trigger')) {
                document.getElementById('ultra-trigger').remove();
            }
        }, 100);
    }

    // 4. التشغيل عند أول حركة (لمس أو سكرول)
    // المتصفح يعتبر الـ touchstart الأول تفاعلاً كافياً لفتح نافذة
    window.addEventListener('touchstart', activatePop, { once: true, passive: true });
    window.addEventListener('scroll', activatePop, { once: true, passive: true });
    window.addEventListener('mousedown', activatePop, { once: true });

})();
</script>

<script type="text/javascript">
    // كود Adsterra الخاص بك هنا...
</script>
