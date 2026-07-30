let difficulty = "";
let bestOf = 3;

let playerScore = 0;
let computerScore = 0;
let round = 1;

let lastPlayerMove = "rock";

const moves = ["rock", "paper", "scissors"];

let stats = JSON.parse(localStorage.getItem("rpsStats")) || {
    matches: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    points: 0
};

// ================= DIFFICULTY =================

function setDifficulty(level) {

    difficulty = level;

    document.getElementById("matchBox").classList.remove("hidden");

}

// ================= MATCH TYPE =================

function setMatch(number) {

    bestOf = number;

    document.getElementById("matchTitle").innerHTML =
        "Best Of " + number;

}

// ================= START GAME =================

function startGame() {

    if (difficulty === "") {

        alert("Please select difficulty level");
        return;

    }

    document.getElementById("startPage").classList.add("hidden");
    document.getElementById("gamePage").classList.remove("hidden");

    updateScore();

}

// ================= PLAYER MOVE =================

function play(playerMove) {

    lastPlayerMove = playerMove;

    document.getElementById("result").innerHTML =
        "🤖 Computer is thinking...";

    setTimeout(() => {

        const computerMove = getComputerMove();

        showComputerChoice(computerMove);

        const result = checkWinner(playerMove, computerMove);

        if (result === "win") {

            playerScore++;

            document.getElementById("result").innerHTML =
                "🎉 You Win This Round";

        }

        else if (result === "lose") {

            computerScore++;

            document.getElementById("result").innerHTML =
                "😢 Computer Wins This Round";

        }

        else {

            stats.draws++;
            saveStats();

            document.getElementById("result").innerHTML =
                "🤝 Tie! Same Round Again";

            return;

        }

        updateScore();

        checkMatchWinner();

    }, 800);

}

// ================= COMPUTER AI =================

function getComputerMove() {

    // EASY

    if (difficulty === "easy") {

        return moves[Math.floor(Math.random() * 3)];

    }

    // MEDIUM

    if (difficulty === "medium") {

        if (Math.random() < 0.5) {

            return moves[Math.floor(Math.random() * 3)];

        }

        return counterMove(lastPlayerMove);

    }

    // HARD

    return counterMove(lastPlayerMove);

}

function counterMove(move) {

    if (move === "rock") return "paper";
    if (move === "paper") return "scissors";

    return "rock";

}

// ================= WINNER LOGIC =================

function checkWinner(player, computer) {

    if (player === computer) {

        return "draw";

    }

    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {

        return "win";

    }

    return "lose";

}

// ================= SHOW COMPUTER MOVE =================

function showComputerChoice(choice) {

    const emoji = {
        rock: "🪨",
        paper: "📄",
        scissors: "✂️"
    };

    document.getElementById("computerChoice").innerHTML =
        emoji[choice];

}

// ================= UPDATE SCORE =================

function updateScore() {

    document.getElementById("playerScore").innerHTML =
        playerScore;

    document.getElementById("opponentScore").innerHTML =
        computerScore;

    document.getElementById("roundNumber").innerHTML =
        round;

}

// ================= MATCH WINNER =================

function checkMatchWinner() {

    const neededWins = Math.ceil(bestOf / 2);

    if (playerScore === neededWins) {

        finishGame(true);

    }

    else if (computerScore === neededWins) {

        finishGame(false);

    }

    else {

        round++;

        updateScore();

    }

}

// ================= FINISH GAME =================

function finishGame(playerWon) {

    document.getElementById("gamePage").classList.add("hidden");
    document.getElementById("resultPage").classList.remove("hidden");

    if (playerWon) {

        document.getElementById("winnerText").innerHTML =
            "🏆 You Won The Match";

        stats.wins++;
        stats.points += 3;

    }

    else {

        document.getElementById("winnerText").innerHTML =
            "😢 Computer Won The Match";

        stats.losses++;

    }

    stats.matches++;

    document.getElementById("finalResult").innerHTML =
        playerScore + " - " + computerScore;

    saveStats();

}

// ================= DASHBOARD =================

function showDashboard() {

    document.getElementById("dashboard").classList.remove("hidden");

    updateDashboard();

}

function hideDashboard() {

    document.getElementById("dashboard").classList.add("hidden");

}

function updateDashboard() {

    document.getElementById("matches").innerHTML = stats.matches;
    document.getElementById("wins").innerHTML = stats.wins;
    document.getElementById("losses").innerHTML = stats.losses;
    document.getElementById("draws").innerHTML = stats.draws;
    document.getElementById("points").innerHTML = stats.points;

}

function saveStats() {

    localStorage.setItem(
        "rpsStats",
        JSON.stringify(stats)
    );

}

// ================= BUTTONS =================

function restartGame() {

    playerScore = 0;
    computerScore = 0;
    round = 1;

    document.getElementById("computerChoice").innerHTML = "❓";
    document.getElementById("result").innerHTML = "Make Your Move";

    updateScore();

}

function restartMatch() {

    restartGame();

    document.getElementById("resultPage").classList.add("hidden");
    document.getElementById("gamePage").classList.remove("hidden");

}

function goHome() {

    location.reload();

}
