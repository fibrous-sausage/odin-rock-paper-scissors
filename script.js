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

function choiceToEmoji(choice) {
    switch(choice) {
        case "rock": return "🪨";
        case "paper": return "📄";
        case "scissors": return "✂️";
        default: "";
    }
}

let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;
let gameOver = false;

const results = [...document.querySelectorAll("#results p")];
const choiceDisplay = results[0]
const gameStateDisplay = results[1];
const roundPlayedDisplay = results[2];
const playerScoreDisplay = results[3];
const computerScoreDisplay = results[4];

document.querySelector("#player-choices")
        .addEventListener('click', (event) => {
            if (gameOver) return;

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
            gameOver = roundsPlayed === 5;

            playerScoreDisplay.textContent = `Player score: ${playerScore}`;
            computerScoreDisplay.textContent = `Computer score: ${computerScore}`;
            choiceDisplay.textContent = `${choiceToEmoji(playerChoice)} vs. ${choiceToEmoji(computerChoice)}`;

            if (!gameOver) {
                roundPlayedDisplay.textContent = `Round ${roundsPlayed + 1}`;

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
            } else {
                roundPlayedDisplay.textContent = `Game over`;

                if (playerScore > computerScore) {
                    gameStateDisplay.textContent = `You won!`;
                } else if (playerScore < computerScore) {
                    gameStateDisplay.textContent = `Computer won!`;
                } else {
                    gameStateDisplay.textContent = `Game tie!`;
                }
            }
});