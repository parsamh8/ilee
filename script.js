const imageSources = [
  "assets/image1.jpg",
  "assets/image2.jpg",
  "assets/image3.jpg",
  "assets/image4.jpg",
  "assets/image5.jpg",
  "assets/image6.jpg",
  "assets/image7.jpg",
  "assets/image8.jpg"
];

const cardsLayer = document.getElementById("cardsLayer");
const overlay = document.getElementById("overlay");
const cardModal = document.getElementById("cardModal");
const contactModal = document.getElementById("contactModal");
const modalImage = document.getElementById("modalImage");
const contactTrigger = document.getElementById("contactTrigger");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");
const bgMusic = document.getElementById("bgMusic");

let activeCard = null;
let activeDialog = null;
let musicStarted = false;

function createCard(src, index) {
  const card = document.createElement("button");
  card.className = "floating-card";
  card.type = "button";

  const img = document.createElement("img");
  img.src = src;
  img.alt = `Portfolio image ${index + 1}`;
  img.loading = "lazy";

  card.style.left = `${Math.random() * 88}%`;
  card.style.top = `${-20 - Math.random() * 80}vh`;
  card.style.animationDuration = `${28 + Math.random() * 20}s`;
  card.style.animationDelay = `${-Math.random() * 24}s`;

  card.appendChild(img);

  card.addEventListener("mouseenter", () => {
    if (!activeDialog) {
      card.style.animationPlayState = "paused";
    }
  });

  card.addEventListener("mouseleave", () => {
    if (!activeDialog) {
      card.style.animationPlayState = "running";
    }
  });

  card.addEventListener("click", (event) => {
    event.stopPropagation();
    openCard(card, src);
  });

  return card;
}

function populateCards() {
  imageSources.forEach((src, index) => {
    const card = createCard(src, index);
    cardsLayer.appendChild(card);
  });
}

function openOverlay(dialogName) {
  activeDialog = dialogName;
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeOverlay() {
  activeDialog = null;
  overlay.classList.remove("active");
  cardModal.classList.remove("active");
  contactModal.classList.remove("active");
  document.body.style.overflow = "hidden";

  if (activeCard) {
    activeCard.style.animationPlayState = "running";
    activeCard = null;
  }
}

function openCard(card, src) {
  if (activeCard && activeCard !== card) {
    activeCard.style.animationPlayState = "running";
  }

  activeCard = card;
  activeCard.style.animationPlayState = "paused";
  modalImage.src = src;
  openOverlay("card");
  cardModal.classList.add("active");
}

function openContact() {
  openOverlay("contact");
  contactModal.classList.add("active");
}

function setPauseIcon() {
  musicIcon.innerHTML =
    '<rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect>';
}

function setPlayIcon() {
  musicIcon.innerHTML =
    '<polygon points="6 3 20 12 6 21 6 3"></polygon>';
}

async function tryStartMusic() {
  try {
    await bgMusic.play();
    musicStarted = true;
    setPauseIcon();
  } catch (error) {
    musicStarted = false;
    setPlayIcon();
  }
}

async function toggleMusic(event) {
  event.stopPropagation();

  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      musicStarted = true;
      setPauseIcon();
    } catch (error) {
      setPlayIcon();
    }
  } else {
    bgMusic.pause();
    setPlayIcon();
  }
}

contactTrigger.addEventListener("click", (event) => {
  event.stopPropagation();
  openContact();
});

musicToggle.addEventListener("click", toggleMusic);
overlay.addEventListener("click", closeOverlay);
cardModal.addEventListener("click", closeOverlay);
contactModal.addEventListener("click", closeOverlay);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeOverlay();
  }
});

bgMusic.addEventListener("play", () => {
  setPauseIcon();
});

bgMusic.addEventListener("pause", () => {
  setPlayIcon();
});

bgMusic.addEventListener("ended", () => {
  bgMusic.currentTime = 0;
  bgMusic.play().catch(() => {});
});

window.addEventListener("load", () => {
  setPauseIcon();
  tryStartMusic();
});


function buildCircularText() {
    const orbitText = document.querySelector(".orbit-text");
    if (!orbitText) return;
    
    const rawText = `He used to punish his body at the gym. Extra reps for every mistake, longer runs for every bad day, thinking discipline meant pain. But nothing really changed except the quiet resentment he felt toward himself. The body doesn’t respond to punishment, it responds to partnership.`;
    
    orbitText.innerHTML = "";
    
    const text = rawText + " " + rawText;
    const radius = 700;
    const total = text.length;
    const step = 360 / (total * 0.75);

  for (let i = 0; i < total; i++) {
      const span = document.createElement("span");
      span.textContent = text[i];
      span.style.transform = `rotate(${i * step}deg) translateY(-${radius}px)`;
      orbitText.appendChild(span);
    }
}

populateCards();
buildCircularText();

const iconTrigger = document.getElementById("iconTrigger");
const iconLabel = document.getElementById("iconLabel");

iconTrigger.addEventListener("mouseenter", () => {
  iconLabel.classList.add("show");
});