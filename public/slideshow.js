(function(){var r=document.querySelector('.slider');if(!r)return;var s=r.querySelectorAll('.slide'),d=r.querySelectorAll('.dots button'),i=0,t;
function go(n){s[i].classList.remove('on');d[i].classList.remove('on');i=(n+s.length)%s.length;s[i].classList.add('on');d[i].classList.add('on');}
function play(){clearInterval(t);t=setInterval(function(){go(i+1)},4500);}
r.querySelector('.prev').onclick=function(){go(i-1);play()};r.querySelector('.next').onclick=function(){go(i+1);play()};
d.forEach(function(b,k){b.onclick=function(){go(k);play()}});
r.onmouseenter=function(){clearInterval(t)};r.onmouseleave=play;play();})();
