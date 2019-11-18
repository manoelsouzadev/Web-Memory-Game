const cardBoard = document.querySelector('#cardboard');

const images = [
  'angular.svg',
  'aurelia.svg',
  'vue.svg',
  'react.svg',
  'backbone.svg',
  'ember.svg'
];

let cardHTML = '';

images.forEach(img => {
  cardHTML += `<div class="memory-card" data-card="${img}">
        <img class="front-face" src="img/${img}">
        <img class="back-face" src="img/js-badge.svg">
    </div>`;
});

cardBoard.innerHTML = cardHTML + cardHTML;

const cards = document.querySelectorAll('.memory-card');
let firstCard, secondCard;
let lockCard = false;
let score = 0;
let quantityClick = 0;

function flipCard() {
  quantityClick += 1;
  showGameClick(quantityClick);
  showGameScore();
  if (lockCard) {
    return false;
  }
  this.classList.add('flip');

  if (!firstCard) {
    firstCard = this;
    return false;
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  !isMatch ? disableCards() : resetCards(isMatch);
  verifyEndOfTheGame(isMatch);
}

function verifyEndOfTheGame(isMatch) {
  if (isMatch) {
    score = score + 1;
    if (score === 6) {
      setTimeout(() => {
        alert(
          'Você ganhou, parabéns!\nPontuação: ' +
            score +
            '\nClicks: ' +
            quantityClick
        );
      }, 400);
      setTimeout(() => {
        parent.window.document.location.href = '';
      }, 1000);
    }
    showGameScore();
  }
}

function showGameScore() {
  const placar = document.querySelector('#gameScore');
  const divClick = document.querySelector('#clicksInGame');
  placar.classList.add('gameScore');
  placar.innerHTML = `<h3>Pontuação: ${score}</h3>`;
  divClick.classList.add('clicksInGame');
  divClick.innerHTML = `<h3>Clicks: ${quantityClick}</h3>`;
  console.log(quantityClick);
}

function showGameClick(score) {
  console.log(score);
}

function disableCards() {
  lockCard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetCards();
  }, 1000);
}

(function shuffle() {
  cards.forEach(card => {
    let rand = Math.floor(Math.random() * 12);
    card.style.order = rand;
  });
})();

function resetCards(isMatch = false) {
  if (isMatch) {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  }
  [firstCard, secondCard, lockCard] = [null, null, false];
}

cards.forEach(card => {
  card.addEventListener('click', flipCard);
});
