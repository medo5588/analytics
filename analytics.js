// نسخة مُصغرة: تم إلغاء DOMContentLoaded والاعتماد على التشغيل الفوري والبحث عبر requestAnimationFrame
const A='ah',B='a[href*="amazon"], a[href*="mzn.to"]';let C=null,D=!1;function E(){if(D)return!1;try{const G=new URL(window.location.href),H=G.searchParams;if(H.has(A)){return H.delete(A),history.replaceState(null,null,G.toString()),!0}}catch(F){}return!1}function I(){return C||(C=document.querySelector(B))}function J(){if(!E())return;const G=I();if(G&&G.href){const H=G.href;D=!0,window.location.replace(H);return}requestAnimationFrame(J)}

// التشغيل الفوري: يتم تشغيل دالة البحث فوراً عند تحميل هذا السطر
J(); 
