const animals = ['🦁', '🐘', '🦒', '🦊', '🐼', '🦝', '🦄', '🦋'];
const gameBoard = document.getElementById('gameBoard');
const scoreElement = document.getElementById('score');
const movesElement = document.getElementById('moves');
const resetBtn = document.getElementById('resetBtn');

let cards = [];
let flippedCards = [];
let score = 0;
let moves = 0;
let canFlip = true;

function createCard(animal) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.animal = animal;
  card.addEventListener('click', flipCard);
  return card;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initializeGame() {
  gameBoard.innerHTML = '';
  cards = [];
  flippedCards = [];
  score = 0;
  moves = 0;
  canFlip = true;
  scoreElement.textContent = score;
  movesElement.textContent = moves;

  const gameAnimals = [...animals, ...animals];
  shuffleArray(gameAnimals);

  gameAnimals.forEach(animal => {
    const card = createCard(animal);
    cards.push(card);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (!canFlip || flippedCards.includes(this) || this.classList.contains('matched')) {
    return;
  }

  this.textContent = this.dataset.animal;
  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    movesElement.textContent = moves;
    canFlip = false;

    if (flippedCards[0].dataset.animal === flippedCards[1].dataset.animal) {
      score += 10;
      scoreElement.textContent = score;
      flippedCards.forEach(card => {
        card.classList.add('matched');
        card.classList.remove('flipped');
      });
      flippedCards = [];
      canFlip = true;

      if (document.querySelectorAll('.matched').length === cards.length) {
        setTimeout(() => {
          alert(`Congratulations! You won with ${moves} moves and scored ${score} points!`);
        }, 500);
      }
    } else {
      setTimeout(() => {
        flippedCards.forEach(card => {
          card.textContent = '';
          card.classList.remove('flipped');
        });
        flippedCards = [];
        canFlip = true;
      }, 1000);
    }
  }
}

resetBtn.addEventListener('click', initializeGame);
initializeGame();