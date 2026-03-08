const screenEnvelope = document.getElementById("screen-envelope");
const screenLetter = document.getElementById("screen-letter");
const screenYes = document.getElementById("screen-yes");
const envelopeBtn = document.getElementById("envelopeBtn");
const typeLine = document.getElementById("typeLine");
const actions = document.getElementById("actions");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noMsg = document.getElementById("noMsg");
const againBtn = document.getElementById("againBtn");
const confetti = document.getElementById("confetti");
const envelopeEl = document.querySelector(".envelope");

const messages = [
  "We don't accept 'no' today! ✨",
  "Try again... 🌸",
  "This button is just for decoration!",
  "Wrong direction! 🧚‍♀️",
  "The kitty insists you press the pink button!"
];

const womensDayNote = 
  "I wish you a day filled with many smiles, the scent of flowers, and wonderful moments. Stay as inspiring and radiant as you are! ✨🌷";

let msgIndex = 0;
let yesScale = 1;

function showScreen(screen) {
  [screenEnvelope, screenLetter, screenYes].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

function typeWriter(text, el, speed = 30) {
  el.textContent = "";
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

function openEnvelope() {
  envelopeEl.classList.add("opening");

  setTimeout(() => {
    showScreen(screenLetter);
    typeWriter(womensDayNote, typeLine);
  }, 1000); 
}

envelopeBtn.addEventListener("click", openEnvelope);

function dodgeNo() {
  const cRect = actions.getBoundingClientRect();
  const bRect = noBtn.getBoundingClientRect();
  const pad = 10;
  const maxX = cRect.width - bRect.width - pad * 2;
  const maxY = cRect.height - bRect.height - pad * 2;

  const x = pad + Math.random() * Math.max(0, maxX);
  const y = pad + Math.random() * Math.max(0, maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  noMsg.textContent = messages[msgIndex % messages.length];
  msgIndex++;

  yesScale = Math.min(yesScale + 0.15, 2.0);
  yesBtn.style.transform = `scale(${yesScale})`;
}

noBtn.addEventListener("mouseenter", dodgeNo);

function makeFlowers(amount = 35) {
  confetti.innerHTML = "";
  const flowers = ["🌸", "🌷", "🌹", "🌻", "✨"];
  for (let i = 0; i < amount; i++) {
    const f = document.createElement("div");
    f.className = "flower";
    f.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    f.style.left = `${Math.random() * 100}%`;
    f.style.animationDelay = `${Math.random() * 0.5}s`;
    f.style.fontSize = `${16 + Math.random() * 20}px`;
    confetti.appendChild(f);
  }
}

yesBtn.addEventListener("click", () => {
  const gifPath = "hellokitty.gif"; 
  showScreen(screenYes);
  makeFlowers(50);
  const finalMascot = document.getElementById("finalMascot");
  finalMascot.src = gifPath + "?v=" + Date.now();
});

againBtn.addEventListener("click", () => {
  msgIndex = 0;
  yesScale = 1;
  yesBtn.style.transform = "scale(1)";
  noMsg.textContent = "";
  envelopeEl.classList.remove("opening");
  showScreen(screenEnvelope);
});