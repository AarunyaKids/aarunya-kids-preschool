(function(){
  var r=document.querySelector('.slider');
  if(!r)return;
  var s=r.querySelectorAll('.slide'),d=r.querySelectorAll('.dots button'),i=0,t=null,ready=false;

  function vid(el){return el&&el.querySelector?el.querySelector('video'):null}
  function stopTimer(){clearInterval(t);t=null}
  function startTimer(){
    stopTimer();
    if(!ready||vid(s[i]))return;
    t=setInterval(function(){go(i+1)},4500);
  }
  function pauseAll(){
    for(var k=0;k<s.length;k++){
      var v=vid(s[k]);
      if(v){try{v.pause()}catch(e){}}
      var b=s[k].querySelector&&s[k].querySelector('.vsound');
      if(b)b.hidden=true;
    }
  }
  function showSound(el,v){
    var btn=el.querySelector&&el.querySelector('.vsound');
    if(!btn)return;
    btn.hidden=false;
    btn.onclick=function(ev){
      ev.preventDefault();ev.stopPropagation();
      try{
        v.muted=false;v.defaultMuted=false;v.removeAttribute('muted');
        var p=v.play();
        if(p&&p.then)p.then(function(){btn.hidden=true}).catch(function(){});
        else btn.hidden=true;
      }catch(e){}
    };
  }
  function playVideo(){
    var el=s[i],v=vid(el);
    if(!v||!ready)return;
    stopTimer();
    try{if(v.currentTime>0.05)v.currentTime=0}catch(e){}
    try{v.muted=true;v.defaultMuted=true;v.setAttribute('muted','')}catch(e){}
    var p;
    try{p=v.play()}catch(e){go(i+1);return}
    if(p&&p.then){
      p.then(function(){showSound(el,v)}).catch(function(){go(i+1)});
    }else{
      showSound(el,v);
    }
  }
  function go(n){
    pauseAll();
    if(s[i])s[i].classList.remove('on');
    if(d[i])d[i].classList.remove('on');
    i=(n+s.length)%s.length;
    if(s[i])s[i].classList.add('on');
    if(d[i])d[i].classList.add('on');
    if(vid(s[i])){
      stopTimer();
      if(ready)playVideo();
    }else startTimer();
  }

  for(var k=0;k<s.length;k++){(function(idx){
    var v=vid(s[idx]);
    if(!v)return;
    v.addEventListener('ended',function(){if(i===idx)go(idx+1)});
    v.addEventListener('error',function(){if(i===idx)go(idx+1)});
  })(k)}

  function afterIntro(){
    if(ready)return;
    ready=true;
    if(vid(s[i]))playVideo();
    else startTimer();
  }
  var intro=document.getElementById('aIntro');
  if(!intro){
    afterIntro();
  }else{
    var mo=new MutationObserver(function(){
      if(!document.getElementById('aIntro')){mo.disconnect();afterIntro()}
    });
    mo.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(function(){if(!ready){try{mo.disconnect()}catch(e){}afterIntro()}},20000);
  }

  var prev=r.querySelector('.prev'),next=r.querySelector('.next');
  if(prev)prev.onclick=function(){go(i-1)};
  if(next)next.onclick=function(){go(i+1)};
  d.forEach(function(b,k){b.onclick=function(){go(k)}});
  r.onmouseenter=function(){if(!vid(s[i]))stopTimer()};
  r.onmouseleave=function(){if(!vid(s[i]))startTimer()};
})();
