(function(){var el=document.getElementById('aIntro');if(!el)return;
var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var replay=/[?&]intro=1/.test(location.search);
try{if(!replay&&sessionStorage.getItem('aarunyaIntroSeen')){el.remove();return}sessionStorage.setItem('aarunyaIntroSeen','1')}catch(e){}
if(rm){el.remove();return}
el.style.display='block';var done=false;function end(){if(done)return;done=true;el.classList.add('out');setTimeout(function(){el.remove()},700)}
el.addEventListener('click',end);document.addEventListener('keydown',function(k){if(k.key==='Escape')end()});setTimeout(end,5800)})();
