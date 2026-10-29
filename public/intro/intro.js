(function(){var el=document.getElementById('aIntro');if(!el)return;
var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var replay=/[?&]intro=1/.test(location.search);
if(rm){el.remove();return}
el.style.display='block';var done=false;function end(){if(done)return;done=true;el.classList.add('out');setTimeout(function(){el.remove()},700)}
var h=el.querySelector('.hi5');if(h)h.addEventListener('click',function(){h.classList.add('hit');setTimeout(end,250)});
var sk=el.querySelector('.skip');if(sk)sk.addEventListener('click',end);
document.addEventListener('keydown',function(k){if(k.key==='Escape')end()});setTimeout(end,7000)})();
