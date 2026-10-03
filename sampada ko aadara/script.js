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
