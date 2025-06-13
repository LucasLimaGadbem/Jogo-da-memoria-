const icons = ['🍎','🍌','🍇','🍒','🥝','🍉','🍍','🍓'];

const gameBoard = document.getElementById('game');
const attemptsDisplay = document.getElementById('attempts');
const restartBtn = document.getElementById('restart');

let cardValues = [];
let flippedCards = [];
let matchedCards = 0;
let attempts = 0;
let lockBoard = false;

function shuffle(array) {
  for(let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  gameBoard.innerHTML = '';
  attempts = 0;
  matchedCards = 0;
  attemptsDisplay.textContent = `Tentativas: ${attempts}`;
  flippedCards = [];
  lockBoard = false;

  cardValues = shuffle([...icons, ...icons]);

  cardValues.forEach((icon, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = icon;
    card.dataset.index = index;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${icon}</div>
        <div class="card-back">❓</div>
      </div>
    `;

    gameBoard.appendChild(card);

    card.addEventListener('click', () => flipCard(card));
  });
}

function flipCard(card) {
  if (lockBoard) return;
  if (flippedCards.includes(card)) return;
  if (card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  lockBoard = true;
  attempts++;
  attemptsDisplay.textContent = `Tentativas: ${attempts}`;

  const [card1, card2] = flippedCards;

  if (card1.dataset.icon === card2.dataset.icon) {
    matchedCards += 2;
    flippedCards = [];
    lockBoard = false;
    if (matchedCards === cardValues.length) {
      setTimeout(() => alert(`Parabéns! Você ganhou em ${attempts} tentativas!`), 300);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

restartBtn.addEventListener('click', createBoard);

createBoard();
