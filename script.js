const choices = ['rock', 'paper', 'scissors'];
const buttons = document.querySelectorAll('.choice');
const scoreDisplay = document.getElementById('score-value');
const gameSection = document.querySelector('.game');
const resultSection = document.querySelector('.result');
const userPickEl = document.getElementById('user-pick');
const computerPickEl = document.getElementById('computer-pick');
const resultTextEl = document.getElementById('result-text');
const playAgainBtn = document.getElementById('play-again');
const rulesButton = document.getElementById('rules-button');
const rulesModal = document.getElementById('rules-modal');
const closeModalBtn = document.getElementById('close-modal');

let score = 0;

buttons.forEach(button => {
    button.addEventListener('click', () => {
      const playerChoice = button.dataset.choice;
      const computerChoice = getComputerChoice();
      const result = getResult(playerChoice, computerChoice);
  
      updateScore(result);
      showResult(playerChoice, computerChoice, result);
    });
  });

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getResult(player, computer) {
  if (player === computer) return 'draw';

  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'win';
  }

  return 'lose';
}

function updateScore(result) {
  if (result === 'win') score++;
  else if (result === 'lose') score--;

  scoreDisplay.textContent = score;
}

function showResult(player, computer, result) {
  gameSection.classList.add('hidden');
  resultSection.classList.remove('hidden');

  setPickedIcon(userPickEl, player);

  computerPickEl.innerHTML = '';
  const placeholder = document.createElement('div');
  placeholder.className = 'placeholder';
  computerPickEl.appendChild(placeholder);

  setTimeout(() => {
    computerPickEl.innerHTML = '';
    setPickedIcon(computerPickEl, computer);
    resultTextEl.textContent = getResultText(result);

    const winner = result === 'win' ? userPickEl : result === 'lose' ? computerPickEl : null;
    if (winner) {
      winner.firstElementChild.classList.add('winner');
    }
  }, 1000);
}
  
  function setPickedIcon(container, choice) {
    container.innerHTML = '';
    if (!choice) return;
  
    const outer = document.createElement('div');
    outer.className = `choice ${choice} static`;
  
    const inner = document.createElement('div');
    inner.className = 'inner-circle';
  
    const img = document.createElement('img');
    img.src = `./images/icon-${choice}.svg`;
    img.alt = choice;
  
    inner.appendChild(img);
    outer.appendChild(inner);
    container.appendChild(outer);
  }
  
  
  function getResultText(result) {
    if (result === 'win') return 'YOU WIN';
    if (result === 'lose') return 'YOU LOSE';
    return 'DRAW';
  }
  
  playAgainBtn.addEventListener('click', () => {
    resultSection.classList.add('hidden');
    gameSection.classList.remove('hidden');
  });

  rulesButton.addEventListener('click', () => {
    rulesModal.classList.remove('hidden');
    rulesModal.style.display = 'flex';
  });
  
  closeModalBtn.addEventListener('click', () => {
    rulesModal.classList.add('hidden');
    rulesModal.style.display = 'none';
  });