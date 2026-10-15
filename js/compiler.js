const $=s=>document.querySelector(s);
const EX={
'Ciao mondo':{c:'print("Ciao, mondo!")\nnome = input("Come ti chiami? ")\nprint(f"Piacere, {nome}!")',i:'Ada'},
'Quaderni (sconto)':{c:'SOGLIA_SCONTO = 5\nPERCENTUALE_SCONTO = 10\n\nprezzo = float(input("Prezzo di un quaderno: "))\nquantita = int(input("Quantità: "))\n\nif prezzo < 0 or quantita < 0:\n    print("Dato non valido")\nelse:\n    totale = prezzo * quantita\n    if quantita >= SOGLIA_SCONTO:\n        totale -= totale * PERCENTUALE_SCONTO / 100\n    print(f"Da pagare: {totale:.2f} euro")',i:'2\n6'},
'Funzioni':{c:'def cubeVolume(sideLength):\n    return sideLength ** 3\n\ndef main():\n    for lato in (2, 10):\n        print("Cubo di lato", lato, "-> volume", cubeVolume(lato))\n\nif __name__ == "__main__":\n    main()',i:''},
'Dizionario frequenze':{c:'testo = "la rana salta la rana nuota"\nconta = {}\nfor parola in testo.split():\n    conta[parola] = conta.get(parola, 0) + 1\nfor p in sorted(conta):\n    print(p, conta[p])',i:''},
'Insiemi':{c:'a = {1, 2, 3, 4}\nb = {3, 4, 5}\nprint("unione", sorted(a | b))\nprint("intersezione", sorted(a & b))\nprint("differenza", sorted(a - b))',i:''},
'Monte Carlo (pi)':{c:'import random\nN = 100000\ndentro = 0\nfor _ in range(N):\n    x, y = random.random(), random.random()\n    if x*x + y*y <= 1:\n        dentro += 1\nprint(4 * dentro / N)',i:''}
};
const sel=$('#ex'),code=$('#code'),stdin=$('#stdin'),out=$('#out'),st=$('#status'),run=$('#run');
const setSt=(t,s)=>{st.textContent=t;st.dataset.s=s||''};
Object.keys(EX).forEach(k=>sel.add(new Option(k,k)));
const load=k=>{code.value=EX[k].c;stdin.value=EX[k].i};
sel.onchange=()=>{if(sel.value)load(sel.value)};
let saved=null;try{saved=localStorage.pyCode;localStorage.removeItem('pyCode')}catch(e){}
if(saved){sel.add(new Option('Dal tutorial',''),0);sel.value='';code.value=saved;stdin.value=''}
else{sel.value='Quaderni (sconto)';load('Quaderni (sconto)')}
code.addEventListener('keydown',e=>{
  if(e.key==='Tab'){e.preventDefault();code.setRangeText('    ',code.selectionStart,code.selectionEnd,'end')}
  if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();go()}
});

const PYO='https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
let py=null,booting=null;
const loadScript=u=>new Promise((res,rej)=>{const s=document.createElement('script');s.src=u;s.onload=res;s.onerror=()=>rej(new Error('Impossibile caricare Python: controlla la connessione a internet.'));document.head.appendChild(s)});
const boot=()=>booting||(booting=(async()=>{
  if(!window.loadPyodide)await loadScript(PYO+'pyodide.js');
  py=await loadPyodide({indexURL:PYO});
})().catch(e=>{booting=null;throw e}));
setTimeout(()=>boot().catch(()=>{}),600);   // precarico Python in background

const clean=m=>{const i=m.indexOf('File "<exec>"');return (i<0?m:'Traceback (most recent call last):\n  '+m.slice(i)).replace(/"<exec>"/g,'"main.py"').trim()};
async function go(){
  run.disabled=true;out.textContent='';out.classList.remove('err');
  try{
    if(!py){setSt('Carico Python…','wait');await boot()}
    setSt('Esecuzione…','wait');
    const lines=stdin.value.split('\n');let i=0,o='',e='';
    py.setStdout({batched:s=>o+=s+'\n'});py.setStderr({batched:s=>e+=s+'\n'});
    py.setStdin({stdin:()=>i<lines.length?lines[i++]:undefined});
    const t0=performance.now();
    try{await py.runPythonAsync(code.value,{globals:py.toPy({__name__:'__main__'})})}
    catch(x){e+=clean(x.message)+'\n'}
    finally{try{py.runPython('import sys;sys.stdout.flush();sys.stderr.flush()')}catch(_){}}
    out.textContent=(o+(e?(o?'\n':'')+e:'')).trimEnd()||'(nessun output)';
    out.classList.toggle('err',!!e);
    setSt(e?'✖ Errore nel programma':'✔ Eseguito in '+((performance.now()-t0)/1000).toFixed(2)+' s',e?'err':'ok');
  }catch(err){out.textContent=err.message;out.classList.add('err');setSt('Errore','err')}
  run.disabled=false;
}
run.onclick=go;
$('#clear').onclick=()=>{out.textContent='';out.classList.remove('err');setSt('Pronto')};
$('#dl').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([code.value],{type:'text/x-python'}));a.download='main.py';a.click()};
