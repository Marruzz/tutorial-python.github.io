(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],D=document.documentElement;
const ls=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}};
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

$('#theme').onclick=()=>ls('t',D.classList.toggle('dark')?'dark':'light');

const side=$('#side'),ov=$('#ov'),menu=$('#menu');
const tg=o=>{side.classList.toggle('open',o);ov.classList.toggle('show',o);menu.setAttribute('aria-expanded',o)};
menu.onclick=()=>tg(!side.classList.contains('open'));ov.onclick=()=>tg(false);
$$('a',side).forEach(a=>a.addEventListener('click',()=>tg(false)));
const cur=$('a.on',side);if(cur)side.scrollTop=cur.offsetTop-side.clientHeight/2;

// evidenziazione Python
const KW=new Set('False None True and as assert break class continue def del elif else except finally for from global if import in is lambda not or pass raise return try while with yield'.split(' '));
const BI=new Set('print input len range int float str list dict set tuple sum min max abs round sorted enumerate open type bool zip map'.split(' '));
const RE=/(#.*)|("""[\s\S]*?"""|'''[\s\S]*?'''|[fFrRbB]?"(?:\\.|[^"\\\n])*"|[fFrRbB]?'(?:\\.|[^'\\\n])*')|\b(\d+(?:\.\d+)?)\b|\b([A-Za-z_]\w*)\b/g;
const hl=t=>{let o='',i=0,m;RE.lastIndex=0;while((m=RE.exec(t))){o+=esc(t.slice(i,m.index));i=RE.lastIndex;const x=m[0],c=m[1]?'c':m[2]?'s':m[3]?'n':KW.has(x)?'k':BI.has(x)?'b':'';o+=c?`<span class="${c}">${esc(x)}</span>`:esc(x)}return o+esc(t.slice(i))};

// copia / prova nel compilatore
const copy=async t=>{try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.append(a);a.select();document.execCommand('copy');a.remove()}};
$$('.code').forEach(w=>{
  const c=$('code',w),raw=c.textContent;c.innerHTML=hl(raw);
  const cp=$('.copy',w)||w.insertBefore(Object.assign(document.createElement('button'),{className:'copy',textContent:'Copia'}),w.firstChild);
  cp.onclick=async()=>{await copy(raw);cp.textContent='Copiato ✓';setTimeout(()=>cp.textContent='Copia',1500)};
  const r=Object.assign(document.createElement('button'),{className:'run',textContent:'Prova',title:'Apri nel compilatore'});
  r.onclick=()=>{ls('pyCode',raw);location.href='compilatore.html'};cp.after(r);
});

// checklist con memoria
const key='chk:'+location.pathname;let done=[];try{done=JSON.parse(ls(key)||'[]')}catch(e){}
$$('.check').forEach(u=>$$('li',u).forEach((li,i)=>{li.tabIndex=0;li.setAttribute('role','checkbox');li.classList.toggle('d',done.includes(i));li.setAttribute('aria-checked',done.includes(i));
  const f=()=>{const d=li.classList.toggle('d');li.setAttribute('aria-checked',d);done=d?[...done,i]:done.filter(x=>x!==i);ls(key,JSON.stringify(done))};
  li.onclick=f;li.onkeydown=e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();f()}}}));

// barra di avanzamento + indice attivo
const bar=$('#bar'),tl=$$('#toc a'),hs=tl.map(a=>$(a.getAttribute('href')));let tk=0;
const upd=()=>{tk=0;const h=D.scrollHeight-innerHeight;bar.style.width=(h>0?scrollY/h*100:0)+'%';let k=-1;hs.forEach((e,i)=>{if(e&&e.getBoundingClientRect().top<130)k=i});tl.forEach((a,i)=>a.classList.toggle('on',i===k))};
addEventListener('scroll',()=>{if(!tk)tk=requestAnimationFrame(upd)},{passive:true});upd();

// ricerca
const q=$('#q'),res=$('#res');let hits=[],sel=-1;
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const find=v=>{const ws=norm(v).split(/\s+/).filter(Boolean);if(!ws.length)return[];
  return(window.IDX||[]).map(e=>{const t=norm(e.t+' '+e.pt),x=norm(e.x);let s=0;for(const w of ws){const a=t.includes(w),b=x.includes(w);if(!a&&!b)return null;s+=(a?5:0)+(b?1:0)}return{e,s}}).filter(Boolean).sort((a,b)=>b.s-a.s).slice(0,12).map(r=>r.e)};
const mark=(s,ws)=>ws.length?esc(s).replace(new RegExp('('+ws.map(w=>w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','gi'),'<mark>$1</mark>'):esc(s);
const show=()=>{const v=q.value.trim();if(!v){res.classList.remove('show');return}
  const ws=v.split(/\s+/);hits=find(v);sel=hits.length?0:-1;
  res.innerHTML=hits.length?hits.map((e,i)=>{const i0=Math.max(0,norm(e.x).indexOf(norm(ws[0]))),s=(i0>60?'…':'')+e.x.slice(Math.max(0,i0-50),i0+110)+'…';
    return`<a href="${e.p}.html#${e.a}" class="${i?'':'sel'}"><small>${esc(e.pt)}</small><strong>${mark(e.t,ws)}</strong><span>${mark(s,ws)}</span></a>`}).join(''):`<p>Nessun risultato per “${esc(v)}”. Prova con una parola più semplice.</p>`;
  res.classList.add('show')};
const pick=d=>{const a=$$('a',res);if(!a.length)return;sel=(sel+d+a.length)%a.length;a.forEach((x,i)=>x.classList.toggle('sel',i===sel));a[sel].scrollIntoView({block:'nearest'})};
q.addEventListener('input',show);q.addEventListener('focus',show);
q.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();pick(1)}else if(e.key==='ArrowUp'){e.preventDefault();pick(-1)}else if(e.key==='Enter'&&hits[sel]){location.href=`${hits[sel].p}.html#${hits[sel].a}`}});
document.addEventListener('keydown',e=>{
  if(e.key==='/'&&!/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)){e.preventDefault();q.focus()}
  if(e.key==='Escape'){res.classList.remove('show');q.blur();tg(false)}});
document.addEventListener('click',e=>{if(!res.contains(e.target)&&e.target!==q)res.classList.remove('show')});
})();
