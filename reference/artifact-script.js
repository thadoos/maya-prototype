(function(){
"use strict";
const $ = (s, r=document) => r.querySelector(s);
const app = $('#app');
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- icons ---------- */
const P = {
  chat:'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  journey:'<path d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3z"/><path d="M9 4v13M15 7v13"/>',
  results:'<path d="M3 3v18h18"/><path d="M7 16v-4M12 16V8M17 16v-7"/>',
  info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  settings:'<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  keyboard:'<rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M18 13h.01M10 13h4M7 16h10"/>',
  history:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  mic:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/>',
  send:'<path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
  back:'<path d="M19 12H5M12 19l-7-7 7-7"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  eye:'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  hand:'<path d="M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-6-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
  switcher:'<rect x="3" y="7" width="18" height="10" rx="5"/><circle cx="16" cy="12" r="2.5"/>',
  up:'<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>',
  down:'<g transform="rotate(180 12 12)"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></g>',
  book:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  out:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
  me:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  home:'<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  bolt:'<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
  people:'<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M16 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/>',
  palette:'<circle cx="12" cy="12" r="10"/><circle cx="8" cy="10" r="1.5"/><circle cx="12" cy="7" r="1.5"/><circle cx="16" cy="10" r="1.5"/>',
  leaf:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
  steps:'<path d="M4 6h16M4 12h10M4 18h6"/>'
};
const ic = (n, extra='') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${P[n]}</svg>`;
const googleLogo = `<svg class="logo" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.6 5.4 2.6 13.3l7.8 6C12.3 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z"/><path fill="#FBBC05" d="M10.4 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.3.8-4.7l-7.8-6C1 16.5 0 20.1 0 24s1 7.5 2.6 10.7l7.8-6z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.8-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.7-4.1-13.6-9.8l-7.8 6C6.6 42.6 14.6 48 24 48z"/></svg>`;
const msLogo = `<svg class="logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="#F25022" d="M1 1h10v10H1z"/><path fill="#7FBA00" d="M13 1h10v10H13z"/><path fill="#00A4EF" d="M1 13h10v10H1z"/><path fill="#FFB900" d="M13 13h10v10H13z"/></svg>`;

/* ---------- mascot ---------- */
function mascot(state='idle', cls='', size, kind){ kind=kind||S.style; return kind==='formal'?mascotOwl(state,cls,size):mascotCute(state,cls,size); }
function mascotCute(state='idle', cls='', size){
  return `<div class="mascot ${cls}" data-kind="cute" data-state="${state}" ${size?`style="--ms:${size}"`:''} aria-hidden="true"><svg viewBox="0 0 200 210">
  <ellipse class="msh" cx="100" cy="198" rx="54" ry="8"/>
  <g class="m-jump"><g class="m-bob">
    <g class="m-sprout"><path d="M100 54 C100 42 102 33 106 25" fill="none" stroke="var(--m-leaf)" stroke-width="5" stroke-linecap="round"/>
      <path class="ml" d="M105 27 C112 12 128 10 135 14 C131 27 117 33 105 27Z"/><path class="ml" d="M103 33 C94 22 80 22 75 26 C81 37 96 39 103 33Z" opacity=".8"/></g>
    <g class="m-arm m-arm-l"><ellipse class="mb" cx="37" cy="134" rx="12" ry="20" transform="rotate(20 37 134)"/></g>
    <g class="m-arm m-arm-r"><ellipse class="mb" cx="163" cy="134" rx="12" ry="20" transform="rotate(-20 163 134)"/></g>
    <path class="mb" d="M100 50 C150 50 170 88 170 128 C170 168 140 190 100 190 C60 190 30 168 30 128 C30 88 50 50 100 50Z"/>
    <ellipse class="mbl" cx="100" cy="154" rx="44" ry="29"/>
    <g class="m-brows"><path class="mstroke" d="M64 88 L86 95"/><path class="mstroke" d="M136 88 L114 95"/></g>
    <g class="m-eyes">
      <g class="eye-open"><ellipse class="mi" cx="77" cy="112" rx="11" ry="14"/><circle class="mh" cx="81" cy="106" r="4.3"/><ellipse class="mi" cx="123" cy="112" rx="11" ry="14"/><circle class="mh" cx="127" cy="106" r="4.3"/></g>
      <g class="eye-happy"><path class="mstroke" d="M65 115 Q77 100 89 115"/><path class="mstroke" d="M111 115 Q123 100 135 115"/></g>
      <g class="eye-closed"><path class="mstroke" d="M65 110 Q77 120 89 110"/><path class="mstroke" d="M111 110 Q123 120 135 110"/></g>
    </g>
    <ellipse class="mc" cx="59" cy="132" rx="11" ry="7"/><ellipse class="mc" cx="141" cy="132" rx="11" ry="7"/>
    <path class="mouth-smile mstroke" d="M90 132 Q100 142 110 132"/>
    <path class="mouth-open mi" d="M87 130 L113 130 Q112 149 100 149 Q88 149 87 130Z"/>
    <ellipse class="mouth-o mi" cx="100" cy="137" rx="6" ry="7"/>
    <path class="mouth-flat mstroke" d="M91 138 Q100 133 109 138"/>
    <g class="m-hands"><ellipse class="mhand" cx="75" cy="113" rx="19" ry="17"/><ellipse class="mhand" cx="125" cy="113" rx="19" ry="17"/></g>
    <g class="m-doc">
      <g class="m-steth"><path class="m-tube" d="M46 116 Q52 164 100 164 Q148 164 154 116"/><path class="m-tube" d="M100 164 Q100 182 114 182"/><circle class="m-mir" cx="120" cy="182" r="9"/><circle class="m-mir-in" cx="120" cy="182" r="3.5"/></g>
      <g class="m-mirror"><path class="m-band" d="M46 86 Q100 58 154 86"/><circle class="m-mir" cx="122" cy="70" r="23"/><circle class="m-mir-in" cx="122" cy="70" r="8.3"/><path class="m-mir-hi" d="M109.3 65.4 a13.8 13.8 0 0 1 10.3 -9.2"/></g></g>
  </g></g>
  <g class="m-dots"><circle class="mdot" cx="152" cy="50" r="5"/><circle class="mdot" cx="167" cy="35" r="7"/><circle class="mdot" cx="185" cy="17" r="9"/></g>
  <g class="m-zzz"><text class="mz" x="142" y="52" font-size="22">z</text><text class="mz" x="160" y="30" font-size="30">z</text></g>
  <g class="m-spark"><path class="mspark" d="M30 40 l5 11 11 5 -11 5 -5 11 -5 -11 -11 -5 11 -5z"/><path class="mheart" d="M165 40c4-8 16-6 14 3-1 6-14 13-14 13s-13-7-14-13c-2-9 10-11 14-3z"/><path class="mspark" d="M172 100 l4 8 8 4 -8 4 -4 8 -4 -8 -8 -4 8 -4z"/></g>
  <g class="m-cross"><path class="xbg" d="M28 34 L172 186"/><path class="xbg" d="M172 34 L28 186"/><path class="xfg" d="M28 34 L172 186"/><path class="xfg" d="M172 34 L28 186"/></g>
  </svg></div>`;
}
function mascotOwl(state='idle', cls='', size){
  return `<div class="mascot ${cls}" data-kind="formal" data-state="${state}" ${size?`style="--ms:${size}"`:''} aria-hidden="true"><svg viewBox="0 0 200 210">
  <ellipse class="msh" cx="100" cy="201" rx="50" ry="7"/>
  <g class="m-jump"><g class="m-bob">
    <g class="m-sprout"><path class="ob" d="M52 76 L46 34 L86 56Z"/><path class="ob" d="M148 76 L154 34 L114 56Z"/></g>
    <g class="m-arm m-arm-l"><path class="ow" d="M44 104 C26 126 28 166 52 184 C54 152 56 128 62 108Z"/></g>
    <g class="m-arm m-arm-r"><path class="ow" d="M156 104 C174 126 172 166 148 184 C146 152 144 128 138 108Z"/></g>
    <path class="ob" d="M100 46 C142 46 160 68 160 102 L160 150 C160 178 134 194 100 194 C66 194 40 178 40 150 L40 102 C40 68 58 46 100 46Z"/>
    <ellipse class="obl" cx="100" cy="152" rx="40" ry="36"/>
    <path class="ofe" d="M80 142 q6 6 12 0 M96 142 q6 6 12 0 M112 142 q6 6 12 0 M88 158 q6 6 12 0 M104 158 q6 6 12 0 M96 174 q6 6 12 0"/>
    <circle class="of" cx="76" cy="100" r="25"/><circle class="of" cx="124" cy="100" r="25"/>
    <g class="m-brows"><path class="mstroke" d="M58 72 L90 80"/><path class="mstroke" d="M142 72 L110 80"/></g>
    <g class="m-eyes">
      <g class="eye-open"><circle class="mi" cx="76" cy="101" r="10"/><circle class="mh" cx="79.5" cy="97.5" r="3.4"/><circle class="mi" cx="124" cy="101" r="10"/><circle class="mh" cx="127.5" cy="97.5" r="3.4"/></g>
      <g class="eye-happy"><path class="mstroke" d="M65 104 Q76 95 87 104"/><path class="mstroke" d="M113 104 Q124 95 135 104"/></g>
      <g class="eye-closed"><path class="mstroke" d="M65 100 Q76 108 87 100"/><path class="mstroke" d="M113 100 Q124 108 135 100"/></g>
    </g>
    <circle class="ospec" cx="76" cy="100" r="21"/><circle class="ospec" cx="124" cy="100" r="21"/><path class="ospec" d="M97 97 Q100 92 103 97"/>
    <path class="mouth-smile obk" d="M92 120 L108 120 L100 134Z"/>
    <g class="mouth-open"><path class="obk" d="M92 119 L108 119 L100 127Z"/><path class="obk" d="M94 130 L106 130 L100 137Z"/></g>
    <g class="mouth-o"><path class="obk" d="M92 119 L108 119 L100 127Z"/><path class="obk" d="M94 130 L106 130 L100 137Z"/></g>
    <path class="mouth-flat obk" d="M92 121 L108 121 L100 132Z"/>
    <g class="m-hands"><ellipse class="ow" cx="76" cy="100" rx="27" ry="22"/><ellipse class="ow" cx="124" cy="100" rx="27" ry="22"/></g>
    <rect class="obk" x="80" y="189" width="14" height="8" rx="4"/><rect class="obk" x="106" y="189" width="14" height="8" rx="4"/>
    <g class="m-doc">
      <g class="m-steth"><path class="m-tube" d="M44 112 Q50 154 100 154 Q150 154 156 112"/><path class="m-tube" d="M100 154 Q100 174 110 174"/><circle class="m-mir" cx="116" cy="174" r="9"/><circle class="m-mir-in" cx="116" cy="174" r="3.5"/></g>
      <g class="m-mirror"><path class="m-band" d="M42 74 Q100 48 158 74"/><circle class="m-mir" cx="100" cy="52" r="20"/><circle class="m-mir-in" cx="100" cy="52" r="7.2"/><path class="m-mir-hi" d="M89.0 48.0 a12.0 12.0 0 0 1 9.0 -8.0"/></g></g>
  </g></g>
  <g class="m-dots"><circle class="mdot" cx="156" cy="50" r="5"/><circle class="mdot" cx="170" cy="35" r="7"/><circle class="mdot" cx="186" cy="17" r="9"/></g>
  <g class="m-zzz"><text class="mz" x="146" y="50" font-size="22">z</text><text class="mz" x="164" y="28" font-size="30">z</text></g>
  <g class="m-spark"><path class="mspark" d="M170 36 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4z"/></g>
  <g class="m-cross"><path class="xbg" d="M28 34 L172 186"/><path class="xbg" d="M172 34 L28 186"/><path class="xfg" d="M28 34 L172 186"/><path class="xfg" d="M172 34 L28 186"/></g>
  </svg></div>`;
}
const timers = new WeakMap();
function setMascot(el, state, ms, after='idle'){
  if(!el) return;
  clearTimeout(timers.get(el));
  el.dataset.state = state;
  if(ms) timers.set(el, setTimeout(()=>{ if(el.isConnected) el.dataset.state = after; }, ms));
}
const words = s => reduced ? esc(s) : esc(s).split(' ').map((w,i)=>`<span class="word" style="animation-delay:${i*45}ms">${w}</span>`).join(' ');

const nm = h => (S.style==='formal' ? h.replace(/Maya/g,'Rowan') : h).replace(/\bSam\b/g, esc(S.name));
function setStyle(k){ S.style=k; document.documentElement.dataset.style=k; }
/* ---------- state ---------- */
const S = {
  style:'cute', screen:'login', onboarded:false, name:'Sam', email:'sam.taylor@example.com',
  role:null, control:null, topics:new Set(['fatigue','isolated','calm']),
  step:0, featureShown:0, practiced:false,
  dwell:{on:false, ms:1100}, textSize:'m',
  msgs:[], thinking:false, listening:false, greeted:false, greetTime:''
};
function toast(t){ const el=$('#toast'); el.textContent=t; el.classList.add('show'); clearTimeout(toast.t); toast.t=setTimeout(()=>el.classList.remove('show'),2600); }
function go(screen){
  S.screen = screen;
  document.querySelectorAll('.proto [data-go]').forEach(b=>b.setAttribute('aria-current', b.dataset.go===screen));
  try{ if(location.hash.slice(1)!==screen) history.replaceState(null,'','#'+screen); }catch(e){}
  closeOverlay();
  if(screen==='login') renderLogin();
  else if(screen==='onboarding'){ S.step=0; S.featureShown=0; S.practiced=false; renderOb(); }
  else if(screen==='home') renderHome();
  else renderChat();
  app.firstElementChild && app.firstElementChild.scrollTo(0,0);
}
function confetti(){
  if(reduced || S.style==='formal') return;
  const c=document.createElement('div'); c.className='confetti';
  const cols=['var(--sun)','var(--teal)','var(--m-cheek)','var(--m-leaf)','var(--m-body)'];
  for(let i=0;i<46;i++){ const p=document.createElement('i'); p.style.left=Math.random()*100+'%'; p.style.background=cols[i%cols.length];
    p.style.animationDelay=(Math.random()*.6)+'s'; p.style.animationDuration=(2+Math.random()*1.4)+'s'; p.style.borderRadius=i%3?'4px':'50%'; c.appendChild(p); }
  document.body.appendChild(c); setTimeout(()=>c.remove(),4200);
}

/* ---------- LOGIN ---------- */
function renderLogin(){
  app.innerHTML = `<section class="screen"><div class="login gutter">
    <div class="login-peek">
      ${mascot('wave','', '130px')}
      <div class="bubble-say peek-say" id="lsay" aria-live="polite">${words('Hello again! It’s good to see you.')}</div>
    </div>
    <form class="card" id="loginForm" novalidate>
      <div><h1>Welcome back</h1><p class="muted">Sign in to talk with Maya.</p></div>
      <button type="button" class="btn btn-soft btn-wide" data-act="sso">${googleLogo} Continue with Google</button>
      <button type="button" class="btn btn-soft btn-wide" data-act="sso">${msLogo} Continue with Microsoft</button>
      <div class="divider">or use your email</div>
      <div class="field"><label for="email">Email</label><input class="input" id="email" type="email" autocomplete="email" value="${esc(S.email)}"></div>
      <div class="field"><label for="pw">Password</label>
        <div class="input-row"><input class="input" id="pw" type="password" autocomplete="current-password" placeholder="Your password">
        <button type="button" class="btn btn-soft" id="showPw" aria-pressed="false">${ic('eye')}<span>Show</span></button></div>
        <p class="err" id="pwErr" aria-live="polite"></p>
      </div>
      <button type="submit" class="btn btn-primary btn-wide">Sign in</button>
      <button type="button" class="btn btn-ghost btn-wide" data-act="new">New to Maya? Create an account</button>
    </form>
  </div></section>`;
  const m = $('.login-peek .mascot'), say=$('#lsay'), pw=$('#pw');
  setTimeout(()=>{ if(m.isConnected && m.dataset.state==='wave') m.dataset.state='idle'; }, 3200);
  const talk = t => { say.innerHTML = words(t); };
  $('#email').addEventListener('focus',()=>{ setMascot(m,'idle'); m.dataset.look='down'; talk('That’s the email you joined with.'); });
  $('#email').addEventListener('blur',()=>{ delete m.dataset.look; });
  pw.addEventListener('focus',()=>{ if(pw.type==='password'){ setMascot(m,'shy'); talk('Don’t worry, I won’t peek!'); } });
  pw.addEventListener('blur',()=>{ setMascot(m,'idle'); });
  pw.addEventListener('input',()=>{ $('#pwErr').textContent=''; });
  $('#showPw').addEventListener('click',e=>{
    const b=e.currentTarget, show = pw.type==='password';
    pw.type = show?'text':'password'; b.setAttribute('aria-pressed',show); b.querySelector('span').textContent = show?'Hide':'Show';
    if(show){ setMascot(m,'idle'); m.dataset.look='down'; talk('Okay, I’ll help you check it.'); } else { delete m.dataset.look; setMascot(m,'shy'); talk('Eyes closed again.'); }
  });
  const success = () => { setMascot(m,'celebrate'); talk('Yay, you’re in!'); setTimeout(()=>go(S.onboarded?'home':'onboarding'), 1100); };
  $('#loginForm').addEventListener('submit',e=>{
    e.preventDefault();
    success();
  });
  app.querySelectorAll('[data-act="sso"]').forEach(b=>b.addEventListener('click',success));
  $('[data-act="new"]').addEventListener('click',()=>{ S.onboarded=false; go('onboarding'); });
}

/* ---------- ONBOARDING ---------- */
const TOPICS = [
  ['fatigue','Energy & tiredness','bolt'],['falls','Safety at home','home'],['isolated','Feeling connected','people'],
  ['independent','Staying independent','hand'],['hobbies','Hobbies I love','palette'],['care','Care options','steps'],
  ['calm','Calmer days','leaf'],['others','Helping others','heart']
];
const FEATURES = [
  ['shield','Answers you can trust','I use verified ALS/MND research, and I always show you where my information came from.'],
  ['journey','Your Journey, kept safe','What matters to you builds into a Journey you and your care team can look back on.'],
  ['heart','Someone to talk to','On hard days I’m here to listen, with no rush and no judgement.']
];
const HELP_SAY = ['Can I show you how I can help?','First, you can rely on what I tell you.','I’ll also help you keep track of things.','And I’m always here to talk.'];
const STEPS = ['style','name','hello','who','control','help','promise','topics','ready'];

function renderOb(){
  const id = STEPS[S.step];
  const n = STEPS.length-1;
  let say='', small='', state='idle', actions='';
  const firstName = S.name;
  switch(id){
    case 'name':
      say='Hi! I’m Maya. What should I call you?'; small='Your first name or a nickname is perfect.'; state='wave';
      actions=`<div class="field"><label for="obName">Your name</label><input class="input" id="obName" autocomplete="given-name" maxlength="30" value="${esc(S.nameSet?S.name:'')}" placeholder="For example, Sam"></div>
        <p class="err" id="nameErr" aria-live="polite"></p>
        <button class="btn btn-primary btn-wide" data-act="saveName">Continue</button>`; break;
    case 'style':
      say='Who would you like by your side?'; small='Pick a companion. You can change this any time in Settings.';
      actions=`<div class="choice-grid">
        <button class="choice style-card" data-style-pick="cute" aria-pressed="${S.style==='cute'}">${mascot('happy','',null,'cute')}<span><b>M&#97;ya</b><span class="d">A cheerful little sprout</span><span class="tag">Bright, warm colours with playful motion</span></span></button>
        <button class="choice style-card" data-style-pick="formal" aria-pressed="${S.style==='formal'}">${mascot('idle','',null,'formal')}<span><b>Rowan</b><span class="d">A wise old owl in spectacles</span><span class="tag">Calm navy and brass with gentle motion</span></span></button>
      </div>
      <button class="btn btn-primary btn-wide" data-act="next">Continue with ${S.style==='formal'?'Rowan':'M&#97;ya'}</button>`; break;
    case 'hello':
      say=`Lovely to meet you, ${firstName}!`; small='I’m a companion for life with ALS and MND. I’ll help you find good information and keep track of what matters to you.'; state='wave';
      actions=`<button class="btn btn-primary btn-wide" data-act="next">${'Nice to meet you, Maya'}</button>`; break;
    case 'who':
      say='Who are we doing this for?'; small='This helps me choose the right words and suggestions.'; state='idle';
      actions=`<div class="choice-grid">
        <button class="choice" data-role="self" aria-pressed="${S.role==='self'}"><span class="ic">${ic('me')}</span><span><b>For myself</b><span class="d">I’m living with ALS/MND</span></span></button>
        <button class="choice" data-role="carer" aria-pressed="${S.role==='carer'}"><span class="ic">${ic('people')}</span><span><b>For someone I support</b><span class="d">I’m a carer, partner or family</span></span></button>
      </div>`; break;
    case 'control':
      if(!S.control){ say='How do you usually use your screen?'; small='I’ll adjust myself so everything is comfortable to reach.'; state='idle';
        actions=`<div class="choice-grid three">
          <button class="choice" data-ctl="touch"><span class="ic">${ic('hand')}</span><span><b>Touch, mouse or keyboard</b><span class="d">Tap, click or press to choose</span></span></button>
          <button class="choice" data-ctl="eye"><span class="ic">${ic('eye')}</span><span><b>Eye tracking</b><span class="d">Look at something to choose it</span></span></button>
          <button class="choice" data-ctl="speech"><span class="ic">${ic('mic')}</span><span><b>Speech</b><span class="d">Speak instead of typing</span></span></button>
        </div>`;
      } else if(S.control==='eye'){
        say = S.practiced ? 'You did it! That was perfect.' : 'Let’s practise together.';
        small = S.practiced ? 'If it felt too quick or too slow, change the speed below. You can change this any time in Settings.' : 'Rest your eyes on the sun until it fills up. Little wobbles are fine, I’ll wait for you.';
        state = S.practiced ? 'celebrate' : 'idle';
        actions=`<div class="practice"><button class="sunbtn ${S.practiced?'done':''}" data-act="practice">${S.practiced?'Done!':'Look here'}</button></div>
          <div class="seg" role="group" aria-label="Selection speed">${speedBtns()}</div>
          <div class="row"><button class="btn btn-soft" data-act="rectl">Change how I use my screen</button><button class="btn btn-primary" data-act="next">Continue</button></div>`;
      } else if(S.control==='speech'){
        say='Lovely, I’ll keep the microphone close by.'; small='In chat, the microphone sits right next to the message box. Select it and speak whenever you like.'; state='listen';
        actions=`<div class="row"><button class="btn btn-soft" data-act="rectl">Go back a step</button><button class="btn btn-primary" data-act="next">Continue</button></div>`;
      } else {
        say='Great, I’ll keep everything big and easy to reach.'; small='If you ever want to try eye tracking, you can turn on Look to select in Settings.'; state='happy';
        actions=`<div class="row"><button class="btn btn-soft" data-act="rectl">Go back a step</button><button class="btn btn-primary" data-act="next">Continue</button></div>`;
      }
      break;
    case 'help':
      say = HELP_SAY[S.featureShown];
      small=''; state = S.featureShown===3?'happy':'idle';
      actions = `<div class="feat-list" id="featList">${FEATURES.slice(0,S.featureShown).map((f,i)=>featureHTML(f, i<S.featureShown-1 ? 'seen' : '')).join('')}</div>`
        + (S.featureShown<3 ? `<button class="btn btn-sun btn-wide" data-act="more">${S.featureShown===0?'Show me':'Show me more'}</button>`
                            : `<button class="btn btn-primary btn-wide" data-act="next">Sounds good</button>`);
      break;
    case 'promise':
      say='One honest thing before we start.'; small='I’m not a doctor. For medical decisions, your care team always comes first, and I’ll tell you when something needs them.'; state=reduced?'concern':'idle';
      actions=`<div class="feature" style="animation-delay:.1s"><span class="ic">${ic('shield')}</span><span><b>Your chats stay private</b>Only you can see them, unless you choose to share with someone you trust.</span></div>
        <button class="btn btn-primary btn-wide" data-act="next">I understand</button>`; break;
    case 'topics':
      say='What’s been on your mind lately?'; small='Pick as many as you like. I’ll keep these ready for you.'; state='think';
      actions=`<div class="chips">${TOPICS.map(t=>`<button class="chip" data-topic="${t[0]}" aria-pressed="${S.topics.has(t[0])}">${ic('plus','class="off"')}${ic('check','class="on"')}${t[1]}</button>`).join('')}</div>
        <button class="btn btn-primary btn-wide" data-act="next">${S.topics.size?'Continue':'Not sure yet, continue'}</button>`; break;
    case 'ready':
      say=`I’m so glad you’re here, ${firstName}.`; small='Whenever you’re ready, I am too.'; state='celebrate';
      actions=`<button class="btn btn-sun btn-wide" data-act="finish">${ic('heart')} Let’s get started</button>`; break;
  }
  const dots = Array.from({length:n},(_,i)=>`<i class="${i+1<S.step?'done':i+1===S.step?'now':''}"></i>`).join('');
  app.innerHTML = nm(`<section class="screen"><div class="ob gutter${id==='help'||id==='topics'?' help-step':''}">
    <div class="ob-top${S.step===0?' first':''}">
      <button class="btn btn-soft" data-act="back" aria-label="Back" ${S.step===0?'style="visibility:hidden"':''}>${ic('back')}<span class="lbl">Back</span></button>
      <div class="dots" role="progressbar" aria-label="Getting started" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${S.step}">${S.step>0?dots:''}</div>
    </div>
    <div class="ob-body ${id==='style'?'single':''}">
      ${id==='style'?'':`<div class="ob-mascot">${mascot(state, id==='promise'?'doc':'', '300px')}</div>`}
      <div class="ob-right">
        <div class="bubble-say" aria-live="polite">${words(say)}${small?`<small>${esc(small)}</small>`:''}</div>
        <div class="ob-actions">${actions}</div>
      </div>
    </div>
  </div></section>`);
  if(id==='ready') confetti();
  if(id==='name'){ const i=$('#obName'); i.focus(); i.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); saveName(); } }); i.addEventListener('input',()=>{ $('#nameErr').textContent=''; }); }
  if(id==='hello') setTimeout(()=>{ const m=$('.ob-mascot .mascot'); if(m && m.dataset.state==='wave') m.dataset.state='happy'; }, 3000);
  if(id==='promise' && !reduced){ const m=$('.ob-mascot .mascot');   // proud in the costume, then a little sheepish once it is crossed out
    setTimeout(()=>{ if(m.isConnected) setMascot(m,'happy',1500,'concern'); }, 700); }
  fitOb();
  const fl=$('#featList')||$('.help-step .chips'); if(fl){ const u=()=>fl.classList.toggle('faded', fl.scrollTop>2); fl.addEventListener('scroll',u,{passive:true}); u(); }
}
/* Fit each onboarding step on one screen: shrink Maya step by step, and on phones, if that is not
   enough, sit her beside her speech bubble instead of above it. */
function fitOb(){
  const sc=app.firstElementChild, body=$('.ob-body'), m=$('.ob-mascot .mascot'); if(!sc || !body) return;
  const mobile=matchMedia('(max-width:860px)').matches;
  const over=()=>sc.scrollHeight > sc.clientHeight + 1;
  if(!m){   // companion picker: shrink the two mascots, then put the cards side by side with less text
    const grid=$('.ob-actions .choice-grid'), ms=[...document.querySelectorAll('.style-card .mascot')]; if(!grid || !ms.length) return;
    const setAll=px=>ms.forEach(x=>x.style.setProperty('--ms',px+'px'));
    grid.classList.remove('pick-compact');
    for(const px of [130,105,85]){ setAll(px); if(!over()) return; }
    grid.classList.add('pick-compact');
    for(const px of [90,72,58]){ setAll(px); if(!over()) return; }
    return;
  }
  const set=px=>m.style.setProperty('--ms', px+'px');
  body.classList.remove('compact'); body.closest('.ob').classList.remove('tight');
  if(mobile && body.closest('.help-step')){ body.classList.add('compact'); set(96); return; }   // keep Maya small and fixed; the list scrolls under her
  const sizes = mobile ? [170,140,115] : [300,250,210,175,150];
  for(const px of sizes){ set(px); if(!over()) return; }
  if(!mobile) return;
  body.classList.add('compact');
  for(const px of [110,92,76,64,52]){ set(px); if(!over()) return; }
  body.closest('.ob').classList.add('tight');   // last resort: option cards drop their second line
}
let fitT=0; addEventListener('resize',()=>{ clearTimeout(fitT); fitT=setTimeout(()=>{ if(S.screen==='onboarding') fitOb(); },150); });
function speedBtns(){
  return [['Relaxed',1600],['Steady',1100],['Quick',700]].map(([l,ms])=>`<button class="btn btn-soft" data-speed="${ms}" aria-pressed="${S.dwell.ms===ms}">${l}</button>`).join('');
}
function saveName(){
  const v=$('#obName').value.trim();
  if(!v){ $('#nameErr').textContent='Type your name, then select Continue.'; $('#obName').focus(); return; }
  S.name=v; S.nameSet=true; obNext();
}
function featureHTML(f, cls){ return `<div class="feature ${cls}"><span class="ic">${ic(f[0])}</span><span><b>${f[1]}</b>${f[2]}</span></div>`; }
/* Reveal the next feature in place: the current card dims, everything glides up (FLIP), the new card grows in */
function revealFeature(){
  const right=$('.ob-right'), list=$('#featList'), btn=$('[data-act="more"]');
  if(!right || !list || !btn) return;
  const els=[...right.querySelectorAll('.bubble-say, .feature, [data-act="more"]')];
  const before=new Map(els.map(e=>[e, e.getBoundingClientRect().top]));
  S.featureShown++;
  const prev=list.lastElementChild; if(prev){ prev.classList.remove('new'); prev.classList.add('seen'); }
  list.insertAdjacentHTML('beforeend', featureHTML(FEATURES[S.featureShown-1], 'new'));
  $('.bubble-say').innerHTML = nm(words(HELP_SAY[S.featureShown]));
  if(S.featureShown===3){ btn.className='btn btn-primary btn-wide'; btn.dataset.act='next'; btn.textContent='Sounds good'; setMascot($('.ob-mascot .mascot'),'happy'); }
  else btn.textContent='Show me more';
  // If the new card pushed the button below the fold, bring it back into view once the card has settled.
  setTimeout(()=>list.scrollTo({top:list.scrollHeight, behavior:reduced?'auto':'smooth'}), reduced?0:380);
  const scroller=btn.closest('.screen');
  setTimeout(()=>{ const r=btn.getBoundingClientRect(), sr=scroller.getBoundingClientRect();
    if(r.bottom > sr.bottom - 16) scroller.scrollBy({top:r.bottom - sr.bottom + 32, behavior:reduced?'auto':'smooth'}); }, reduced?0:380);
  if(reduced || !Element.prototype.animate) return;
  els.forEach(e=>{
    const dy=before.get(e)-e.getBoundingClientRect().top;
    if(Math.abs(dy)>.5) e.animate([{transform:`translateY(${dy}px)`},{transform:'translateY(0)'}],{duration:520,easing:'cubic-bezier(.2,.8,.2,1)',composite:'add'});
  });
}
function obNext(){ S.step=Math.min(S.step+1,STEPS.length-1); renderOb(); }

app.addEventListener('click',e=>{
  if(S.screen!=='onboarding') return;
  const b=e.target.closest('button'); if(!b) return;
  const a=b.dataset.act;
  if(a==='saveName') saveName();
  else if(b.dataset.stylePick){ setStyle(b.dataset.stylePick); renderOb(); }
  else if(a==='next') obNext();
  else if(a==='back'){ if(STEPS[S.step]==='control' && S.control){ S.control=null; S.practiced=false; } else if(STEPS[S.step]==='help' && S.featureShown>0){ S.featureShown=0; } else S.step=Math.max(0,S.step-1); renderOb(); }
  else if(a==='skip'){ S.onboarded=true; go('home'); }
  else if(a==='more') revealFeature();
  else if(a==='rectl'){ S.control=null; S.practiced=false; setDwell(false); renderOb(); }
  else if(a==='practice'){ if(!S.practiced){ S.practiced=true; confetti(); renderOb(); } }
  else if(a==='finish'){ S.onboarded=true; go('home'); }
  else if(b.dataset.role){ S.role=b.dataset.role; app.querySelectorAll('[data-role]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const g=b.closest('.choice-grid'); g.classList.add('picked'); g.querySelectorAll('button').forEach(x=>x.disabled=true); b.querySelector('.ic').innerHTML=ic('check');
    const m=$('.ob-mascot .mascot'); setMascot(m,'happy');
    $('.bubble-say').innerHTML = words(S.role==='self'?'Then we’re a team, you and me.':'They’re lucky to have you. Let’s look after you both.');
    setTimeout(obNext,1500); }
  else if(b.dataset.ctl){ S.control=b.dataset.ctl; setDwell(S.control==='eye'); renderOb(); }
  else if(b.dataset.speed){ S.dwell.ms=+b.dataset.speed; app.querySelectorAll('[data-speed]').forEach(x=>x.setAttribute('aria-pressed',x===b)); }
  else if(b.dataset.topic){ const t=b.dataset.topic; S.topics.has(t)?S.topics.delete(t):S.topics.add(t); b.setAttribute('aria-pressed',S.topics.has(t));
    const nb=app.querySelector('[data-act="next"]'); if(nb) nb.textContent = S.topics.size?'Continue':'Not sure yet, continue';
    const m=$('.ob-mascot .mascot'); setMascot(m,'happy',900,'think'); }
});

/* ---------- CHAT ---------- */
const STARTERS = {
  fatigue:['I get tired and need a daily pacing plan','bolt'], falls:['What home changes reduce fall risk?','home'],
  isolated:['How can I feel less isolated?','people'], independent:['I want to stay independent as mobility changes','hand'],
  hobbies:['What hobbies can I adapt as things change?','palette'], care:['Explain my care options in simple steps','steps'],
  calm:['Help me feel calmer on a difficult day','leaf'], others:['How can I support other people with ALS?','heart']
};
const SRC_MND = 'MND Association: Fatigue and MND (information sheet)';
const SRC_NICE = 'NICE guideline NG42: Motor neurone disease, assessment and management';
const R = {
  tired:{parts:[['p','Thank you for telling me. Tiredness with MND is real, and it isn’t something you have to push through.'],['p','Would a gentle pacing plan help, or would you rather just talk for a bit?']],
    choices:[['Make a pacing plan','pacing'],['Just talk for a bit','chat'],['Something calming','calm']]},
  pacing:{parts:[['p','Here’s a gentle plan to try. Change anything that doesn’t fit your day.'],
    ['ul',['Morning: do the one task that matters most while your energy is highest.','Late morning: rest for 20 minutes, even if you don’t sleep.','Afternoon: keep to light activities, and sit for tasks you’d usually stand for.','Evening: set things out for tomorrow so the morning starts easier.']],
    ['p','Many people find it helps to note their energy each day. I can add a quick check-in to your Journey.']],
    sources:[SRC_MND,SRC_NICE], choices:[['Add a daily check-in','checkin'],['Tips to save energy','energy'],['That helps, thank you','thanks']]},
  energy:{parts:[['p','A few small changes can save a lot of energy:'],['ul',['Keep things you use every day between waist and shoulder height.','Use a perching stool in the kitchen or bathroom.','Spread heavier jobs across the week rather than one day.','Ask an occupational therapist about equipment that could help.']]],
    sources:[SRC_MND], choices:[['Add a daily check-in','checkin'],['That helps, thank you','thanks']]},
  falls:{parts:[['p','Small changes at home can make a real difference to safety:'],['ul',['Clear walkways and remove loose rugs and trailing cables.','Add grab rails by the toilet, bath and stairs.','Use night lights between the bedroom and bathroom.','Ask your care team for a home assessment by an occupational therapist.']]],
    sources:[SRC_NICE,'MND Association: Equipment and home adaptations'], choices:[['How do I get a home assessment?','care'],['That helps, thank you','thanks']]},
  isolated:{parts:[['p','Feeling isolated is really common, and you deserve connection.'],['p','Some people find it helps to join a local MND group, try online communities, or set up one regular call each week with someone they trust.'],['p','Would you like help with one of these?']],
    sources:['MND Association: Local groups and support'], choices:[['Find a support group','care'],['Plan a weekly call','week'],['Just talk for a bit','chat']]},
  calm:{parts:[['p','Let’s breathe together. Watch me: breathe in as I grow, and out as I get smaller.'],['breathe'],['p','Do this for as long as feels good.']],
    choices:[['That helped','thanks'],['Something else','chat']]},
  help:{parts:[['p','If you feel unsafe or in crisis, please reach out to someone right now.'],['ul',['In an emergency in the UK, call 999.','Samaritans are there day and night on 116 123.','Your MND care team can help with anything that’s worrying you.']],['p','I’ll stay right here with you.']],
    choices:[['Try something calming','calm'],['Tell Maya about it','chat']]},
  chat:{parts:[['p','I’m listening. Tell me whatever’s on your mind, in your own words. You can type below or use the microphone.']]},
  checkin:{parts:[['p','Done! I’ve added a gentle energy check-in to your Journey. I’ll ask you once each morning.']], mood:'celebrate',
    choices:[['Tips to save energy','energy'],['Thank you, Maya','thanks']]},
  thanks:{parts:[['p','Anytime, Sam. I’ll be right here whenever you need me.']], mood:'celebrate'},
  week:{parts:[['p','Let’s keep the week balanced. Pick one thing you’re looking forward to, one thing that needs doing, and one rest day.'],['p','Tell me those three and I’ll set them out for you.']]},
  care:{parts:[['p','Here’s how care usually works, step by step:'],['ul',['Your specialist MND team coordinates your care, often through a care coordinator.','Your GP can refer you to therapists such as an occupational therapist or speech and language therapist.','Social care can help with support at home. Your local council can assess what you need.']],['p','Would you like me to help you write questions for your next appointment?']],
    sources:[SRC_NICE], choices:[['Help with my questions','chat'],['That helps, thank you','thanks']]},
  generic:{parts:[['p','Thank you for sharing that with me. Let me find information that fits, from sources I trust.'],['p','In the full app I’d answer this from verified ALS/MND research. In this prototype, try one of the suggestions below.']],
    choices:[['Make a pacing plan','pacing'],['Something calming','calm'],['Safety at home','falls']]}
};
function getR(k){ return R[k]; }
const starterKey = {fatigue:'pacing',falls:'falls',isolated:'isolated',calm:'calm',care:'care',independent:'generic',hobbies:'generic',others:'generic'};
const now = () => new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
function greet(){ const h=new Date().getHours(); return h<12?'Good morning':h<18?'Good afternoon':'Good evening'; }

/* Past chats are scripted replays built from the reply bank, so opening one shows a real thread. */
const PAST = [
  {title:'Pacing plan for tired afternoons', when:'Yesterday', icon:'bolt', msgs:[['me','I’ve been feeling really tired in the afternoons'],['maya','tired'],['me','Make a pacing plan'],['maya','pacing']]},
  {title:'Feeling on my own', when:'Monday', icon:'people', msgs:[['me','How can I feel less isolated?'],['maya','isolated']]},
  {title:'Making home safer', when:'28 October', icon:'home', msgs:[['me','What home changes reduce fall risk?'],['maya','falls']]},
  {title:'How my care works', when:'21 October', icon:'steps', msgs:[['me','Explain my care options in simple steps'],['maya','care']]},
  {title:'Saving energy around the house', when:'14 October', icon:'bolt', msgs:[['me','How can I save energy around the house?'],['maya','energy']]},
  {title:'Breathing on a hard evening', when:'9 October', icon:'leaf', msgs:[['me','Help me feel calmer on a difficult day'],['maya','calm']]}
];
function preview(key){ const p=getR(key).parts.find(x=>x[0]==='p'); return p?p[1]:''; }
function histRow(i, c, now){
  const last=[...c.msgs].reverse().find(m=>m[0]==='maya');
  return `<button class="hist-row${now?' now':''}" data-open="${i}"><span class="ic">${ic(c.icon)}</span>
    <span class="txt"><b>${esc(c.title)}</b><span class="d">Maya: ${esc(last?preview(last[1]):'')}</span></span><span class="when">${c.when}</span></button>`;
}
function renderHome(){
  const date=new Date().toLocaleDateString([], {weekday:'long', day:'numeric', month:'long'});
  const first=S.msgs.find(m=>m.from==='me');
  const cur = first ? histRow('cur', {title:first.text, when:'Today', icon:'chat', msgs:S.msgs.map(m=>[m.from, m.key])}, true) : '';
  app.innerHTML = nm(`<section class="screen"><div class="home">
    <header class="home-top">
      <span class="home-brand">Maya</span>
    </header>
    <div class="home-body">
      <div class="home-hero">
        <div class="halo">${mascot('wave')}</div>
        <p class="eyebrow">${date}</p>
        <h1>${greet()}, ${esc(S.name)}.</h1>
        <p class="muted">I’m here whenever you want to talk.</p>
        <div class="home-actions">
          <button class="btn btn-primary" data-act="newchat">${ic('chat')} Start a chat</button>
          <button class="btn btn-soft" data-soon="Journey">${ic('journey')} Journey</button>
        </div>
      </div>
      <section class="home-side" aria-label="Explore and recent chats">
        <h2 class="section-label">Explore</h2>
        <div class="space-grid">
          <button class="choice" data-soon="Results"><span class="ic">${ic('results')}</span><span><b>Results</b></span></button>
          <button class="choice" data-soon="How Maya works"><span class="ic">${ic('info')}</span><span><b>How I work</b></span></button>
          <button class="choice" data-act="settings"><span class="ic">${ic('settings')}</span><span><b>Settings</b></span></button>
        </div>
        <h2 class="section-label">Pick up where you left off</h2>
        <div class="hist-list">${cur}${PAST.slice(0, cur?2:3).map((c,i)=>histRow(i,c)).join('')}</div>
        <button class="btn btn-soft btn-wide" data-act="allhist">${ic('history')} View full history</button>
      </section>
    </div>
  </div></section>`);
  setTimeout(()=>setMascot($('.home-hero .mascot'),'idle'), 1800);
}
function openAllHistory(){
  const s=overlay(`<aside class="panel" role="dialog" aria-modal="true" aria-label="All chats">
    <div class="panel-head"><h2>All your chats</h2><button class="btn btn-soft btn-icon" data-close aria-label="Close">${ic('x')}</button></div>
    <div class="hist-list">${PAST.map((c,i)=>histRow(i,c)).join('')}</div>
  </aside>`);
  s.addEventListener('click',e=>{ const b=e.target.closest('[data-open]'); if(b){ closeOverlay(); openPast(b.dataset.open); } });
}
function openPast(id){
  const c = PAST[+id]; if(!c) return;
  S.msgs = c.msgs.map(([from,v])=> from==='me' ? {from,text:v,time:c.when} : {from,key:v,time:c.when});
  S.greeted=false; S.thinking=false; go('chat');
}
function renderChat(){
  app.innerHTML = nm(`<section class="screen" style="overflow:hidden"><div class="chat">
    <div class="main">
      <header class="chat-head gutter">
        <button class="btn btn-soft back" data-nav="home" aria-label="Back to home">${ic('back')}<span class="lbl">Home</span></button>
        <button class="btn btn-soft" data-act="newchat" aria-label="New chat">${ic('plus')}<span class="lbl">New chat</span></button>
      </header>
      <div class="thread gutter" id="thread"><div class="thread-inner" id="threadIn"></div></div>
      <div class="composer-wrap gutter">
        <div class="composer-row">
            <button type="button" class="btn ${S.control==='speech'?'btn-sun':'btn-soft btn-icon'} mic" id="mic" aria-label="Speak your message" aria-pressed="false">${ic('mic')}${S.control==='speech'?'<span>Speak</span>':''}</button>
        <button type="button" class="btn btn-soft compose-open" id="openComposer">${ic('keyboard')}<span>Type to Maya</span></button>
        <form class="composer" id="composer">
          <label class="sr" for="msg">Message Maya</label>
          <textarea id="msg" rows="1" placeholder="Type to Maya, or use the microphone…"></textarea>
          <button type="submit" class="btn btn-primary btn-icon" aria-label="Send">${ic('send')}</button>
        </form>
        </div>
      </div>
    </div>
  </div></section>`);
  renderThread();
  const ta=$('#msg');
  ta.addEventListener('input',()=>{ ta.style.height='auto'; ta.style.height=Math.min(ta.scrollHeight,180)+'px'; });
  ta.addEventListener('keydown',e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); $('#composer').requestSubmit(); } });
  $('#composer').addEventListener('submit',e=>{ e.preventDefault(); const t=ta.value.trim(); if(!t||S.thinking) return; ta.value=''; ta.style.height=''; userSays(t, keyFor(t)); });
  $('#mic').addEventListener('click',toggleMic);
  // The text box only stays open while it has focus; otherwise it folds into a single "Type to Maya" button.
  const row=$('.composer-row'), openBtn=$('#openComposer');
  openBtn.addEventListener('click',()=>openComposer(true));
  ta.addEventListener('blur',()=>setTimeout(()=>{ if(document.activeElement!==ta && !S.listening && row.isConnected && row.classList.contains('open')){
    openBtn.querySelector('span').textContent = ta.value.trim() ? 'Continue your message' : nm('Type to Maya'); morphComposer(false); } },0));
  // Keep focus in the text box when pressing Send or the mic, so the box does not fold mid-click.
  row.addEventListener('pointerdown',e=>{ if(row.classList.contains('open') && e.target.closest('button')) e.preventDefault(); });
}
function openComposer(focus){ const row=$('.composer-row'); if(!row) return; if(!row.classList.contains('open')) morphComposer(true); if(focus) $('#msg').focus(); }
/* Open/close morph: a plain card glides from the "Type to Maya" button to the text box (or back) while the
   real content cross-fades in, and the mic slides between its corner and its place beside the box. */
function tweenScroll(el, dy, dur, done){
  const y0=el.scrollTop, t0=performance.now(), e=t=>1-Math.pow(1-t,3);
  if(!dy || !dur){ el.scrollTop=y0+dy; done&&done(); return; }
  (function step(now){ const t=Math.min(1,(now-t0)/dur); el.scrollTop=y0+dy*e(t); if(t<1) requestAnimationFrame(step); else done&&done(); })(t0);
}
function morphComposer(open){
  const row=$('.composer-row'); if(!row) return;
  const openBtn=$('#openComposer'), form=$('#composer'), mic=$('#mic');
  const from=(open?openBtn:form).getBoundingClientRect(), micA=mic.getBoundingClientRect();
  const main=row.closest('.main'), th=$('#thread'), pb=()=>parseFloat(getComputedStyle(th).paddingBottom);
  const dur=380, ease='cubic-bezier(.2,.8,.2,1)';
  // Keep the thread anchored to the box: whatever sat just above the bottom edge moves up (or down) with it.
  const p0=pb(); main.classList.toggle('composing',open); const dy=pb()-p0;
  if(!open) main.classList.add('composing');   // keep the room until the scroll has moved back down
  row.classList.toggle('open',open);
  tweenScroll(th, dy, reduced?0:dur, ()=>{ if(!open && !row.classList.contains('open')) main.classList.remove('composing'); });
  if(reduced || !Element.prototype.animate) return;
  const target=open?form:openBtn, to=target.getBoundingClientRect(), micB=mic.getBoundingClientRect();
  const box=x=>({left:x.left+'px',top:x.top+'px',width:x.width+'px',height:x.height+'px'});
  const g=document.createElement('div'); g.className='morph'; document.body.appendChild(g);
  g.animate([{...box(from),opacity:1},{...box(to),opacity:1,offset:.75},{...box(to),opacity:0}],{duration:dur+140,easing:ease,fill:'forwards'}).onfinish=()=>g.remove();
  target.animate([{opacity:0},{opacity:0,offset:.55},{opacity:1}],{duration:dur+140,easing:'ease-out'});
  if(micB.width) mic.animate([{transformOrigin:'0 0',transform:`translate(${micA.left-micB.left}px,${micA.top-micB.top}px) scale(${micA.width/micB.width},${micA.height/micB.height})`},{transformOrigin:'0 0',transform:'none'}],{duration:dur,easing:ease});
}
function keyFor(t){
  t=t.toLowerCase();
  if(/tired|fatigue|energy|exhaust/.test(t)) return 'tired';
  if(/lonely|alone|isolat/.test(t)) return 'isolated';
  if(/fall|trip|stairs|safe/.test(t)) return 'falls';
  if(/anxious|scared|stress|calm|panic|worried/.test(t)) return 'calm';
  if(/thank/.test(t)) return 'thanks';
  return 'generic';
}
function setStatus(text,busy){ const s=$('#status'); if(!s) return; s.classList.toggle('busy',!!busy); s.querySelector('span').textContent=nm(text); }
function headMascot(){ return $('.chat-head .mascot'); }

/* New-chat intro: Maya greets you big and centred, then shrinks into her first chat message,
   the suggestions rise in underneath, and the text box opens. */
let introT=0;
function suggestHTML(){
  const starters=[...S.topics].slice(0,4); while(starters.length<4){ const k=Object.keys(STARTERS).find(k=>!starters.includes(k)); starters.push(k); }
  return `<div class="suggest"><p class="section-label">A few ideas to start with</p>
    <div class="starter-grid">${starters.map(k=>`<button class="choice" data-start="${k}"><span class="ic">${ic(STARTERS[k][1])}</span><span><b>${esc(STARTERS[k][0])}</b></span></button>`).join('')}</div></div>`;
}
function greetingMsg(){
  return `<div class="msg maya greet-msg">${mascot('idle')}<div class="msg-col"><div class="bubble"><p>${greet()}, ${esc(S.name)}. What’s on your mind?</p><span class="t">Maya · ${S.greetTime}</span></div>${S.msgs.length?'':suggestHTML()}</div></div>`;
}
function playIntro(){
  const box=$('#threadIn'), hero=box && box.querySelector('.welcome.intro'); if(!hero) return;
  const om=hero.querySelector('.mascot').getBoundingClientRect(), oh=hero.querySelector('h1').getBoundingClientRect();
  S.greeted=true; S.greetTime=now(); renderThread();
  const g=box.querySelector('.greet-msg'); if(!g) return;
  const m=g.querySelector('.mascot'), b=g.querySelector('.bubble'), mr=m.getBoundingClientRect(), br=b.getBoundingClientRect();
  const ease='cubic-bezier(.2,.8,.2,1)';
  if(mr.width){ setMascot(m,'wave',1600);
    m.animate([{transformOrigin:'0 0',transform:`translate(${om.left-mr.left}px,${om.top-mr.top}px) scale(${om.width/mr.width})`},{transformOrigin:'0 0',transform:'none'}],{duration:800,easing:ease}); }
  b.animate([{opacity:0,transform:`translate(${oh.left-br.left}px,${oh.top-br.top}px) scale(1.15)`,transformOrigin:'0 0'},{opacity:1,transform:'none',transformOrigin:'0 0'}],{duration:700,delay:120,easing:ease,fill:'backwards'});
  g.querySelectorAll('.suggest .section-label, .suggest .choice').forEach((el,i)=>
    el.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'none'}],{duration:450,delay:750+i*100,easing:ease,fill:'backwards'}));
  setTimeout(()=>openComposer(true), 1200);
}
function renderThread(){
  const box=$('#threadIn'); if(!box) return;
  let h='';
  clearTimeout(introT);
  if(!S.msgs.length && !S.greeted){
    if(reduced){ S.greeted=true; S.greetTime=now(); }
    else { h+=`<div class="welcome intro">${mascot('wave','','10rem')}<h1>${greet()}, ${esc(S.name)}.<br>What’s on your mind?</h1></div>`; introT=setTimeout(playIntro,1900); }
  }
  if(S.greeted) h+=greetingMsg();
  const lastMaya = S.msgs.map(m=>m.from).lastIndexOf('maya');
  S.msgs.forEach((m,i)=>{
    if(m.from==='me'){ h+=`<div class="msg me"><div class="bubble">${esc(m.text)}<span class="t">${m.time}</span></div></div>`; return; }
    const r=getR(m.key); const latest = i===lastMaya && !S.thinking;
    const body = r.parts.map(p=> p[0]==='p'?`<p>${esc(p[1])}</p>` : p[0]==='ul'?`<ul>${p[1].map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`
      : `<div class="breath-card">${mascot('idle','breathe')}<div class="breath-label" aria-hidden="true"><span>Breathe in…</span><span>Breathe out…</span></div></div>`).join('');
    let tools='';
    if(latest){
      tools = `<div class="tools">
        ${r.sources?`<button class="btn btn-soft" data-src="${i}" aria-expanded="${!!m.open}">${ic('book')} Sources (${r.sources.length})</button>`:''}
        <button class="btn btn-soft" data-fb="${i}:up" aria-pressed="${m.fb==='up'}">${ic('up')} Helpful</button>
        <button class="btn btn-soft" data-fb="${i}:down" aria-pressed="${m.fb==='down'}">${ic('down')} Not quite</button>
      </div>`;
    }
    const src = (r.sources && m.open) ? `<div class="sources"><b>Where this came from</b><ol>${r.sources.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></div>` : '';
    const ch = (latest && r.choices) ? `<div class="choices" role="group" aria-label="Suggested replies">${r.choices.map((c,j)=>`<button class="btn btn-soft" data-reply="${c[1]}" data-text="${esc(c[0])}"><span class="num">${j+1}</span>${esc(c[0])}</button>`).join('')}</div>` : '';
    h+=`<div class="msg maya">${mascot(r.mood==='celebrate'&&latest?'happy':'idle')}<div class="msg-col"><div class="bubble">${body}<span class="t">Maya · ${m.time}</span></div>${src}${tools}${ch}</div></div>`;
  });
  if(S.thinking) h+=`<div class="msg maya">${mascot('think')}<div class="msg-col"><div class="bubble"><div class="typing"><i></i><i></i><i></i><span>Maya is thinking</span></div></div></div></div>`;
  h+=`<p class="thread-note">Maya shows its sources. Always check medical decisions with your care team.</p>`;
  box.innerHTML=nm(h);
  const th=$('#thread'); requestAnimationFrame(()=>th.scrollTo({top:S.msgs.length?th.scrollHeight:0,behavior:reduced?'auto':'smooth'}));
}
function userSays(text,key){
  S.msgs.push({from:'me',text,time:now()});
  S.thinking=true; renderThread();
  setMascot(headMascot(),'think'); setStatus('Maya is thinking…',true);
  setTimeout(()=>{
    S.thinking=false; S.msgs.push({from:'maya',key,time:now()}); renderThread();
    let mood = getR(key).mood || 'happy'; if(S.style==='formal' && mood==='celebrate') mood='happy';
    setMascot(headMascot(),mood,mood==='celebrate'?1900:1300); setStatus('Here with you');
    if(mood==='celebrate') confetti();
  }, reduced?400:1400);
}
function toggleMic(){
  const b=$('#mic');
  if(S.listening){ S.listening=false; b.classList.remove('on'); b.setAttribute('aria-pressed','false'); setMascot(headMascot(),'idle'); setStatus('Here with you'); clearTimeout(toggleMic.t); return; }
  S.listening=true; b.classList.add('on'); b.setAttribute('aria-pressed','true'); setMascot(headMascot(),'listen'); setStatus('Listening…',true);
  toggleMic.t=setTimeout(()=>{
    const ta=$('#msg'); if(!ta) return; ta.value='I’ve been feeling really tired in the afternoons'; openComposer(true); ta.dispatchEvent(new Event('input'));
    S.listening=false; b.classList.remove('on'); b.setAttribute('aria-pressed','false'); setMascot(headMascot(),'happy',1000); setStatus('Here with you');
    toast('Speech is simulated in this prototype');
  },2400);
}
app.addEventListener('click',e=>{
  if(S.screen!=='chat' && S.screen!=='home') return;
  const b=e.target.closest('button'); if(!b) return;
  if(b.dataset.nav==='home'){ if(S.screen!=='home') go('home'); }
  else if(b.dataset.open){ if(b.dataset.open!=='cur') openPast(b.dataset.open); else go('chat'); }
  else if(S.screen==='home' && b.dataset.act==='newchat'){ S.msgs=[]; S.greeted=false; S.thinking=false; go('chat'); }
  else if(b.dataset.act==='allhist') openAllHistory();
  else if(b.dataset.start){ userSays(STARTERS[b.dataset.start][0], starterKey[b.dataset.start]); }
  else if(b.dataset.reply){ if(S.thinking) return; userSays(b.dataset.text,b.dataset.reply); }
  else if(b.dataset.src){ const m=S.msgs[+b.dataset.src]; m.open=!m.open; renderThread(); }
  else if(b.dataset.fb){ const [i,v]=b.dataset.fb.split(':'); const m=S.msgs[+i]; m.fb = m.fb===v?null:v; renderThread();
    if(m.fb){ setMascot(headMascot(), v==='up'?'happy':'concern',1500); toast(v==='up'?'Thanks! Maya will remember that helped.':'Thanks for telling me. I’ll try to do better.'); } }
  else if(b.dataset.soon){ toast(`${b.dataset.soon} isn’t part of this prototype`); }
  else if(b.dataset.act==='newchat'){ S.msgs=[]; S.greeted=false; S.thinking=false; renderThread(); setMascot(headMascot(),'happy',1200); }
  else if(b.dataset.act==='settings') openSettings();
});

/* ---------- overlays ---------- */
let lastFocus=null;
function overlay(html, cls){
  closeOverlay(); lastFocus=document.activeElement;
  const s=document.createElement('div'); s.className='scrim '+(cls||''); s.id='ovl'; s.innerHTML=nm(html);
  s.addEventListener('click',e=>{ if(e.target===s || e.target.closest('[data-close]')) closeOverlay(); });
  document.body.appendChild(s); const f=s.querySelector('button'); f&&f.focus();
  return s;
}
function closeOverlay(){ const o=$('#ovl'); if(o){ o.remove(); lastFocus&&lastFocus.isConnected&&lastFocus.focus(); } }
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeOverlay(); });
function openSettings(){
  const s=overlay(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Settings">
    <div class="panel-head"><h2>${'Make Maya comfy'}</h2><button class="btn btn-soft btn-icon" data-close aria-label="Close">${ic('x')}</button></div>
    <div class="setting">
      <button class="btn btn-soft btn-wide switch" id="tglDwell" aria-pressed="${S.dwell.on}"><span style="display:flex;gap:.6rem;align-items:center">${ic('eye')} Look to select</span><span class="knob"></span></button>
      <p class="muted">Rest your eyes on a button and it fills up, then selects. Small wobbles won’t cancel it.</p>
      <h3>Selection speed</h3>
      <div class="seg" id="segSpeed">${speedBtns()}</div>
    </div>
    <div class="setting"><h3>Companion</h3>
      <div class="seg" style="grid-template-columns:repeat(2,minmax(0,1fr))">${[['cute','M&#97;ya the sprout'],['formal','Rowan the owl']].map(([k,l])=>`<button class="btn btn-soft" data-cstyle="${k}" aria-pressed="${S.style===k}">${l}</button>`).join('')}</div>
    </div>
    <div class="setting"><h3>Text size</h3>
      <div class="seg" id="segText">${[['m','Standard'],['l','Large'],['xl','Extra large']].map(([k,l])=>`<button class="btn btn-soft" data-ts="${k}" aria-pressed="${S.textSize===k}">${l}</button>`).join('')}</div>
    </div>
    <div class="row">
      <button class="btn btn-soft" data-replay>${ic('heart')} Replay the intro</button>
      <button class="btn btn-soft" data-signout>${ic('out')} Sign out</button>
    </div>
  </div>`,'center');
  s.addEventListener('click',e=>{
    const b=e.target.closest('button'); if(!b) return;
    if(b.dataset.cstyle){ setStyle(b.dataset.cstyle); if(S.screen==='chat') renderChat(); else if(S.screen==='home') renderHome(); openSettings(); return; }
    if(b.id==='tglDwell'){ setDwell(!S.dwell.on); b.setAttribute('aria-pressed',S.dwell.on); toast(S.dwell.on?'Look to select is on':'Look to select is off'); }
    else if(b.dataset.speed){ S.dwell.ms=+b.dataset.speed; s.querySelectorAll('[data-speed]').forEach(x=>x.setAttribute('aria-pressed',x===b)); }
    else if(b.dataset.ts){ S.textSize=b.dataset.ts; document.documentElement.classList.remove('ts-l','ts-xl'); if(b.dataset.ts!=='m') document.documentElement.classList.add('ts-'+b.dataset.ts);
      s.querySelectorAll('[data-ts]').forEach(x=>x.setAttribute('aria-pressed',x===b)); }
    else if(b.hasAttribute('data-replay')){ S.onboarded=false; go('onboarding'); }
    else if(b.hasAttribute('data-signout')){ S.msgs=[]; S.greeted=false; go('login'); }
  });
}

/* ---------- Look to select (dwell) ----------
   Jitter-tolerant: leaving a target briefly pauses progress instead of resetting it,
   so a wobbling gaze point can drift off and back without losing the selection. */
const D={el:null,vis:null,p:0,away:0,fired:null,x:-999,y:-999,gx:-999,gy:-999,last:0,raf:0};
const GRACE=420;
function setDwell(on){
  S.dwell.on=on; document.body.classList.toggle('dwell',on);
  if(on && !D.raf){ D.last=performance.now(); D.raf=requestAnimationFrame(tick); }
  if(!on){ resetDwell(); cancelAnimationFrame(D.raf); D.raf=0; $('#gaze').classList.remove('show'); }
}
function resetDwell(){ if(D.vis){ D.vis.style.removeProperty('--dw'); D.vis.classList.remove('dw-target'); } D.el=D.vis=null; D.p=0; D.away=0; }
document.addEventListener('pointermove',e=>{ D.x=e.clientX; D.y=e.clientY; if(S.dwell.on) $('#gaze').classList.add('show'); },{passive:true});
document.addEventListener('pointerleave',()=>{ D.x=D.y=-999; $('#gaze').classList.remove('show'); });
function candidate(){
  if(D.x<0) return null;
  const t=document.elementFromPoint(D.x,D.y);
  const c=t && t.closest('button:not(:disabled), input, textarea');
  if(!c || c.closest('.proto')) return null;
  return c;
}
function tick(t){
  const dt=Math.min(64,t-D.last); D.last=t;
  // smoothed gaze bubble
  if(D.gx<0){ D.gx=D.x; D.gy=D.y; } D.gx+=(D.x-D.gx)*.22; D.gy+=(D.y-D.gy)*.22;
  $('#gaze').style.transform=`translate(${D.gx}px,${D.gy}px)`;
  const c=candidate();
  if(D.fired && c!==D.fired) D.fired=null;
  if(D.el && !D.el.isConnected) resetDwell();
  if(c && c===D.fired){ /* wait for gaze to leave before re-arming */ }
  else if(c && c===D.el){ D.away=0; D.p+=dt/S.dwell.ms; }
  else if(D.el){ D.away+=dt; if(D.away>GRACE){ resetDwell(); if(c) arm(c); } }
  else if(c) arm(c);
  if(D.vis) D.vis.style.setProperty('--dw',Math.min(1,D.p).toFixed(3));
  if(D.el && D.p>=1){
    const el=D.el, vis=D.vis; resetDwell(); D.fired=el;
    vis.classList.add('dw-fired'); setTimeout(()=>vis.classList.remove('dw-fired'),400);
    if(el.matches('input, textarea')) el.focus(); else el.click();
  }
  D.raf=requestAnimationFrame(tick);
}
function arm(c){ D.el=c; D.vis=c.closest('.field')||c; D.vis.classList.add('dw-target'); D.p=0; D.away=0; }

/* ---------- boot ---------- */
document.querySelectorAll('.proto [data-go]').forEach(b=>b.addEventListener('click',()=>{ if(b.dataset.go==='chat'||b.dataset.go==='home') S.onboarded=true; go(b.dataset.go); }));
const start=location.hash.slice(1);
go(['login','onboarding','home','chat'].includes(start)?start:'login');
})();
