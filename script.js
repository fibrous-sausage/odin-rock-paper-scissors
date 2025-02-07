const PLAYER_WINS = 0;
const COMPUTER_WINS = 1;
const TIE = 2;

function getComputerChoice() {
    const choice = Math.floor(Math.random() * 3);
    switch(choice) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
        default:
            return "";
    }
}

function playRound(playerChoice, computerChoice) {
    // We already sanitize the input above but it can't hurt to do it again.
    playerChoice.toLowerCase();
    computerChoice.toLowerCase();

    // 3 cases: player wins, computer wins, it's a tie. Tie results if neither wins.
    const playerWin = (playerChoice === "rock" && computerChoice === "scissors")
                || (playerChoice === "paper" && computerChoice === "rock")
                || (playerChoice === "scissors" && computerChoice === "paper");

    const computerWin = (computerChoice === "rock" && playerChoice === "scissors")
                || (computerChoice === "paper" && playerChoice === "rock")
                || (computerChoice === "scissors" && playerChoice === "paper");
    
    if (playerWin) {
        return PLAYER_WINS;
    } else if (computerWin) {
        return COMPUTER_WINS;
    } else {
        return TIE;
    }
}

let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;

const results = [...document.querySelectorAll("#results p")];
const gameStateDisplay = results[0];
const roundPlayedDisplay = results[1];
const playerScoreDisplay = results[2];
const computerScoreDisplay = results[3];


document.querySelector("#player-choices")
        .addEventListener('click', (event) => {
            if (roundsPlayed >= 5) return;

            const playerChoice = event.target.id;
            const computerChoice = getComputerChoice();
            const roundResult = playRound(playerChoice, computerChoice);

            switch(roundResult) {
                case PLAYER_WINS:
                    ++playerScore;
                    break;
                case COMPUTER_WINS:
                    ++computerScore;
                    break;
                case TIE:
                    break;
            }

            ++roundsPlayed;

            playerScoreDisplay.textContent = `Player score: ${playerScore}`;
            computerScoreDisplay.textContent = `Computer score: ${computerScore}`;

            if (roundsPlayed === 5) {
                roundPlayedDisplay.textContent = `Game over`;
                if (playerScore > computerScore) {
                    gameStateDisplay.textContent = `You won!`;
                } else if (computerScore < playerScore) {
                    gameStateDisplay.textContent = `Computer won!`;
                } else {
                    gameStateDisplay.textContent = `Game tie!`;
                }
            } else {
                switch (roundResult) {
                    case PLAYER_WINS:
                    gameStateDisplay.textContent = `You won this round!`;
                    break;
                case COMPUTER_WINS:
                    gameStateDisplay.textContent = `Computer won this round!`;
                    break;
                case TIE:
                    gameStateDisplay.textContent = `Round tie!`;
                    break;
                }
                roundPlayedDisplay.textContent = `Round ${roundsPlayed + 1}`;
            }
});