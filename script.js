const buttons = document.querySelectorAll('#game button');
const result = document.getElementById('result');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const userChoice = button.dataset.choice;
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        let outcome = '';
        if (userChoice === computerChoice) {
            outcome = `Tie! Both chose ${userChoice}.`;
        } else if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            outcome = `You win! ${userChoice} beats ${computerChoice}.`;
        } else {
            outcome = `You lose! ${computerChoice} beats ${userChoice}.`;
        }

        result.textContent = outcome;
    });
});
