const $ = s => document.querySelector(s);
const app = $('#app');
let store = JSON.parse(localStorage.getItem('sg') || '{"subs":[],"points":0}');
function save() {
  try { localStorage.setItem('sg', JSON.stringify(store)); }
  catch (e) { alert('Storage full. TODO: move recordings to a real backend.'); }
  $('#points').textContent = store.points + ' pts';
}
const find = id => COMMUNITIES.find(c => c.id === id);
const shuffle = a => [...a].sort(() => Math.random() - 0.5);
const play = src => src && new Audio(src).play();

// ---------- router ----------
const views = { home, community, learn, contribute, pending };
function route() {
  const [page, id] = location.hash.slice(1).split('/');
  (views[page] || home)(id);
  save();
}
window.addEventListener('hashchange', route);
route();

// ---------- views ----------
function home() {
  app.innerHTML = '<h2>Pick a community</h2>' + COMMUNITIES.map(c =>
    `<div class="card"><h3>${c.name}</h3><span class="tag">${c.region}</span>
     <p>${c.story}</p><a class="btn" href="#community/${c.id}">Open</a></div>`).join('');
}

function community(id) {
  const c = find(id);
  app.innerHTML = `<h2>${c.name}</h2><p>${c.story}</p>
    <a class="btn" href="#learn/${id}">Start lesson</a>
    <a class="btn" href="#contribute/${id}">Add a recording</a>
    <h3>Culture</h3>` +
    c.items.map(i => `<div class="card"><span class="tag">${i.type}</span><h3>${i.title}</h3><p>${i.text}</p></div>`).join('') +
    '<h3>Words</h3>' +
    c.entries.map(e => `<div class="card"><b>${e.native}</b> = ${e.en} (${e.np})
      <button onclick="play('${e.audio}')">Listen</button>
      ${e.variants.map(v => `<span class="tag">also heard in ${v.region}</span>`).join(' ')}</div>`).join('');
}

// ---------- quiz ----------
let quiz;
function learn(id) {
  const c = find(id);
  quiz = { c, i: 0, score: 0, qs: shuffle(c.entries).slice(0, 5) };
  renderQ();
}
function renderQ() {
  const { c, i, qs } = quiz;
  if (i >= qs.length) {
    store.points += quiz.score * 10; save();
    app.innerHTML = `<h2>Done: ${quiz.score}/${qs.length}</h2><p>+${quiz.score * 10} points</p>
      <a class="btn" href="#community/${c.id}">Back</a><a class="btn" href="#learn/${c.id}">Again</a>`;
    return;
  }
  const q = qs[i];
  quiz.opts = shuffle([q.en, ...shuffle(c.entries.filter(e => e !== q)).slice(0, 2).map(e => e.en)]);
  app.innerHTML = `<h2>Question ${i + 1} of ${qs.length}</h2><div class="big">${q.native}</div>
    <button onclick="play('${q.audio}')">Listen</button>` +
    quiz.opts.map((o, k) => `<button class="opt" onclick="answer(${k})">${o}</button>`).join('');
}
function answer(k) {
  if (quiz.opts[k] === quiz.qs[quiz.i].en) quiz.score++;
  quiz.i++; renderQ();
}

// ---------- contribute (record in browser) ----------
let mediaRec, chunks, recData;
function contribute(id) {
  const c = find(id); recData = null;
  app.innerHTML = `<h2>Add a recording: ${c.name}</h2>
    <label>Word</label><br>
    <select id="entry">${c.entries.map((e, i) => `<option value="${i}">${e.native} = ${e.en}</option>`).join('')}</select><br>
    <label>Where do you speak it? (district)</label><br><input id="region" placeholder="[district]"><br>
    <button id="recBtn" onclick="toggleRec()">Start recording</button><br>
    <audio id="preview" controls style="display:none"></audio><br>
    <label><input type="checkbox" id="consent"> I agree my community owns this recording and it can be used for learning.</label><br>
    <label><input type="checkbox" id="restricted"> This is restricted or sacred, do not make public.</label><br>
    <button onclick="submitRec('${id}')">Submit</button>`;
}
function toggleRec() {
  const btn = $('#recBtn');
  if (mediaRec && mediaRec.state === 'recording') { mediaRec.stop(); btn.textContent = 'Record again'; return; }
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    chunks = []; mediaRec = new MediaRecorder(stream);
    mediaRec.ondataavailable = e => chunks.push(e.data);
    mediaRec.onstop = () => {
      stream.getTracks().forEach(t => t.stop());
      const r = new FileReader();
      r.onload = () => { recData = r.result; const p = $('#preview'); p.src = recData; p.style.display = 'block'; };
      r.readAsDataURL(new Blob(chunks, { type: mediaRec.mimeType }));
    };
    mediaRec.start(); btn.textContent = 'Stop';
  }).catch(() => alert('Mic blocked. Allow microphone access (needs https or localhost).'));
}
function submitRec(cid) {
  if (!recData) return alert('Record something first.');
  if (!$('#consent').checked) return alert('Consent is required.');
  const c = find(cid), e = c.entries[$('#entry').value];
  store.subs.push({ community: c.name, word: e.native, en: e.en, region: $('#region').value || 'unknown',
    restricted: $('#restricted').checked, audio: recData, status: 'pending' });
  store.points += 5; save();
  location.hash = '#pending';
}

// ---------- submissions + fake verify ----------
function pending() {
  app.innerHTML = '<h2>Submissions</h2>' + (store.subs.length ? store.subs.map((s, i) =>
    `<div class="card"><b>${s.word}</b> = ${s.en} <span class="tag">${s.community}</span> <span class="tag">${s.region}</span>
     <span class="${s.status === 'verified' ? 'ok' : 'wait'}">${s.status}</span><br>
     <audio src="${s.audio}" controls></audio><br>
     ${s.status === 'pending' ? `<button onclick="verify(${i})">Verify (demo)</button>` : ''}</div>`).join('')
    : '<p>Nothing yet. Open a community and add a recording.</p>');
}
function verify(i) { store.subs[i].status = 'verified'; save(); pending(); }
