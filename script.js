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

function getHumanChoice() {
    let choice = prompt("What will you play? (rock, paper, scissors)").toLowerCase();
    switch(choice) {
        case "rock":
        case "paper":
        case "scissors":
            return choice;
        default:
            return getHumanChoice();
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

function playGame() {
    let humanScore = 0;
    let computerScore = 0;
    const NUM_ROUNDS = 5;

    alert(`Rock paper scissors. Best of ${NUM_ROUNDS}. GO!`);

    for (let i = 0; i < NUM_ROUNDS; ++i) {
        let humanChoice = getHumanChoice();
        let computerChoice = getComputerChoice();
        switch (playRound(humanChoice, computerChoice)) {
            case HUMAN_WINS:
                alert(`You win this round! ${humanChoice} beats ${computerChoice}!`);
                ++humanScore;
                break;
            case COMPUTER_WINS:
                alert(`Computer wins this round! ${computerChoice} beats ${humanChoice}!`);
                ++computerScore;
                break;
            case TIE:
                ++humanScore;
                ++computerScore;
                alert(`Round tie! You played ${humanChoice} and the computer played ${computerChoice}!`);
                break;
        }
    }

    if (humanScore > computerScore) {
        alert(`You won! Your score: ${humanScore}, Computer's score: ${computerScore}`);
    } else if (humanScore < computerScore) {
        alert(`Computer won! Your score: ${humanScore}, Computer's score: ${computerScore}`);
    } else {
        alert(`Tie! Your score: ${humanScore}, Computer's score: ${computerScore}`);
    }
}

playGame();