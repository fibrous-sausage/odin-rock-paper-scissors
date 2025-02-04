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
    let choice = prompt("What will you play? (rock, paper, scissors)");
    switch(choice) {
        case "rock":
        case "paper":
        case "scissors":
            return choice;
        default:
            return getHumanChoice();
    }
}