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

let humanScore = 0;
let computerScore = 0;

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
        ++humanScore;
        console.log(`You win! ${humanChoice} beats ${computerChoice}!`);
    } else if (computerWin) {
        ++computerScore;
        console.log(`Computer wins! ${computerChoice} beats ${humanChoice}!`);
    } else {
        console.log(`Tie! You played ${humanChoice} and the computer played ${computerChoice}!`);
    }
}