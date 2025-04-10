const choices = ['rock', 'paper', 'scissors'];
const buttons = document.querySelectorAll('.choice');
const scoreDisplay = document.getElementById('score-value');
const gameSection = document.querySelector('.game');
const resultSection = document.querySelector('.result');
const userPickEl = document.getElementById('user-pick');
const computerPickEl = document.getElementById('computer-pick');
const resultTextEl = document.getElementById('result-text');
const playAgainBtn = document.getElementById('play-again');

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
    setPickedIcon(computerPickEl, '');
  
    setTimeout(() => {
      setPickedIcon(computerPickEl, computer);
      resultTextEl.textContent = getResultText(result);
    }, 1000);
  }
  
  function setPickedIcon(container, choice) {
    container.innerHTML = '';
    if (!choice) return;
  
    const gradients = {
      rock: 'linear-gradient(to bottom, var(--rock-gradient-start), var(--rock-gradient-end))',
      paper: 'linear-gradient(to bottom, var(--paper-gradient-start), var(--paper-gradient-end))',
      scissors: 'linear-gradient(to bottom, var(--scissors-gradient-start), var(--scissors-gradient-end))',
    };
  
    container.style.background = gradients[choice];
    const img = document.createElement('img');
    img.src = `./images/icon-${choice}.svg`;
    img.alt = choice;
    container.appendChild(img);
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