// script.js = how the site BEHAVES.
// Part 1: the SLIDES list (edit this to change the banner).  Part 2: the carousel.  Part 3: the newsletter box.

// =====================================================================
// PART 1: THE SLIDES. Each { ... } block is one slide.
//   img        = the picture. "Special:FilePath/<file name>" is a Wikimedia Commons trick that gives the image directly.
//                To use your own photo instead, write e.g. "images/mypic.jpg".
//   credit     = who took the photo.    creditUrl = the web page where the photo can be found.
//   text / sub = the big line and the smaller line.   quote: true puts quotation marks around the big line.
//   source     = where the fact comes from (shown bottom-right).  sourceUrl = link to it.
// Check each Commons page (creditUrl) for the exact license before the final submission.
// =====================================================================
const GV = "https://globalvoices.org/2021/02/09/lost-and-found-the-struggle-to-preserve-nepals-linguistic-heritage/";
const FP = "https://commons.wikimedia.org/wiki/Special:FilePath/";   // start of every Commons image link
const FILE = "https://commons.wikimedia.org/wiki/File:";             // start of every Commons "file page" link

const SLIDES = [
  { img: FP + "Boudhanath_Stupa,_Kathmandu_(16095442425).jpg?width=1600",
    alt: "Boudhanath Stupa in Kathmandu",
    credit: "Boudhanath Stupa, photo by Jean-Marie Hullot (CC BY 2.0)",
    creditUrl: FILE + "Boudhanath_Stupa,_Kathmandu_(16095442425).jpg",
    text: "In 2019, Nepal had 129 spoken languages.",
    sub: "Each one carries its own songs, stories and way of seeing the world.",
    source: "Global Voices / Nepali Times, 2021", sourceUrl: GV },

  { img: FP + "Patan_Durbar_Square-2644.jpg?width=1600",
    alt: "Patan Durbar Square, Lalitpur",
    credit: "Patan Durbar Square, photo by Bijay Chaurasia (CC BY-SA 4.0)",
    creditUrl: FILE + "Patan_Durbar_Square-2644.jpg",
    text: "At least 24 of them are now endangered.",
    sub: "A language spoken by fewer than 1,000 people is counted as endangered.",
    source: "Global Voices / Nepali Times, 2021", sourceUrl: GV },

  { img: FP + "Janaki_Temple--IMG_7555-Pano.jpg?width=1920",
    alt: "Janaki Temple in Janakpur",
    credit: "Janaki Temple, Janakpur, photo by Bijay Chaurasia (Wikimedia Commons)",
    creditUrl: FILE + "Janaki_Temple--IMG_7555-Pano.jpg",
    text: "Even Maithili, one of the 10 most spoken languages here, is losing ground.",
    sub: "Parents often choose Nepali or English in school to improve job prospects for their children.",
    source: "Global Voices / Nepali Times, 2021", sourceUrl: GV },

  { img: FP + "Pasupatinath_Temple_from_the_bank_of_Bagmati_river-Eastern_side-Bijay-_IMG_3358.jpg?width=1600",
    alt: "Pashupatinath Temple on the Bagmati river",
    credit: "Pashupatinath Temple, photo by Bijay Chaurasia (Wikimedia Commons)",
    creditUrl: FILE + "Pasupatinath_Temple_from_the_bank_of_Bagmati_river-Eastern_side-Bijay-_IMG_3358.jpg",
    text: "If I die, then my mother language dies with me too.", quote: true,
    sub: "Kamala Kusunda is the only living speaker of Kusunda. She now teaches it to over 20 students.",
    source: "Global Voices / Nepali Times, 2021", sourceUrl: GV },

  { img: FP + "Tharu_Dance_Sauraha_Chitwan_2018.jpg?width=1600",
    alt: "Tharu dance in Sauraha, Chitwan",
    credit: "Tharu dance, Sauraha, Chitwan (Wikimedia Commons)",
    creditUrl: FILE + "Tharu_Dance_Sauraha_Chitwan_2018.jpg",
    text: "Dura, Kusunda and Tillung each have just one speaker left.",
    sub: "Every recording we make is a lifeline for a language.",
    source: "Global Voices / Nepali Times, 2021", sourceUrl: GV },

  { img: FP + "Festival_of_Hyolmo_Community_in_Nepal.jpg?width=1600",
    alt: "Festival of the Hyolmo community",
    credit: "Hyolmo community festival (Wikimedia Commons)",
    creditUrl: FILE + "Festival_of_Hyolmo_Community_in_Nepal.jpg",
    text: "New languages are still being found, like Narphu, Tsum and Nubri Larke.",
    sub: "Some were already endangered by the time researchers identified them.",
    source: "Global Voices / Nepali Times, 2021", sourceUrl: GV },

  { img: FP + "Sakela_at_Nakhipot,_Kathmandu_Nepal.jpg?width=1600",
    alt: "Sakela festival at Nakhipot, Kathmandu",
    credit: "Sakela festival, Nakhipot (Wikimedia Commons)",
    creditUrl: FILE + "Sakela_at_Nakhipot,_Kathmandu_Nepal.jpg",
    text: "Nepal's Constitution gives every community the right to learn in its mother tongue.",
    sub: "Many schools still teach mostly in Nepali or English.",
    source: "Global Voices / Nepali Times, 2021", sourceUrl: GV },

  { img: FP + "Bajrayogini_Dance.jpg?width=1600",
    alt: "Newar Bajrayogini dance",
    credit: "Bajrayogini dance (Wikimedia Commons)",
    creditUrl: FILE + "Bajrayogini_Dance.jpg",
    text: "Give 5 minutes. Save a voice.",
    sub: "Verify a phrase, record a word, or learn one. Every small action counts." }
];

// =====================================================================
// PART 2: THE CAROUSEL (you normally don't need to edit this)
// =====================================================================
const carousel = document.querySelector(".carousel");   // only exists on the home page

if (carousel) {
  const slidesBox = carousel.querySelector(".slides");
  const dotsBox = carousel.querySelector(".dots");
  let current = 0;      // which slide is showing (0 = first)
  let timer;            // holds the auto-swipe timer

  // Build the HTML for every slide from the SLIDES list, plus one dot each
  SLIDES.forEach((s, i) => {
    const slide = document.createElement("article");
    slide.className = "slide";
    slide.innerHTML = `
      <img class="slide-img" src="${s.img}" alt="${s.alt}" ${i === 0 ? "" : 'loading="lazy"'}>
      <div class="slide-text">
        <p class="fact ${s.quote ? "quote" : ""}">${s.text}</p>
        <p class="sub">${s.sub}</p>
      </div>
      <div class="credit credit-left">Photo: <a href="${s.creditUrl}" target="_blank" rel="noopener">${s.credit}</a></div>
      ${s.source ? `<div class="credit credit-right">Source: <a href="${s.sourceUrl}" target="_blank" rel="noopener">${s.source}</a></div>` : ""}`;
    slidesBox.appendChild(slide);

    const dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.addEventListener("click", () => { show(i); restart(); });
    dotsBox.appendChild(dot);
  });

  const slideEls = slidesBox.querySelectorAll(".slide");
  const dotEls = dotsBox.querySelectorAll(".dot");

  // Show slide n. The "active" class is what CSS uses to fade it in.
  function show(n) {
    current = (n + SLIDES.length) % SLIDES.length;   // loops from last back to first
    slideEls.forEach((el, i) => el.classList.toggle("active", i === current));
    dotEls.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  function start() { timer = setInterval(() => show(current + 1), 7000); }   // 7000 ms = 7 seconds. Change the timing here.
  function restart() { clearInterval(timer); start(); }

  carousel.querySelector(".next").addEventListener("click", () => { show(current + 1); restart(); });
  carousel.querySelector(".prev").addEventListener("click", () => { show(current - 1); restart(); });
  carousel.addEventListener("mouseenter", () => clearInterval(timer));   // pause while hovering
  carousel.addEventListener("mouseleave", start);

  // Swipe on phones: drag left or right to change slide
  let startX = 0;
  carousel.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) { show(current + (dx < 0 ? 1 : -1)); restart(); }
  });

  show(0);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) start();
}

// =====================================================================
// PART 3: NEWSLETTER BOX (footer). For now it only shows a thank-you message.
// To really collect emails later, connect it to a service like Mailchimp or a Google Form.
// =====================================================================
const newsletter = document.getElementById("newsletter");
if (newsletter) {
  newsletter.addEventListener("submit", e => {
    e.preventDefault();   // stops the page from reloading
    document.getElementById("news-msg").textContent = "Thank you! You're on the list.";
    newsletter.reset();
  });
}

// =====================================================================
// PART 4: ACCOUNTS (pop-up, sign in, join, user menu)
// IMPORTANT: there is no server yet, so accounts are saved in THIS browser only (localStorage).
// That is fine for a hackathon demo. A real launch needs a backend (e.g. Supabase or Firebase Auth).
// Passwords are never stored as plain text: we store a salted SHA-256 hash.
// =====================================================================
(function () {
  const USERS_KEY = "sa_users";      // all accounts, saved in the browser
  const SESSION_KEY = "sa_session";  // email of whoever is logged in

  // ---------- small helpers ----------
  const loadUsers = () => { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; } catch (e) { return {}; } };
  const saveUsers = u => localStorage.setItem(USERS_KEY, JSON.stringify(u));
  const currentUser = () => loadUsers()[localStorage.getItem(SESSION_KEY)] || null;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const validEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validName = n => /^[A-Za-z0-9_.-]{2,20}$/.test(n);
  const nameTaken = (name, exceptEmail) => Object.values(loadUsers()).some(u => u.username.toLowerCase() === name.toLowerCase() && u.email !== exceptEmail);
  const salt = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

  async function hash(text) {   // turns a password into an unreadable fingerprint
    if (window.crypto && crypto.subtle) {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
    }
    return btoa(unescape(encodeURIComponent(text)));   // fallback for very old browsers
  }
  const passOk = (user, pw) => hash(user.salt + pw).then(h => h === user.passHash);

  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2800);
  }

  // ---------- build the pop-up once and add it to the page ----------
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <div class="modal-dim"></div>
    <section class="modal" role="dialog" aria-label="Account" hidden>
      <div class="modal-head"><div class="modal-tabs"></div>
        <button class="modal-close" aria-label="Close">&times;</button></div>
      <div class="modal-body"></div>
    </section>`;
  document.body.appendChild(wrap);
  const dim = wrap.querySelector(".modal-dim"), modal = wrap.querySelector(".modal");
  const tabs = wrap.querySelector(".modal-tabs"), body = wrap.querySelector(".modal-body");
  let googleMode = "login";   // remembers whether the Google form was opened from Login or Join

  const field = (label, id, type, extra = "") => `<label class="lbl" for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" ${extra}>`;
  const showPw = `<label class="check"><input type="checkbox" data-showpw> Show password</label>`;
  const googleBtn = text => `<div class="divider"><span>or</span></div><button type="button" class="google-btn" data-google><span class="g">G</span> ${text}</button>`;

  // ---------- the different screens inside the pop-up ----------
  const VIEWS = {
    login: () => ({ tabs: true, html: `
      <form data-form="login" novalidate>
        ${field("Email", "email", "email", 'autocomplete="email"')}
        ${field("Password", "pw", "password", 'autocomplete="current-password"')}
        <div class="row-between">${showPw}<a href="#" data-view="forgot">Forgot password?</a></div>
        <p class="form-msg" aria-live="polite"></p>
        <button class="btn btn-block">Log in</button>
      </form>${googleBtn("Sign in with Google")}` }),

    join: () => ({ tabs: true, html: `
      <form data-form="join" novalidate>
        ${field("Username", "username", "text", 'autocomplete="username" maxlength="20"')}
        ${field("Email", "email", "email", 'autocomplete="email"')}
        ${field("Password (6+ characters)", "pw", "password", 'autocomplete="new-password"')}
        <div class="row-between">${showPw}<span></span></div>
        <p class="form-msg" aria-live="polite"></p>
        <div class="btn-row">
          <button class="btn" type="submit" data-role="learner">Join as learner</button>
          <button class="btn" type="submit" data-role="volunteer">Join as volunteer</button>
        </div>
      </form>${googleBtn("Sign up with Google")}` }),

    // DEMO Google sign-in: asks for a Gmail address and uses the part before @ as the username.
    // Real Google login needs "Google Identity Services" and a client ID from Google Cloud Console.
    google: () => ({ title: "Continue with Google", html: `
      <form data-form="google" novalidate>
        <p class="note">Demo mode: enter your Gmail address. Your username becomes the part before the @.</p>
        ${field("Gmail address", "email", "email", 'placeholder="you@gmail.com"')}
        <p class="form-msg" aria-live="polite"></p>
        <button class="btn btn-block">Continue</button>
      </form>` }),

    forgot: () => ({ title: "Reset password", html: `
      <form data-form="forgot" novalidate>
        <p class="note">Demo mode: a real site would email you a link. Here you can set a new password directly.</p>
        ${field("Email", "email", "email")}
        ${field("New password", "pw", "password", 'autocomplete="new-password"')}
        <div class="row-between">${showPw}<span></span></div>
        <p class="form-msg" aria-live="polite"></p>
        <button class="btn btn-block">Reset password</button>
        <div class="row-between"><a href="#" data-view="login">Back to log in</a><span></span></div>
      </form>` }),

    username: () => ({ title: "Change username", html: `
      <form data-form="username" novalidate>
        ${field("New username", "username", "text", `maxlength="20" value="${esc(currentUser().username)}"`)}
        <p class="form-msg" aria-live="polite"></p>
        <button class="btn btn-block">Save username</button>
      </form>` }),

    password: () => ({ title: "Change password", html: `
      <form data-form="password" novalidate>
        ${currentUser().passHash ? field("Current password", "old", "password") : '<p class="note">Your account uses Google sign-in, so you can set a password now.</p>'}
        ${field("New password (6+ characters)", "pw", "password", 'autocomplete="new-password"')}
        <div class="row-between">${showPw}<span></span></div>
        <p class="form-msg" aria-live="polite"></p>
        <button class="btn btn-block">Save password</button>
      </form>` }),

    role: () => ({ title: "Switch role", html: `
      <p class="note">You are currently a <strong>${esc(currentUser().role)}</strong>. Choose how you want to take part:</p>
      <div class="btn-row" style="margin-top:1rem">
        <button class="btn ${currentUser().role === "learner" ? "" : "btn-ghost"}" data-setrole="learner">Learner</button>
        <button class="btn ${currentUser().role === "volunteer" ? "" : "btn-ghost"}" data-setrole="volunteer">Volunteer</button>
      </div>` }),

    delete: () => ({ title: "Delete account", html: `
      <form data-form="delete" novalidate>
        <p class="note">This permanently removes your account from this browser. Type <strong>DELETE</strong> to confirm.</p>
        ${field("Confirmation", "confirm", "text", 'autocomplete="off"')}
        <p class="form-msg" aria-live="polite"></p>
        <button class="btn btn-danger btn-block">Delete my account</button>
      </form>` })
  };

  function render(name) {
    const v = VIEWS[name]();
    tabs.innerHTML = v.tabs
      ? `<button class="tab ${name === "login" ? "active" : ""}" data-view="login">Log in</button>
         <button class="tab ${name === "join" ? "active" : ""}" data-view="join">Join</button>`
      : `<h2 class="modal-title">${v.title}</h2>`;
    body.innerHTML = v.html;
    const first = body.querySelector("input[type=text],input[type=email],input[type=password]");
    if (first && !matchMedia("(pointer: coarse)").matches) first.focus();
  }

  // ---------- open / close with animation ----------
  function openModal(name) {
    modal.classList.remove("closing");
    modal.hidden = false;
    dim.classList.add("show");
    render(name);
  }
  function closeModal() {
    if (modal.hidden || modal.classList.contains("closing")) return;
    modal.classList.add("closing");        // plays the slide-down animation
    dim.classList.remove("show");
    setTimeout(() => { modal.hidden = true; modal.classList.remove("closing"); }, 300);
  }

  // ---------- header: show buttons when logged out, user menu when logged in ----------
  function renderAuthArea() {
    const area = document.getElementById("auth-area");
    const u = currentUser();
    document.querySelectorAll(".cta").forEach(el => { el.hidden = !!u; });   // hide About-page join button once logged in
    if (!area) return;
    if (!u) {
      area.innerHTML = `<button class="btn" data-auth="login">Sign in</button>
        <button class="btn" data-auth="join">Join as volunteer or learner</button>`;
      return;
    }
    area.innerHTML = `
      <div class="user-wrap">
        <button class="user-btn" aria-haspopup="true" aria-expanded="false">
          <span class="avatar">${esc(u.username[0].toUpperCase())}</span><span>${esc(u.username)}</span></button>
        <div class="user-menu" hidden>
          <div class="menu-head"><strong>${esc(u.username)}</strong><small>${esc(u.email)}</small><span class="role-pill">${esc(u.role)}</span></div>
          <button class="menu-item" data-act="username">Change username</button>
          <button class="menu-item" data-act="password">Change password</button>
          <button class="menu-item" data-act="role">Switch role</button>
          <button class="menu-item" data-act="logout">Log out</button>
          <button class="menu-item danger" data-act="delete">Delete account</button>
        </div>
      </div>`;
  }
  const menuEl = () => document.querySelector(".user-menu");
  const closeMenu = () => { if (menuEl()) menuEl().hidden = true; };

  function logIn(email, msg) {
    localStorage.setItem(SESSION_KEY, email);
    closeModal(); renderAuthArea();
    toast(msg + currentUser().username);
  }

  // ---------- clicks anywhere on the page ----------
  document.addEventListener("click", e => {
    const t = e.target;

    const opener = t.closest("[data-auth]");              // Sign in / Join buttons
    if (opener) { openModal(opener.dataset.auth); return; }

    if (t.closest(".modal-close")) { closeModal(); return; }
    const v = t.closest("[data-view]");                   // tabs and "forgot password" links
    if (v && modal.contains(v)) { e.preventDefault(); openModal(v.dataset.view); return; }
    if (t.closest("[data-google]")) { googleMode = body.querySelector("[data-form=join]") ? "join" : "login"; openModal("google"); return; }

    const role = t.closest("[data-setrole]");             // Switch role screen
    if (role) {
      const users = loadUsers(), u = currentUser();
      users[u.email].role = role.dataset.setrole; saveUsers(users);
      closeModal(); renderAuthArea(); toast("You are now a " + role.dataset.setrole); return;
    }

    const ub = t.closest(".user-btn");                    // open / close the user menu
    if (ub) { const m = menuEl(); m.hidden = !m.hidden; ub.setAttribute("aria-expanded", String(!m.hidden)); return; }

    const act = t.closest("[data-act]");                  // items inside the user menu
    if (act) {
      closeMenu();
      if (act.dataset.act === "logout") { localStorage.removeItem(SESSION_KEY); renderAuthArea(); toast("Logged out"); }
      else openModal(act.dataset.act);
    }
  });

  // Show / hide password checkbox
  document.addEventListener("change", e => {
    if (e.target.matches("[data-showpw]")) {
      body.querySelectorAll("input[type=password], input[data-was-pw]").forEach(i => {
        i.type = e.target.checked ? "text" : "password"; i.dataset.wasPw = "1";
      });
    }
  });

  // CLICK OUTSIDE = close. We listen on "pointerdown" and never block the click, so the page behind keeps working.
  document.addEventListener("pointerdown", e => {
    const t = e.target;
    if (!modal.hidden && !modal.contains(t) && !t.closest("[data-auth]") && !t.closest(".user-wrap")) closeModal();
    if (!t.closest(".user-wrap")) closeMenu();
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeModal(); closeMenu(); } });

  // ---------- form submissions ----------
  body.addEventListener("submit", async e => {
    e.preventDefault();
    const form = e.target, kind = form.dataset.form, msg = form.querySelector(".form-msg");
    const val = id => (form.elements[id] ? form.elements[id].value.trim() : "");
    const fail = text => { msg.className = "form-msg"; msg.textContent = text; };
    const users = loadUsers();

    if (kind === "login") {
      const email = val("email").toLowerCase(), pw = form.elements.pw.value;
      const u = users[email];
      if (!validEmail(email) || !pw) return fail("Enter your email and password.");
      if (u && !u.passHash) return fail("This account uses Google sign-in. Use the Google button below.");
      if (!u || !(await passOk(u, pw))) return fail("Email or password is incorrect.");
      logIn(email, "Welcome back, ");
    }

    else if (kind === "join") {
      const username = val("username"), email = val("email").toLowerCase(), pw = form.elements.pw.value;
      const role = e.submitter && e.submitter.dataset.role ? e.submitter.dataset.role : "learner";
      if (!validName(username)) return fail("Username: 2-20 letters, numbers, . _ - only.");
      if (!validEmail(email)) return fail("Enter a valid email address.");
      if (pw.length < 6) return fail("Password needs at least 6 characters.");
      if (users[email]) return fail("An account with this email already exists. Try logging in.");
      if (nameTaken(username)) return fail("That username is taken.");
      const s = salt();
      users[email] = { username, email, role, salt: s, passHash: await hash(s + pw) };
      saveUsers(users);
      logIn(email, "Welcome, ");
    }

    else if (kind === "google") {
      const email = val("email").toLowerCase();
      if (!/^[^\s@]+@gmail\.com$/.test(email)) return fail("Enter a Gmail address (ending in @gmail.com).");
      if (!users[email]) {
        let base = email.split("@")[0].replace(/[^A-Za-z0-9_.-]/g, "").slice(0, 20) || "user", name = base, n = 1;
        while (nameTaken(name)) name = base.slice(0, 17) + (++n);
        users[email] = { username: name, email, role: "learner", salt: "", passHash: "" };
        saveUsers(users);
      }
      logIn(email, googleMode === "join" ? "Welcome, " : "Welcome back, ");
    }

    else if (kind === "forgot") {
      const email = val("email").toLowerCase(), pw = form.elements.pw.value;
      if (!users[email]) return fail("No account found with that email.");
      if (pw.length < 6) return fail("New password needs at least 6 characters.");
      users[email].salt = salt(); users[email].passHash = await hash(users[email].salt + pw);
      saveUsers(users);
      msg.className = "form-msg ok"; msg.textContent = "Password updated. You can log in now.";
      setTimeout(() => openModal("login"), 1200);
    }

    else if (kind === "username") {
      const name = val("username"), u = currentUser();
      if (!validName(name)) return fail("Username: 2-20 letters, numbers, . _ - only.");
      if (nameTaken(name, u.email)) return fail("That username is taken.");
      users[u.email].username = name; saveUsers(users);
      closeModal(); renderAuthArea(); toast("Username changed to " + name);
    }

    else if (kind === "password") {
      const u = currentUser(), pw = form.elements.pw.value;
      if (u.passHash && !(await passOk(u, val("old")))) return fail("Current password is incorrect.");
      if (pw.length < 6) return fail("New password needs at least 6 characters.");
      users[u.email].salt = salt(); users[u.email].passHash = await hash(users[u.email].salt + pw);
      saveUsers(users); closeModal(); toast("Password changed");
    }

    else if (kind === "delete") {
      if (val("confirm") !== "DELETE") return fail("Type DELETE (in capitals) to confirm.");
      delete users[currentUser().email]; saveUsers(users);
      localStorage.removeItem(SESSION_KEY);
      closeModal(); renderAuthArea(); toast("Your account was deleted");
    }
  });

  renderAuthArea();   // on page load: show the right buttons for the current state
})();
