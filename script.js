const symbols = ["\\","@","#","¢","∞","&","÷","≠","?"];

let speed = 2000;
let index = 0;
let interval;
let sequencePlaying = true;


// Sonido único para la secuencia
const sequenceAudio = new Audio("Audio/sonido_loop.wav");

// Audio actual del modal (para poder cortarlo)
let modalAudio = null;

// Mezclar imágenes/audio en cada carga
const mediaMap = shuffle(symbols.map((_, i) => i));

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const symbolEl = document.getElementById("symbol");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");

function playSymbol() {
  symbolEl.textContent = symbols[index];

  // Reiniciar y reproducir siempre el mismo sonido
  sequenceAudio.currentTime = 0;
  sequenceAudio.play();

  index = (index + 1) % symbols.length;
}

function startLoop() {
  clearInterval(interval);
  interval = setInterval(playSymbol, speed);
}

function closeModal() {
  modal.style.visibility = "hidden";

  if (modalAudio) {
    modalAudio.pause();
    modalAudio.currentTime = 0;
    modalAudio = null;
  }
   if (sequencePlaying == false) {
  sequenceAudio.volume = 1;
  sequencePlaying = true;
  };
}

symbolEl.addEventListener("click", () => {
  let currentIndex = (index - 1 + symbols.length) % symbols.length;

  // Reducir velocidad
  speed = speed / 2;
  if (speed < 50) speed = 50;
  startLoop();

  // Buscar media asignada
  let mapped = mediaMap[currentIndex];

  modalImg.src = `Imagen/imagen_${mapped+1}.jpg`;
  modal.style.visibility = "visible";

  // Crear y reproducir audio del modal
  modalAudio = new Audio(`Audio/audio_${mapped+1}.wav`);
  modalAudio.play();

  // Cerrar al terminar
  modalAudio.onended = () => {
    closeModal();
  };
  //apagar secuencia mientras se reproduce el audio del modal
  if (sequencePlaying == true) {
  sequenceAudio.volume = 0;
  sequencePlaying = false;
  };
});

// Cerrar modal al clickearlo
modal.addEventListener("click", () => {
  closeModal();
 
});

// Inicial
startLoop();

// let started = false;

// function startExperience() {
//   if (!started) {
//     started = true;
//     startLoop();
//   }
// }

// document.addEventListener("click", startExperience, { once: true });