let mode = "";
let difficulty = "";

let bestOf = 3;

let playerScore = 0;
let opponentScore = 0;

let round = 1;

let playerChoice = "";
let player2Choice = "";

let stats = JSON.parse(localStorage.getItem("rpsStats")) || {

    matches: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    points: 0

};


const moves = ["rock","paper","scissors"];





// ================= MODE SELECTION =================


function selectMode(selectedMode){

    mode = selectedMode;


    document
    .getElementById("matchBox")
    .classList.add("hidden");



    if(mode === "computer"){


        document
        .getElementById("difficultyBox")
        .classList.remove("hidden");


        document
        .getElementById("player2Name")
        .innerHTML="Computer";


    }



    else{


        document
        .getElementById("difficultyBox")
        .classList.add("hidden");


        document
        .getElementById("matchBox")
        .classList.remove("hidden");


        document
        .getElementById("player2Name")
        .innerHTML="Player 2";


        document
        .getElementById("multiplayerBox")
        .classList.remove("hidden");


    }


}







// ================= DIFFICULTY =================


function setDifficulty(level){

    difficulty = level;


    document
    .getElementById("matchBox")
    .classList.remove("hidden");


}







// ================= MATCH TYPE =================


function setMatch(number){

    bestOf = number;


    document
    .getElementById("matchTitle")
    .innerHTML =
    "Best Of " + number;


}







// ================= START GAME =================


function startGame(){


    if(mode===""){

        alert("Choose Game Mode");

        return;

    }



    if(mode==="computer" && difficulty===""){

        alert("Choose Difficulty");

        return;

    }



    document
    .getElementById("startPage")
    .classList.add("hidden");



    document
    .getElementById("gamePage")
    .classList.remove("hidden");


}







// ================= PLAYER 1 MOVE =================


function selectChoice(choice){


    playerChoice = choice;



    if(mode==="computer"){


        let computer =
        computerMove();


        playRound(
            playerChoice,
            computer
        );


    }



    else{


        document
        .getElementById("waitingText")
        .innerHTML =
        "Player 1 Selected ✔ Waiting for Player 2";


    }


}







// ================= PLAYER 2 MOVE =================


function playerTwoChoice(choice){


    player2Choice = choice;



    if(playerChoice===""){


        document
        .getElementById("waitingText")
        .innerHTML =
        "Waiting for Player 1";


        return;

    }



    playRound(
        playerChoice,
        player2Choice
    );


}








// ================= COMPUTER AI =================


function computerMove(){



    if(difficulty==="easy"){


        return moves[
            Math.floor(Math.random()*3)
        ];


    }





    if(difficulty==="medium"){


        let random =
        Math.random();



        if(random < 0.5){


            return moves[
            Math.floor(Math.random()*3)
            ];


        }


        return counterMove(playerChoice);


    }






    if(difficulty==="hard"){


        return counterMove(playerChoice);


    }


}






function counterMove(move){


    if(move==="rock")
        return "paper";


    if(move==="paper")
        return "scissors";


    return "rock";


}







// ================= GAME ROUND =================


function playRound(player, opponent){


    showOpponent(opponent);



    let result =
    checkWinner(player,opponent);




    if(result==="win"){


        playerScore++;


        document
        .getElementById("result")
        .innerHTML =
        "🎉 You Won This Round";


    }



    else if(result==="lose"){


        opponentScore++;


        document
        .getElementById("result")
        .innerHTML =
        "😢 Opponent Won This Round";


    }



    else{


        document
        .getElementById("result")
        .innerHTML =
        "🤝 Tie! Playing Same Round Again";


        resetChoices();

        return;

    }



    updateScore();


    checkMatchWinner();



}








// ================= WINNER CHECK =================


function checkWinner(player,opponent){



    if(player===opponent){

        return "draw";

    }



    if(

        player==="rock" &&
        opponent==="scissors"

        ||

        player==="paper" &&
        opponent==="rock"

        ||

        player==="scissors" &&
        opponent==="paper"

    ){

        return "win";

    }


    return "lose";


}







// ================= MATCH WINNER =================


function checkMatchWinner(){


    let needed =
    Math.ceil(bestOf/2);



    if(playerScore===needed){


        finishGame(true);


    }



    else if(opponentScore===needed){


        finishGame(false);


    }



    else{


        round++;


        resetChoices();


    }


}








// ================= FINISH =================


function finishGame(playerWon){



    document
    .getElementById("gamePage")
    .classList.add("hidden");



    document
    .getElementById("resultPage")
    .classList.remove("hidden");





    if(playerWon){


        document
        .getElementById("winnerText")
        .innerHTML =
        "🏆 You Won The Match";



        stats.wins++;

        stats.points +=3;


    }



    else{


        document
        .getElementById("winnerText")
        .innerHTML =
        "😢 Opponent Won";


        stats.losses++;


    }



    stats.matches++;



    document
    .getElementById("finalResult")
    .innerHTML =

    playerScore +
    " - " +
    opponentScore;



    saveStats();


}








// ================= DISPLAY =================


function showOpponent(choice){


    let emoji = {


        rock:"🪨",

        paper:"📄",

        scissors:"✂️"


    };



    document
    .getElementById("computerChoice")
    .innerHTML =
    emoji[choice];


}








function updateScore(){


    document
    .getElementById("playerScore")
    .innerHTML =
    playerScore;



    document
    .getElementById("opponentScore")
    .innerHTML =
    opponentScore;



    document
    .getElementById("roundNumber")
    .innerHTML =
    round;


}








function resetChoices(){


    playerChoice="";

    player2Choice="";


}








// ================= BUTTONS =================


function restartMatch(){


    playerScore=0;

    opponentScore=0;

    round=1;


    document
    .getElementById("resultPage")
    .classList.add("hidden");


    document
    .getElementById("gamePage")
    .classList.remove("hidden");


    updateScore();


}





function restartGame(){


    playerScore=0;

    opponentScore=0;

    round=1;


    updateScore();


}






function goHome(){


    location.reload();


}







// ================= DASHBOARD =================


function showDashboard(){


    document
    .getElementById("dashboard")
    .classList.remove("hidden");


    updateDashboard();


}





function hideDashboard(){


    document
    .getElementById("dashboard")
    .classList.add("hidden");


}







function saveStats(){


    localStorage.setItem(

        "rpsStats",

        JSON.stringify(stats)

    );


}







function updateDashboard(){



    document
    .getElementById("matches")
    .innerHTML =
    stats.matches;



    document
    .getElementById("wins")
    .innerHTML =
    stats.wins;



    document
    .getElementById("losses")
    .innerHTML =
    stats.losses;



    document
    .getElementById("draws")
    .innerHTML =
    stats.draws;



    document
    .getElementById("points")
    .innerHTML =
    stats.points;



}
