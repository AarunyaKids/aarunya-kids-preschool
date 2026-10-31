(function(){var el=document.getElementById('aIntro');if(!el)return;
var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var K='aarunya_intro_seen',ss=null;try{ss=window.sessionStorage}catch(e){}
var qs=location.search||'',skip=/[?&]from=logout/.test(qs);
try{if(ss&&ss.getItem(K))skip=true}catch(e){}
try{var r=document.referrer;if(r&&new URL(r).origin===location.origin)skip=true}catch(e){}
if(/[?&]from=logout/.test(qs)&&history.replaceState){try{history.replaceState(null,'',location.pathname+location.hash)}catch(e){}}
function mark(){try{ss&&ss.setItem(K,'1')}catch(e){}}
if(rm||skip){mark();el.remove();return}mark();
var AC=window.AudioContext||window.webkitAudioContext,ac=null,birdT=null;
function ctx(){if(!AC)return null;if(!ac){try{ac=new AC()}catch(e){return null}}if(ac.state==='suspended')ac.resume();return ac}
function chirp(t,f){var o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*1.6,t+.07);o.frequency.exponentialRampToValueAtTime(f*1.1,t+.12);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.035,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.14);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+.15)}
function birds(){if(birdT||!ctx())return;var go=function(){if(!ac||done)return;var t=ac.currentTime+.05,f=2200+Math.random()*1400,n=2+(Math.random()*3|0);for(var i=0;i<n;i++)chirp(t+i*.16,f);birdT=setTimeout(go,700+Math.random()*900)};go()}
function clap(t){var len=ac.sampleRate*.12|0,b=ac.createBuffer(1,len,ac.sampleRate),d=b.getChannelData(0);for(var i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,4);var s=ac.createBufferSource(),bp=ac.createBiquadFilter(),g=ac.createGain();s.buffer=b;bp.type='bandpass';bp.frequency.value=1400;bp.Q.value=.8;g.gain.value=.35;s.connect(bp);bp.connect(g);g.connect(ac.destination);s.start(t)}
function boing(t){var o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.setValueAtTime(300,t);o.frequency.exponentialRampToValueAtTime(900,t+.18);o.frequency.exponentialRampToValueAtTime(500,t+.3);g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.0001,t+.35);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+.36)}
function hi5snd(){if(!ctx())return;var t=ac.currentTime+.01;clap(t);clap(t+.09);clap(t+.2);boing(t+.28)}
el.style.display='block';var done=false;function end(){if(done)return;done=true;clearTimeout(birdT);el.classList.add('out');setTimeout(function(){el.remove()},700)}
birds();el.addEventListener('pointerdown',birds,{once:true});
setTimeout(function(){if(!done)el.classList.add('go')},6500);setTimeout(end,12000);
var sk=el.querySelector('.skip');if(sk)sk.addEventListener('click',end);
document.addEventListener('keydown',function(k){if(k.key==='Escape')end()});})();
