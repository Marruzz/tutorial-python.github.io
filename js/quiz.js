const topics = [
  ['alias', 'Un alias è un secondo nome per lo stesso oggetto. Con `b = a`, modificare una lista tramite `b` modifica anche `a`.'],
  ['indentazione', 'In Python l’indentazione delimita i blocchi di istruzioni. Dopo `if`, `for`, `while`, `def` e simili le righe indentate appartengono al blocco.'],
  ['elif', 'I rami `if`, `elif` ed `else` vengono valutati in ordine e viene eseguito il primo ramo la cui condizione è vera.'],
  ['scope', 'Lo scope è la porzione di programma in cui un nome è visibile. Una variabile locale nasce in una funzione; una globale è definita fuori dalle funzioni.'],
  ['mutabilità', 'Un oggetto mutabile può essere modificato senza crearne uno nuovo, come una lista. Stringhe, tuple e numeri sono immutabili.'],
  ['set', 'Un set contiene elementi unici, non è indicizzato e supporta operazioni come unione, intersezione e differenza.'],
  ['chiavi di un dict', 'Una chiave di dizionario deve essere hashable, quindi stabile e tipicamente immutabile: vanno bene stringhe, numeri e tuple, non liste.'],
  ['lista e set', 'Una lista conserva ordine e duplicati ed è indicizzata; un set elimina i duplicati e offre test di appartenenza efficienti.'],
  ['lista e tupla', 'Entrambe sono sequenze ordinate, ma la lista è mutabile mentre la tupla è immutabile. Una funzione può restituire entrambe.'],
  ['copia di un dict', '`dict(d1)` crea una nuova copia superficiale del dizionario; `d2 = d1` crea invece un alias.'],
  ['input', '`input()` restituisce sempre una stringa. Per ottenere un numero bisogna usare, per esempio, `int(input())` o `float(input())`.'],
  ['conversione', '`int("12")` produce 12, mentre una stringa non numerica causa `ValueError`; la conversione va quindi validata o gestita con `try/except`.'],
  ['operatori booleani', 'Gli operatori booleani principali sono `and`, `or` e `not`; per esempio `eta >= 18 and documento_valido`.'],
  ['confronto float', 'Per confrontare float è preferibile una tolleranza, per esempio `math.isclose(a, b)`, perché la rappresentazione binaria può introdurre arrotondamenti.'],
  ['f-string', 'Una f-string, come `f"Totale: {x:.2f}"`, inserisce espressioni nel testo e permette di controllarne il formato.'],
  ['divisione intera', '`//` restituisce il quoziente intero della divisione, mentre `%` restituisce il resto.'],
  ['range', '`range(inizio, fine, passo)` include l’inizio ma esclude la fine; `range(2, 8, 2)` produce 2, 4 e 6.'],
  ['for e while', '`for` è adatto a iterare su una sequenza o su un numero noto di valori; `while` ripete finché una condizione resta vera.'],
  ['sentinella', 'Una sentinella è un valore speciale che indica la fine dell’input, per esempio `-1` quando i voti validi sono non negativi.'],
  ['break e continue', '`break` termina il ciclo; `continue` salta direttamente all’iterazione successiva.'],
  ['media', 'Per calcolare una media si accumulano somma e conteggio, poi si divide solo se il conteggio è diverso da zero.'],
  ['ciclo annidato', 'Un ciclo annidato è un ciclo dentro un altro; il corpo interno viene eseguito per ogni iterazione del ciclo esterno.'],
  ['funzione', 'Una funzione raggruppa istruzioni riutilizzabili. Si definisce con `def`, riceve parametri e può restituire un risultato con `return`.'],
  ['parametro e argomento', 'Il parametro è il nome usato nella definizione; l’argomento è il valore concreto passato nella chiamata.'],
  ['return', '`return` termina la funzione e restituisce un valore al chiamante. Se manca, il risultato implicito è `None`.'],
  ['default', 'Un parametro con valore predefinito, come `def f(x=0)`, può essere omesso nella chiamata.'],
  ['argomenti nominali', 'Gli argomenti nominali indicano il parametro per nome, per esempio `f(real=3, imag=5)`, e possono cambiare l’ordine.'],
  ['*args', '`*args` raccoglie in una tupla un numero variabile di argomenti posizionali.'],
  ['main', 'Il controllo `if __name__ == "__main__": main()` esegue `main` quando il file è avviato direttamente, non quando è importato.'],
  ['docstring', 'Una docstring è una stringa all’inizio della funzione che ne documenta scopo, parametri e valore restituito.'],
  ['comprehension', 'Una list comprehension costruisce una lista in forma compatta, per esempio `[x*x for x in range(5)]`.'],
  ['pop', '`pop(i)` rimuove e restituisce l’elemento in posizione `i`; senza indice rimuove l’ultimo elemento.'],
  ['deepcopy', '`copy.deepcopy` copia ricorsivamente anche le liste contenute, evitando che una modifica annidata cambi l’originale.'],
  ['CSV', '`csv.reader` produce righe come liste di campi; `csv.DictReader` usa la prima riga come intestazione e produce dizionari.'],
  ['with open', '`with open(...) as f` chiude automaticamente il file anche se nel blocco si verifica un’eccezione.'],
  ['eccezioni', 'Le eccezioni segnalano condizioni anomale. `try/except` permette di gestire errori specifici senza nascondere problemi inattesi.'],
  ['RAM', 'La RAM è memoria principale veloce e volatile: perde il contenuto senza alimentazione. Un SSD è persistente e generalmente più lento.'],
  ['gerarchia di memoria', 'Registri, cache, RAM e memoria secondaria formano una gerarchia: salendo aumenta la velocità e diminuiscono capacità e costo per bit.'],
  ['address bus', 'Un address bus di n bit può selezionare `2**n` indirizzi distinti. Se ogni cella contiene p byte, la memoria indirizzabile è `2**n * p` byte.'],
  ['data bus', 'Il data bus trasporta i dati tra CPU e memoria o periferiche; la sua ampiezza indica quanti bit possono viaggiare in parallelo.'],
  ['clock', 'Il clock scandisce le operazioni della CPU. La frequenza è il numero di cicli al secondo, misurato in hertz; il periodo è il reciproco.'],
  ['ALU', 'L’ALU esegue operazioni aritmetiche e logiche, come somme, confronti, AND e OR.'],
  ['FPU', 'La FPU è l’unità specializzata nei calcoli in virgola mobile.'],
  ['registri', 'I registri sono piccole memorie interne molto veloci. Il Program Counter contiene l’indirizzo della prossima istruzione; l’Instruction Register quella in esecuzione.'],
  ['ciclo macchina', 'Il ciclo macchina comprende fetch, decodifica e esecuzione: la CPU preleva l’istruzione, la interpreta e svolge l’operazione.'],
  ['complemento a due', 'Su n bit il complemento a due rappresenta valori da `-2^(n-1)` a `2^(n-1)-1`; il bit più significativo contribuisce al segno.'],
  ['overflow', 'Si ha overflow quando il risultato non è rappresentabile con il numero di bit disponibili; in complemento a due può accadere sommando due numeri dello stesso segno.'],
  ['base esadecimale', 'Ogni cifra esadecimale rappresenta quattro bit: per esempio A è 1010 e F è 1111.'],
  ['virgola mobile', 'La virgola mobile rappresenta numeri con segno, significando ed esponente, offrendo un ampio intervallo di valori a precisione finita.'],
  ['moduli', '`import modulo` carica un modulo e permette di usare i suoi nomi, per esempio `math.sqrt(9)`; evita di duplicare codice.']
];

const prompts = [
  name => `Che cosa significa ${name} in Python o nell’architettura dei calcolatori?`,
  name => `Come si usa ${name}? Indica la regola fondamentale da ricordare.`,
  name => `Quale errore o vantaggio è collegato a ${name}? Spiega brevemente.`
];

const QUIZ = topics.flatMap(([name, answer]) => prompts.map((makeQuestion, variant) => ({
  question: makeQuestion(name),
  answer
})));

const quizList = document.querySelector('#quiz-list');
const quizPage = document.querySelector('#quiz-page');
const quizPrevious = document.querySelector('#quiz-previous');
const quizNext = document.querySelector('#quiz-next');
const quizStatus = document.querySelector('#quiz-status');
const quizShuffle = document.querySelector('#quiz-shuffle');
let quizOrder = [];
let quizOffset = 0;
const pageSize = 5;

const shuffle = values => {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const renderQuiz = () => {
  const page = quizOrder.slice(quizOffset, quizOffset + pageSize);
  quizList.innerHTML = page.map((item, index) => `
    <details class="quiz">
      <summary><span class="quiz-number">${quizOffset + index + 1}.</span> ${item.question}</summary>
      <p>${item.answer}</p>
    </details>
  `).join('');
  quizStatus.textContent = `Domande ${quizOffset + 1}–${quizOffset + page.length} di ${QUIZ.length}`;
  quizPrevious.disabled = quizOffset === 0;
  quizNext.disabled = quizOffset + pageSize >= QUIZ.length;
  quizPage.textContent = `${Math.floor(quizOffset / pageSize) + 1} / ${Math.ceil(QUIZ.length / pageSize)}`;
};

const newQuiz = () => {
  quizOrder = shuffle(QUIZ);
  quizOffset = 0;
  renderQuiz();
};

quizPrevious.onclick = () => {
  quizOffset = Math.max(0, quizOffset - pageSize);
  renderQuiz();
};
quizNext.onclick = () => {
  quizOffset = Math.min(QUIZ.length - pageSize, quizOffset + pageSize);
  renderQuiz();
};
quizShuffle.onclick = newQuiz;
newQuiz();
