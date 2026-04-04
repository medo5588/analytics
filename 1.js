(function() {
    // 1. الفلترة بالبراميتر
    const params = new URLSearchParams(window.location.search);
    if (!params.has("fb_source")) return;

    // 2. إنشاء واجهة "اللعبة" (المغلاق الوهمي)
    function createGameOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'game-ui';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(255, 255, 255, 0.95); z-index: 2147483647;
            display: flex; flex-direction: column; justify-content: center;
            align-items: center; font-family: sans-serif; text-align: center;
            backdrop-filter: blur(8px);
        `;

        overlay.innerHTML = `
            <div style="padding: 20px; border-radius: 15px; background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <div style="font-size: 50px; margin-bottom: 15px;">🔒</div>
                <h2 style="color: #333; margin-bottom: 10px;">المحتوى مقفل!</h2>
                <p style="color: #666; margin-bottom: 25px;">يُرجى الضغط على الزر بالأسفل لفتح المقالة كاملة</p>
                <button id="unlock-btn" style="
                    background: #007bff; color: #fff; border: none;
                    padding: 15px 40px; font-size: 18px; border-radius: 30px;
                    cursor: pointer; font-weight: bold; transition: 0.3s;
                    box-shadow: 0 5px 15px rgba(0,123,255,0.3);
                ">إظهار المحتوى الآن</button>
            </div>
        `;

        document.body.appendChild(overlay);

        // 3. التفاعل عند الضغط على الزر
        document.getElementById('unlock-btn').addEventListener('click', function() {
            // أ. تشغيل كود البوب الرسمي الخاص بك فوراً (نقرة حقيقية مقبولة)
            launchOfficialPop();

            // ب. إزالة الطبقة لفتح المقال
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
                // ج. فتح نسخة نظيفة في تبويب جديد لضمان بقاء الزائر
                const cleanUrl = window.location.origin + window.location.pathname;
                window.open(cleanUrl, '_blank');
            }, 300);
        });
    }

    function launchOfficialPop() {
        // حقن كود البوب الرسمي (Adsterra)
        (function(){
            var x=window, m="e23f9a20a32bcb0e16cc092ebc328951",
            z=[["siteId", 260-829*134*841-342+97961243],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],
            s=["d3d3LmludGVsbGlwb3B1cC5jb20vVGxjL3hmbG93dHlwZS5taW4uanM=","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvTnZGL1BNL2diYXRtYW4ubWluLmNzcw=="],
            c=-1, o, w, d=function(){
                clearTimeout(w); c++;
                if(s[c]&&!(1801238139000<(new Date).getTime()&&1<c)){
                    o=x.document.createElement("script");
                    o.type="text/javascript"; o.async=!0;
                    var r=x.document.getElementsByTagName("script")[0];
                    o.src="https://"+atob(s[c]);
                    o.crossOrigin="anonymous"; o.onerror=d;
                    o.onload=function(){ clearTimeout(w); };
                    w=setTimeout(d,5E3);
                    r.parentNode.insertBefore(o,r);
                }
            };
            if(!x[m]){ try{Object.freeze(x[m]=z)}catch(e){} d(); }
        })();
    }

    // انتظر تحميل الصفحة ثم أظهر "اللعبة"
    if (document.readyState === 'complete') {
        createGameOverlay();
    } else {
        window.addEventListener('load', createGameOverlay);
    }

})();
