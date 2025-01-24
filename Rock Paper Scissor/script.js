let userScore = 0;
let computerScore = 0;
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector(".msg");
const userScorepara = document.querySelector("#userscore");
const computerScorepara = document.querySelector("#computerscore");

const drawgame = () => {
    console.log("Draw Game");
    msg.innerText = "It's a Draw!";
    msg.style.backgroundColor = "#14213d";
    msg.style.color = "white";
};

const genComputerchoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const showWinner = (userwin) => {
    if (userwin) {
        console.log("User Wins");
        userScore++;
        userScorepara.innerText = userScore;
        msg.innerText = "User Wins!";
        msg.style.backgroundColor = "green";
    } else {
        console.log("You Lose");
        computerScore++;
        computerScorepara.innerText = computerScore;
        msg.innerText = "Computer Wins!";
        msg.style.backgroundColor = "red";
    }
};

const playgame = (userchoice) => {
    console.log("User choice =", userchoice);
    const computerChoice = genComputerchoice();
    console.log("Computer choice =", computerChoice);
    if (userchoice === computerChoice) {
        drawgame();
    } else {
        let userwin = true;
        if (userchoice === "rock") {
            if (computerChoice === "paper") {
                userwin = false;
            }
        } else if (userchoice === "paper") {
            if (computerChoice === "scissors") {
                userwin = false;
            }
        } else {
            if (computerChoice === "rock") {
                userwin = false;
            }
        }
        showWinner(userwin);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id");
        playgame(userchoice);
    });
});
