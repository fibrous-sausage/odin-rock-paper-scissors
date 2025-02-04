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
    switch (humanChoice.toLowerCase()) {
        case "rock":
            if (computerChoice === "paper") { ++computerScore; }
            if (computerChoice === "scissors") { ++humanScore; }
            break;
        case "paper":
            if (computerChoice === "rock") { ++humanScore; }
            if (computerChoice === "scissors") { ++computerScore; }
            break;
        case "scissors":
            if (computerChoice === "rock") { ++computerScore; }
            if (computerChoice === "paper") { ++humanScore; }
            break;
    }
}