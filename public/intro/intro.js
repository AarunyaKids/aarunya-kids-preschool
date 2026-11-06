(function(){var el=document.getElementById('aIntro');if(!el)return;
var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
if(rm){el.remove();return}
el.style.display='block';
var done=false;function end(){if(done)return;done=true;clearTimeout(birdT);clearTimeout(maxT);try{var v=el.querySelector('video');if(v){v.pause()}}catch(e){}el.classList.add('out');setTimeout(function(){el.remove()},700)}
var sk=el.querySelector('.skip');if(sk)sk.addEventListener('click',end);
document.addEventListener('keydown',function(k){if(k.key==='Escape')end()});
var birdT=null,maxT=null;

if(el.getAttribute('data-mode')==='video'){
  var vid=el.querySelector('video');
  var iframe=el.querySelector('iframe');
  var soundOn=false,soundBtn=null;
  maxT=setTimeout(end,90000);

  function hideSoundBtn(){if(soundBtn){try{soundBtn.remove()}catch(e){}soundBtn=null}}
  function showSoundBtn(){
    if(soundOn||done||soundBtn)return;
    soundBtn=document.createElement('button');
    soundBtn.type='button';
    soundBtn.className='sound';
    soundBtn.textContent='Tap for sound';
    soundBtn.setAttribute('aria-label','Tap for sound');
    soundBtn.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();enableSound()});
    soundBtn.addEventListener('pointerdown',function(ev){ev.stopPropagation()});
    el.appendChild(soundBtn);
  }
  function isSkipTarget(t){
    if(!t||!sk)return false;
    if(t===sk)return true;
    try{if(typeof t.closest==='function'&&t.closest('.skip'))return true}catch(e){}
    try{if(sk.contains&&sk.contains(t))return true}catch(e){}
    return false;
  }
  function enableSound(){
    if(soundOn||done)return;
    if(vid){
      try{
        vid.muted=false;vid.defaultMuted=false;vid.removeAttribute('muted');
        var p=vid.play();
        if(p&&p.then){
          p.then(function(){soundOn=true;hideSoundBtn()}).catch(function(){});
        }else{soundOn=true;hideSoundBtn()}
      }catch(e){}
      return;
    }
    if(iframe){
      try{
        var src=iframe.getAttribute('src')||'';
        if(/[?&]mute=1/.test(src)){
          iframe.setAttribute('src',src.replace(/([?&])mute=1/,'$1mute=0'));
        }else if(src.indexOf('mute=')===-1){
          iframe.setAttribute('src',src+(src.indexOf('?')>=0?'&':'?')+'mute=0');
        }
        soundOn=true;hideSoundBtn();
      }catch(e){}
    }
  }
  function onIntroGesture(ev){
    if(done||soundOn)return;
    if(isSkipTarget(ev.target))return;
    enableSound();
  }
  function onIntroKey(ev){
    if(done||soundOn)return;
    if(ev.key==='Escape')return;
    enableSound();
  }
  el.addEventListener('pointerdown',onIntroGesture);
  el.addEventListener('click',onIntroGesture);
  document.addEventListener('keydown',onIntroKey);

  if(vid){
    try{vid.playsInline=true;vid.setAttribute('playsinline','');vid.removeAttribute('controls');vid.controls=false}catch(e){}
    vid.addEventListener('ended',end);
    vid.addEventListener('error',function(){setTimeout(end,800)});
    var holdFirst=function(){try{if(vid.readyState>=2&&vid.currentTime<0.05)vid.currentTime=0.01}catch(e){}};
    vid.addEventListener('loadeddata',holdFirst);
    try{vid.muted=false;vid.defaultMuted=false;vid.removeAttribute('muted')}catch(e){}
    var tryPlay=vid.play();
    if(tryPlay&&tryPlay.then){
      tryPlay.then(function(){soundOn=true;hideSoundBtn()}).catch(function(){
        holdFirst();
        try{vid.muted=true;vid.defaultMuted=true;vid.setAttribute('muted','')}catch(e){}
        var mutedPlay=vid.play();
        if(mutedPlay&&mutedPlay.catch)mutedPlay.catch(function(){});
        showSoundBtn();
      });
    }else{
      if(vid.paused){try{vid.muted=true;vid.play()}catch(e){}}
      if(vid.muted)showSoundBtn();else{soundOn=true}
    }
  }else if(iframe){
    // YouTube embeds start muted for autoplay; offer tap-to-unmute via mute=0 reload
    showSoundBtn();
  }
  return;
}

var AC=window.AudioContext||window.webkitAudioContext,ac=null;
function ctx(){if(!AC)return null;if(!ac){try{ac=new AC()}catch(e){return null}}if(ac.state==='suspended')ac.resume();return ac}
function chirp(t,f){var o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*1.6,t+.07);o.frequency.exponentialRampToValueAtTime(f*1.1,t+.12);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.035,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.14);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+.15)}
function birds(){if(birdT||!ctx())return;var go=function(){if(!ac||done)return;var t=ac.currentTime+.05,f=2200+Math.random()*1400,n=2+(Math.random()*3|0);for(var i=0;i<n;i++)chirp(t+i*.16,f);birdT=setTimeout(go,700+Math.random()*900)};go()}
function clap(t){var len=ac.sampleRate*.12|0,b=ac.createBuffer(1,len,ac.sampleRate),d=b.getChannelData(0);for(var i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,4);var s=ac.createBufferSource(),bp=ac.createBiquadFilter(),g=ac.createGain();s.buffer=b;bp.type='bandpass';bp.frequency.value=1400;bp.Q.value=.8;g.gain.value=.35;s.connect(bp);bp.connect(g);g.connect(ac.destination);s.start(t)}
function boing(t){var o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.setValueAtTime(300,t);o.frequency.exponentialRampToValueAtTime(900,t+.18);o.frequency.exponentialRampToValueAtTime(500,t+.3);g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.0001,t+.35);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+.36)}
function hi5snd(){if(!ctx())return;var t=ac.currentTime+.01;clap(t);clap(t+.09);clap(t+.2);boing(t+.28)}
birds();el.addEventListener('pointerdown',birds,{once:true});
setTimeout(function(){if(!done)el.classList.add('go')},6500);setTimeout(end,12000);
})();
