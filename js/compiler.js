const $=s=>document.querySelector(s);
const EX={
'Ciao mondo':{c:'print("Ciao, mondo!")\nnome = input("Come ti chiami? ")\nprint(f"Piacere, {nome}!")',i:'Ada'},
'Variabili e tipi':{c:'lattine = 4\nlattine += 2\nprezzo = 2.50\ncodice = "005"\ndisponibile = True\nprint(lattine, type(lattine).__name__)\nprint(prezzo, codice, disponibile)',i:''},
'Conversione centesimi':{c:'centesimi = int(input("Centesimi: "))\ndollari = centesimi // 100\nresto = centesimi % 100\nprint(f"{dollari} dollari e {resto:02d} centesimi")',i:'435'},
'Prezzo della soda':{c:'CONFEZIONE = 6\nONCE_PER_LATTINA = 12\nprezzo = float(input("Prezzo della confezione: "))\nvolume = CONFEZIONE * ONCE_PER_LATTINA\nprint(f"Prezzo per oncia: {prezzo / volume:.2f}")',i:'4.35'},
'Piastrelle':{c:'import math\nlunghezza_muro = float(input("Lunghezza del muro (cm): "))\nlunghezza_piastrella = float(input("Lunghezza piastrella (cm): "))\nnumero = math.ceil(lunghezza_muro / lunghezza_piastrella)\nspazio = (numero * lunghezza_piastrella - lunghezza_muro) / 2\nprint("Piastrelle:", numero)\nprint(f"Spazio ai bordi: {spazio:.2f} cm")',i:'350\n30'},
'Stringhe e formattazione':{c:'r = 3.5\narea = 3.141592653589793 * r ** 2\nprint("Area concatenata:", "raggio " + str(r))\nprint(f"Area formattata: {area:.2f}")\nprint("Area con percentuale: %f" % area)\nprint("Area con format: {a:.1f}".format(a=area))',i:''},
'Quaderni (sconto)':{c:'SOGLIA_SCONTO = 5\nPERCENTUALE_SCONTO = 10\n\nprezzo = float(input("Prezzo di un quaderno: "))\nquantita = int(input("Quantità: "))\n\nif prezzo < 0 or quantita < 0:\n    print("Dato non valido")\nelse:\n    totale = prezzo * quantita\n    if quantita >= SOGLIA_SCONTO:\n        totale -= totale * PERCENTUALE_SCONTO / 100\n    print(f"Da pagare: {totale:.2f} euro")',i:'2\n6'},
'Temperatura valida':{c:'temp = float(input("Temperatura dell’acqua: "))\nif temp <= 0 or temp >= 100:\n    print("La temperatura non è nell’intervallo aperto (0, 100)")\nelse:\n    print("Temperatura valida")',i:'20'},
'Piano dell’ascensore':{c:'piano = int(input("Piano: "))\nif piano == 13:\n    print("Il piano 13 non esiste: usa il 12")\nelif piano <= 0 or piano > 20:\n    print("Piano non valido")\nelse:\n    print("Destinazione:", piano)',i:'13'},
'Investimento raddoppiato':{c:'TARGET = 2_000\nbilancio = 1_000\nanno = 0\ntasso = 0.05\nwhile bilancio < TARGET:\n    bilancio *= 1 + tasso\n    anno += 1\nprint(f"Il capitale raddoppia dopo {anno} anni: {bilancio:.2f}")',i:''},
'Conteggio e media':{c:'somma = 0\nconteggio = 0\nvoto = float(input("Voto (-1 per finire): "))\nwhile voto != -1:\n    somma += voto\n    conteggio += 1\n    voto = float(input("Voto (-1 per finire): "))\nif conteggio:\n    print(f"Media: {somma / conteggio:.2f}")\nelse:\n    print("Nessun voto inserito")',i:'28\n30\n25\n-1'},
'Ricerca e massimo':{c:'valori = [4, 9, 2, 7]\nmassimo = valori[0]\nfor valore in valori[1:]:\n    if valore > massimo:\n        massimo = valore\nprint("Massimo:", massimo)\nfor posizione, valore in enumerate(valori):\n    if valore == massimo:\n        print("Prima posizione:", posizione)\n        break',i:''},
'Vocali in una frase':{c:'testo = input("Frase: ")\nvocali = 0\nfor carattere in testo.lower():\n    if carattere in "aeiou":\n        vocali += 1\nprint("Vocali:", vocali)',i:'Ciao mondo'},
'Tabellina 3x3':{c:'for riga in range(1, 4):\n    for colonna in range(1, 4):\n        print(riga * colonna, end="\\t")\n    print()',i:''},
'BlackJack (somma carte)':{c:'import random\ncarta1 = random.randint(1, 10)\ncarta2 = random.randint(1, 10)\nsomma = carta1 + carta2\nprint("Carte:", carta1, carta2, "Somma:", somma)\nif somma == 21:\n    print("BlackJack!")\nelif somma > 21:\n    print("Sballato")\nelse:\n    print("Puoi chiedere un’altra carta")',i:''},
'Funzioni e cubi':{c:'def cube_volume(side_length):\n    return side_length ** 3\n\ndef main():\n    for lato in (2, 10):\n        print("Cubo di lato", lato, "-> volume", cube_volume(lato))\n\nif __name__ == "__main__":\n    main()',i:''},
'Piramide':{c:'def pyramid_volume(height, base_length):\n    base_area = base_length ** 2\n    return base_area * height / 3\n\nprint(f"{pyramid_volume(6, 4):.2f}")',i:''},
'Argomenti e *args':{c:'def my_complex(real=0.0, imag=0.0):\n    return real, imag\n\nprint(my_complex(3, 5))\nprint(my_complex(imag=5, real=3))\nprint(my_complex())\n\ndef mostra(primo, *altri):\n    print("Primo:", primo)\n    for elemento in altri:\n        print("Altro:", elemento)\n\nmostra("Hello", "Welcome", "to", "Politecnico")',i:''},
'Liste e comprehension':{c:'valori = [1, 2, 3]\nquadrati = [x * x for x in range(6)]\npositivi = [x for x in [-2, 4, -1, 5] if x > 0]\nvalori[1] *= 10\nprint("Lista modificata:", valori)\nprint("Quadrati:", quadrati)\nprint("Positivi:", positivi)',i:''},
'Quiz senza il minimo':{c:'voti = [8, 3, 9, 6]\nposizione_minimo = 0\nfor i in range(1, len(voti)):\n    if voti[i] < voti[posizione_minimo]:\n        posizione_minimo = i\nvoti.pop(posizione_minimo)\nprint("Somma senza il voto più basso:", sum(voti))',i:''},
'Frequenza dei dadi':{c:'sides = 6\ncontatori = [0] * (sides + 1)\nvalore = int(input("Valore (0 per finire): "))\nwhile valore != 0:\n    if 1 <= valore <= sides:\n        contatori[valore] += 1\n    valore = int(input("Valore (0 per finire): "))\nprint("Frequenze:", contatori[1:])',i:'2\n6\n2\n4\n0'},
'Tabella medaglie':{c:'COUNTRIES, MEDALS = 3, 3\ncounts = [[0, 3, 0], [0, 0, 1], [3, 1, 1]]\nfor i in range(COUNTRIES):\n    for j in range(MEDALS):\n        print(f"{counts[i][j]:8d}", end="")\n    print()\nprint("Totale prima nazione:", sum(counts[0]))\nprint("Oro totale:", sum(counts[i][0] for i in range(COUNTRIES)))',i:''},
'Scambio di metà lista':{c:'valori = [1, 2, 3, 4, 5, 6]\nmeta = len(valori) // 2\nfor i in range(meta):\n    j = i + meta\n    valori[i], valori[j] = valori[j], valori[i]\nprint(valori)',i:''},
'Copia profonda':{c:'import copy\ntabella = [[1, 2], [3, 4]]\nprofonda = copy.deepcopy(tabella)\nprofonda[0][0] = 99\nprint("Originale:", tabella)\nprint("Copia:", profonda)',i:''},
'File in memoria':{c:'from io import StringIO\ncontenuto = "Ada,30\\nBob,28\\n"\nwith StringIO(contenuto) as file:\n    for riga in file:\n        nome, voto = riga.rstrip().split(",")\n        print(nome, int(voto))',i:''},
'CSV con DictReader':{c:'import csv\nfrom io import StringIO\ncontenuto = "nome,voto\\nAda,30\\nBob,28\\n"\nwith StringIO(contenuto) as file:\n    for record in csv.DictReader(file):\n        print(record["nome"], int(record["voto"]))',i:''},
'Eccezioni':{c:'try:\n    numero = int(input("Numero: "))\n    print("Doppio:", numero * 2)\nexcept ValueError:\n    print("Devi inserire un intero valido")',i:'ciao'},
'Insiemi e parole uniche':{c:'testo = "la rana salta la rana nuota"\nparole = set(testo.split())\nprint("Parole uniche:", sorted(parole))\nprint("Numero di parole:", len(parole))',i:''},
'Dizionario frequenze':{c:'testo = "la rana salta la rana nuota"\nconta = {}\nfor parola in testo.split():\n    conta[parola] = conta.get(parola, 0) + 1\nfor parola in sorted(conta):\n    print(parola, conta[parola])',i:''},
'Record e ordinamento':{c:'studenti = [\n    {"nome": "Ada", "voto": 30},\n    {"nome": "Bob", "voto": 27},\n    {"nome": "Gia", "voto": 30},\n]\nfor studente in sorted(studenti, key=lambda s: (-s["voto"], s["nome"])):\n    print(studente["nome"], studente["voto"])',i:''},
'Insiemi (operazioni)':{c:'a = {1, 2, 3, 4}\nb = {3, 4, 5}\nprint("unione", sorted(a | b))\nprint("intersezione", sorted(a & b))\nprint("differenza", sorted(a - b))\nprint("simmetrica", sorted(a ^ b))',i:''},
'Monte Carlo (pi)':{c:'import random\nN = 100000\ndentro = 0\nfor _ in range(N):\n    x, y = random.random(), random.random()\n    if x*x + y*y <= 1:\n        dentro += 1\nprint("Stima di pi:", 4 * dentro / N)',i:''}
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
