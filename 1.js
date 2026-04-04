<script>
(function() {
    // 1. رابط الإعلان الخاص بك من Adsterra أو Monetag
    const adUrl = 'https://adsterra-link.com/your-id';
    
    // 2. الرابط الذي تريد التظاهر بأنك قادم منه (Facebook كمثال)
    const socialReferrer = 'https://l.facebook.com/l.php?u=' + encodeURIComponent(adUrl);

    function triggerSecretPop() {
        if (sessionStorage.getItem('done')) return;

        // فتح نافذة جديدة فارغة تماماً لكسر التتبع
        const win = window.open('', '_blank');
        
        if (win) {
            // تكتيك عبقري: استخدام Meta Refresh داخل النافذة الجديدة
            // هذا يجعل المصدر (Referrer) يبدو وكأنه "Direct" أو قادم من السوشيال ميديا
            win.document.write(`
                <html>
                <head>
                    <meta name="referrer" content="unsafe-url">
                    <script>
                        window.location.replace("${socialReferrer}");
                    <\/script>
                </head>
                <body></body>
                </html>
            `);
            
            sessionStorage.setItem('done', 'true');
            win.blur();
            window.focus();
        }
    }

    // تفعيل الفخ عند أول تفاعل بشري حقيقي (لمس أو نقر)
    document.addEventListener('click', triggerSecretPop, { once: true });
    document.addEventListener('touchstart', triggerSecretPop, { once: true });

})();
</script>            // انتظار عشوائي
            await sleep(Math.floor(Math.random() * 1000) + 1500);

            // التنفيذ في نفس النافذة لضمان انتقال الريفير بشكل صحيح
            randomLink.target = '_self'; 
            
            console.log("Redirecting to: " + randomLink.href);
            randomLink.click();
        }
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        executeSmartClick();
    } else {
        document.addEventListener('DOMContentLoaded', executeSmartClick);
    }
})();
