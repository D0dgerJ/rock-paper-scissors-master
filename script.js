const choices = ['rock', 'paper', 'scissors'];
const buttons = document.querySelectorAll('.choice');
const scoreDisplay = document.getElementById('score-value');

let score = 0;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);

    updateScore(result);
    console.log(`You: ${playerChoice}, Bot: ${computerChoice} -> ${result}`);
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
