// DATA: BILINGUAL (English & Indonesia)
const data = [
    { id: 'A', en: 'Apple', idw: 'Apel', icon: '🍎', sent_en: 'I eat a red Apple', sent_id: 'Aku makan Apel merah' },
    { id: 'B', en: 'Bear', idw: 'Beruang', icon: '🐻', sent_en: 'The Bear is big', sent_id: 'Beruang itu besar' },
    { id: 'C', en: 'Cat', idw: 'Kucing', icon: '🐱', sent_en: 'The Cat says meow', sent_id: 'Kucing mengeong' },
    { id: 'D', en: 'Dog', idw: 'Anjing', icon: '🐶', sent_en: 'I love my Dog', sent_id: 'Aku suka Anjingku' },
    { id: 'E', en: 'Elephant', idw: 'Gajah', icon: '🐘', sent_en: 'Elephant has a trunk', sent_id: 'Gajah punya belalai' },
    { id: 'F', en: 'Fish', idw: 'Ikan', icon: '🐟', sent_en: 'Fish swim in water', sent_id: 'Ikan berenang di air' },
    { id: 'G', en: 'Grape', idw: 'Anggur', icon: '🍇', sent_en: 'Grapes are purple', sent_id: 'Anggur warnanya ungu' },
    { id: 'H', en: 'House', idw: 'Rumah', icon: '🏠', sent_en: 'This is my House', sent_id: 'Ini rumahku' },
    { id: 'I', en: 'Ice Cream', idw: 'Es Krim', icon: '🍦', sent_en: 'I like Ice Cream', sent_id: 'Aku suka Es Krim' },
    { id: 'J', en: 'Juice', idw: 'Jus', icon: '🧃', sent_en: 'Drink orange Juice', sent_id: 'Minum Jus jeruk' },
    { id: 'K', en: 'Kite', idw: 'Layangan', icon: '🪁', sent_en: 'Fly a Kite high', sent_id: 'Terbangkan layangan tinggi' },
    { id: 'L', en: 'Lion', idw: 'Singa', icon: '🦁', sent_en: 'The Lion is king', sent_id: 'Singa adalah raja' },
    { id: 'M', en: 'Monkey', idw: 'Monyet', icon: '🐵', sent_en: 'Monkey eats banana', sent_id: 'Monyet makan pisang' },
    { id: 'N', en: 'Net', idw: 'Jaring', icon: '🥅', sent_en: 'Kick ball into Net', sent_id: 'Tendang bola ke jaring' },
    { id: 'O', en: 'Orange', idw: 'Jeruk', icon: '🍊', sent_en: 'An Orange is round', sent_id: 'Jeruk itu bulat' },
    { id: 'P', en: 'Penguin', idw: 'Penguin', icon: '🐧', sent_en: 'Penguins cannot fly', sent_id: 'Penguin tidak bisa terbang' },
    { id: 'Q', en: 'Queen', idw: 'Ratu', icon: '👑', sent_en: 'She is a Queen', sent_id: 'Dia adalah Ratu' },
    { id: 'R', en: 'Rabbit', idw: 'Kelinci', icon: '🐰', sent_en: 'Rabbit hops fast', sent_id: 'Kelinci lompat cepat' },
    { id: 'S', en: 'Sun', idw: 'Matahari', icon: '☀️', sent_en: 'The Sun is hot', sent_id: 'Matahari itu panas' },
    { id: 'T', en: 'Tiger', idw: 'Harimau', icon: '🐯', sent_en: 'Tiger has stripes', sent_id: 'Harimau punya belang' },
    { id: 'U', en: 'Umbrella', idw: 'Payung', icon: '☂️', sent_en: 'Use Umbrella in rain', sent_id: 'Pakai Payung saat hujan' },
    { id: 'V', en: 'Van', idw: 'Mobil Box', icon: '🚐', sent_en: 'Go to school by Van', sent_id: 'Ke sekolah naik mobil' },
    { id: 'W', en: 'Watermelon', idw: 'Semangka', icon: '🍉', sent_en: 'Watermelon is green', sent_id: 'Semangka warnanya hijau' },
    { id: 'X', en: 'Xylophone', idw: 'Xilofon', icon: '🎹', sent_en: 'Play the Xylophone', sent_id: 'Mainkan Xilofon' },
    { id: 'Y', en: 'Yo-yo', idw: 'Yoyo', icon: '🪀', sent_en: 'Play with Yo-yo', sent_id: 'Bermain Yoyo' },
    { id: 'Z', en: 'Zebra', idw: 'Zebra', icon: '🦓', sent_en: 'Zebra is black & white', sent_id: 'Zebra hitam putih' }
];

// --- AUDIO UTILS ---
function speak(txt) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(txt);
    u.lang = 'en-US'; u.rate = 0.9;
    speechSynthesis.speak(u);
}

function playTone(type) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if(!AudioContext) return;
    const ctx = new AudioContext();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    
    if(type==='win') {
        o.frequency.setValueAtTime(500, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime+0.1);
        g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime+0.3);
        o.start(); o.stop(ctx.currentTime+0.3);
    } else if(type==='err') {
        o.type='sawtooth';
        o.frequency.setValueAtTime(150, ctx.currentTime);
        o.frequency.linearRampToValueAtTime(100, ctx.currentTime+0.3);
        g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime+0.3);
        o.start(); o.stop(ctx.currentTime+0.3);
    } else if(type==='eat') { // Suara Makan
        o.type='triangle';
        o.frequency.setValueAtTime(150, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);
        g.gain.setValueAtTime(0.5, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        o.start(); o.stop(ctx.currentTime+0.1);
    }
}

// --- NAVIGASI ---
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById('result-modal').style.display = 'none';
    if(id === 'match-screen') setTimeout(resizeCanvas, 100);
}

function goHome() {
    showScreen('menu-screen');
}

// --- 1. BELAJAR (LEARN) ---
function startLearnMode() {
    const c = document.getElementById('learn-container');
    c.innerHTML = '';
    data.forEach(d => {
        const el = document.createElement('div');
        el.className = 'letter-tile';
        el.innerHTML = `<div class="tile-char">${d.id}</div><div class="tile-icon">${d.icon}</div>`;
        el.onclick = () => showFocus(d);
        c.appendChild(el);
    });
    showScreen('learn-screen');
}

let currentItem = null;
function showFocus(d) {
    currentItem = d;
    document.getElementById('focus-icon').innerText = d.icon;
    document.getElementById('focus-letter').innerText = d.id;
    document.getElementById('focus-word-en').innerText = d.en;
    document.getElementById('focus-word-id').innerText = d.idw;
    document.getElementById('focus-overlay').style.display = 'flex';
    playTone('win');
    speak(d.en);
}
function replaySound() { if(currentItem) speak(currentItem.en); }
function closeFocus() { document.getElementById('focus-overlay').style.display = 'none'; }

// --- 2. KUIS (QUIZ) ---
let qIdx=0, score=0, isProcessing = false;

function startQuizMode() {
    qIdx=0; score=0; isProcessing = false;
    showScreen('quiz-screen');
    loadQ();
}

function loadQ() {
    if(qIdx>=10) { showResultModal(score, 10, true); return; }
    isProcessing = false;
    const q = data[Math.floor(Math.random() * data.length)];
    
    // UI Update
    const box = document.getElementById('target-box');
    box.classList.remove('eating','shaking');
    box.style.background = 'var(--primary)';
    document.getElementById('quiz-letter').innerText = q.id;
    
    // Update Clue
    document.getElementById('quiz-clue').innerHTML = `Clue: ${q.sent_en}<br><small>(${q.sent_id})</small>`;
    
    document.getElementById('progress-fill').style.width = `${(qIdx/10)*100}%`;

    let opts = [q];
    while(opts.length<4) {
        let r = data[Math.floor(Math.random()*data.length)];
        if(!opts.includes(r)) opts.push(r);
    }
    opts.sort(()=>0.5-Math.random());

    const rack = document.getElementById('quiz-options');
    rack.innerHTML='';
    opts.forEach(o => {
        const d = document.createElement('div');
        d.className = 'food-item';
        d.innerText = o.icon;
        d.onclick = (e) => checkAns(e.currentTarget, o, q);
        rack.appendChild(d);
    });
}

function checkAns(el, sel, cor) {
    if(isProcessing) return; isProcessing = true;
    const box = document.getElementById('target-box');
    
    if(sel.id === cor.id) {
        score++; 
        playTone('eat'); // Crunch Sound
        el.classList.add('correct-eat'); 
        box.classList.add('eating'); 
        speak("Yummy!");
        setTimeout(() => { qIdx++; loadQ(); }, 800);
    } else {
        playTone('err'); speak("Oh no!");
        box.classList.add('shaking');
        el.classList.add('wrong-answer');
        setTimeout(() => { 
            box.classList.remove('shaking'); 
            el.classList.remove('wrong-answer'); 
            isProcessing = false; 
            qIdx++; loadQ(); // Lanjut walau salah
        }, 800); 
    }
}

// --- 3. MEMORY GAME ---
let memCards = [], hasFlippedCard = false, lockBoard = false;
let firstCard, secondCard, matchesFound = 0;
const TOTAL_PAIRS = 8; 

function startMemoryMode() {
    matchesFound = 0;
    const board = document.getElementById('memory-board');
    board.innerHTML = '';
    const selection = [...data].sort(() => 0.5 - Math.random()).slice(0, TOTAL_PAIRS);
    let deck = [];
    selection.forEach(item => {
        deck.push({ type:'letter', val: item.id, matchId: item.id });
        deck.push({ type:'icon', val: item.icon, matchId: item.id });
    });
    deck.sort(() => 0.5 - Math.random()); 

    deck.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('mem-card');
        card.dataset.framework = item.matchId;
        const inner = document.createElement('div');
        inner.classList.add('mem-inner');
        const front = document.createElement('div');
        front.classList.add('mem-front');
        front.innerText = item.val;
        const back = document.createElement('div');
        back.classList.add('mem-back');
        back.innerText = '❓';
        inner.appendChild(front); inner.appendChild(back);
        card.appendChild(inner);
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
    showScreen('memory-screen');
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    playTone('win'); 
    if (!hasFlippedCard) {
        hasFlippedCard = true; firstCard = this; return;
    }
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    if (isMatch) {
        disableCards();
        matchesFound++;
        speak("Good!");
        if(matchesFound === TOTAL_PAIRS) setTimeout(() => showResultModal(0, 0, false), 1000);
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched'); secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    lockBoard = true; playTone('err');
    setTimeout(() => {
        firstCard.classList.remove('flip'); secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]; [firstCard, secondCard] = [null, null];
}

// --- 4. MATCHING GAME (CLICK MODE) ---
let matchCanvas, matchCtx;
let selectedItem = null;
let matchPairsCount = 0;
let lines = [];
const MATCH_TOTAL = 4;

function startMatchMode() {
    showScreen('match-screen');
    matchPairsCount = 0; lines = []; selectedItem = null;
    
    const leftCol = document.getElementById('match-left');
    const rightCol = document.getElementById('match-right');
    leftCol.innerHTML = ''; rightCol.innerHTML = '';

    const selection = [...data].sort(() => 0.5 - Math.random()).slice(0, MATCH_TOTAL);
    
    selection.forEach(item => {
        const div = document.createElement('div');
        div.className = 'match-item'; div.innerText = item.icon;
        div.dataset.val = item.id; div.dataset.type = 'img';
        div.onclick = handleMatchClick;
        leftCol.appendChild(div);
    });

    const rightSelection = [...selection].sort(() => 0.5 - Math.random());
    rightSelection.forEach(item => {
        const div = document.createElement('div');
        div.className = 'match-item letter'; div.innerText = item.id;
        div.dataset.val = item.id; div.dataset.type = 'char';
        div.onclick = handleMatchClick;
        rightCol.appendChild(div);
    });

    matchCanvas = document.getElementById('match-canvas');
    matchCtx = matchCanvas.getContext('2d');
    resizeCanvas();
}

function resizeCanvas() {
    const container = document.getElementById('match-area');
    if(container && matchCanvas) {
        matchCanvas.width = container.offsetWidth;
        matchCanvas.height = container.offsetHeight;
        redrawLines();
    }
}

function handleMatchClick(e) {
    let target = e.currentTarget;
    if (target.classList.contains('connected')) return;

    if (!selectedItem) {
        selectedItem = target;
        target.classList.add('selected');
        playTone('win'); 
    } else {
        if (selectedItem === target) {
            selectedItem.classList.remove('selected'); selectedItem = null;
        } else if (selectedItem.dataset.type === target.dataset.type) {
            selectedItem.classList.remove('selected');
            selectedItem = target;
            target.classList.add('selected');
            playTone('win');
        } else {
            if (selectedItem.dataset.val === target.dataset.val) {
                playTone('win');
                selectedItem.classList.remove('selected');
                selectedItem.classList.add('connected');
                target.classList.add('connected');
                addLine(selectedItem, target);
                selectedItem = null;
                matchPairsCount++;
                if(matchPairsCount === MATCH_TOTAL) setTimeout(() => showResultModal(0,0,false), 500);
            } else {
                playTone('err');
                selectedItem.classList.remove('selected');
                selectedItem = null;
                target.style.backgroundColor = '#fab1a0';
                setTimeout(() => target.style.backgroundColor = 'white', 200);
            }
        }
    }
}

function addLine(el1, el2) {
    const cRect = matchCanvas.getBoundingClientRect();
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
    lines.push({
        x1: (rect1.left + rect1.width/2) - cRect.left,
        y1: (rect1.top + rect1.height/2) - cRect.top,
        x2: (rect2.left + rect2.width/2) - cRect.left,
        y2: (rect2.top + rect2.height/2) - cRect.top
    });
    redrawLines();
}

function redrawLines() {
    matchCtx.clearRect(0, 0, matchCanvas.width, matchCanvas.height);
    matchCtx.lineWidth = 5; matchCtx.lineCap = "round";
    lines.forEach(l => {
        matchCtx.beginPath(); matchCtx.moveTo(l.x1, l.y1); matchCtx.lineTo(l.x2, l.y2);
        matchCtx.strokeStyle = "#badc58"; matchCtx.stroke();
    });
}

// --- 5. LISTENING GAME ---
let listenTarget = null;
let isListeningBusy = false; 
    
function startListeningMode() {
    isListeningBusy = false;
    showScreen('listening-screen');
    nextListening();
}

function nextListening() {
    isListeningBusy = false;
    listenTarget = data[Math.floor(Math.random() * data.length)];
    let options = [listenTarget];
    while(options.length < 4) {
        let r = data[Math.floor(Math.random() * data.length)];
        if(!options.includes(r)) options.push(r);
    }
    options.sort(() => 0.5 - Math.random());

    const container = document.getElementById('listen-options');
    container.innerHTML = '';
    options.forEach(opt => {
        const card = document.createElement('div');
        card.className = 'listen-card'; card.innerText = opt.icon;
        card.onclick = (e) => checkListening(e.target, opt);
        container.appendChild(card);
    });
    setTimeout(() => playTargetSound(), 500);
}

function playTargetSound() { if(listenTarget && !isListeningBusy) speak(listenTarget.en); }

function checkListening(cardElement, selected) {
    if(isListeningBusy) return; 
    if(selected.id === listenTarget.id) {
        isListeningBusy = true; playTone('win'); speak("Good Job!"); 
        cardElement.classList.add('correct');
        confetti({ particleCount: 50, spread: 40 });
        setTimeout(() => nextListening(), 2000);
    } else {
        playTone('err');
        cardElement.classList.add('wrong');
        setTimeout(() => cardElement.classList.remove('wrong'), 500);
    }
}

// --- 6. SCRAMBLE GAME ---
let scrambleTarget = [], scrambleIdx = 0;
    
function startScrambleMode() {
    showScreen('scramble-screen');
    nextScramble();
}

function nextScramble() {
    const item = data[Math.floor(Math.random() * data.length)];
    const word = item.en.toUpperCase();
    scrambleTarget = word.split('');
    scrambleIdx = 0;

    document.getElementById('scramble-icon').innerText = item.icon;
    speak("Arrange... " + item.en);

    const slotsDiv = document.getElementById('scramble-slots');
    slotsDiv.innerHTML = '';
    scrambleTarget.forEach(() => {
        const s = document.createElement('div'); s.className = 'slot'; slotsDiv.appendChild(s);
    });

    const poolDiv = document.getElementById('scramble-pool');
    poolDiv.innerHTML = '';
    let letters = [...scrambleTarget].sort(() => 0.5 - Math.random());

    letters.forEach((char) => {
        const btn = document.createElement('div');
        btn.className = 'letter-btn'; btn.innerText = char;
        btn.onclick = (e) => checkScramble(e.target, char);
        poolDiv.appendChild(btn);
    });
}

function checkScramble(btn, char) {
    if(scrambleIdx >= scrambleTarget.length) return; 
    if (char === scrambleTarget[scrambleIdx]) {
        playTone('win');
        const slots = document.querySelectorAll('#scramble-slots .slot');
        slots[scrambleIdx].innerText = char;
        slots[scrambleIdx].classList.add('filled');
        btn.classList.add('used');
        scrambleIdx++;
        if(scrambleIdx === scrambleTarget.length) {
            speak("Correct!");
            confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
            setTimeout(() => nextScramble(), 2500);
        }
    } else {
        playTone('err');
        btn.style.backgroundColor = '#fab1a0';
        setTimeout(() => { btn.style.backgroundColor = 'white'; }, 200);
        speak("Try again");
    }
}

// --- HASIL ---
function showResultModal(val, max, showScoreText) {
    document.getElementById('result-modal').style.display = 'flex';
    const title = document.getElementById('result-title');
    const scoreTxt = document.getElementById('score-text');
    
    if (showScoreText) {
        if(val === max) { title.innerText = "SEMPURNA!"; confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } }); speak("Perfect Score!"); }
        else if (val >= max/2) { title.innerText = "HEBAT!"; confetti({ particleCount: 100, spread: 60 }); speak("Good job!"); }
        else { title.innerText = "BAGUS!"; speak("Nice try!"); }
        scoreTxt.style.display = 'block'; scoreTxt.innerText = `Skor: ${val} dari ${max}`;
    } else {
        title.innerText = "HOREEE!"; confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } }); speak("You did it! Amazing!"); scoreTxt.style.display = 'none';
    }
}

function toggleMusic() { alert("Musik dimatikan agar ringan."); }