const HUMAN_WINS = 0;
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

function playRound(humanChoice, computerChoice) {
    // We already sanitize the input above but it can't hurt to do it again.
    humanChoice.toLowerCase();
    computerChoice.toLowerCase();

    // 3 cases: human wins, computer wins, it's a tie. Tie results if neither wins.
    const humanWin = (humanChoice === "rock" && computerChoice === "scissors")
                || (humanChoice === "paper" && computerChoice === "rock")
                || (humanChoice === "scissors" && computerChoice === "paper");

    const computerWin = (computerChoice === "rock" && humanChoice === "scissors")
                || (computerChoice === "paper" && humanChoice === "rock")
                || (computerChoice === "scissors" && humanChoice === "paper");
    
    if (humanWin) {
        return HUMAN_WINS;
    } else if (computerWin) {
        return COMPUTER_WINS;
    } else {
        return TIE;
    }
}

let humanScore = 0;
let computerScore = 0;
let roundsPlayed = 0;

document.querySelector("#player-choices")
        .addEventListener('click', (event) => {
            if (roundsPlayed >= 5) return;

            const humanChoice = event.target.id;
            const computerChoice = getComputerChoice();
            switch(playRound(humanChoice, computerChoice)) {
                case HUMAN_WINS:
                    console.log(`You won this round! Computer played ${computerChoice}`);
                    ++humanScore;
                    break;
                case COMPUTER_WINS:
                    console.log(`Computer won this round! Computer played ${computerChoice}`);
                    ++computerScore;
                    break;
                case TIE:
                    console.log(`Round tie! Computer played ${computerChoice}`);
                    break;
            }

            ++roundsPlayed;

            if (roundsPlayed === 5) {
                if (humanScore > computerScore) {
                    console.log(`You won! Your score: ${humanScore}, Computer's score: ${computerScore}`);
                } else if (computerScore < humanScore) {
                    console.log(`Computer won! Your score: ${humanScore}, Computer's score: ${computerScore}`);
                } else {
                    console.log(`Game tie! Your score: ${humanScore}, Computer's score: ${computerScore}`);
                }
            }
});