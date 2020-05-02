const square = document.querySelectorAll(".table__square");
const mole = document.querySelectorAll(".mole");
let timeCounter = document.querySelectorAll(".time__counter")[0];
let scoreCounter = document.querySelectorAll(".score__counter")[0];
let message = document.querySelector(".message");
let startCounter = document.querySelector(".startCounter");

let result = [];
let moleSquareId;
let currentTime = 60;
let timer;
let movementTimer;
let clicked = 0;
// scoreCounter.textContent = result;

//select random square to put the mole in
function randomSquare() {
    square.forEach(className => {
        className.classList.remove("mole");
    });
    let index = Math.floor(Math.random() * 9);
    let randomSquare = square[index];
    randomSquare.classList.add("mole");

    //where the mole is?
    moleSquareId = randomSquare.id;
}

//check
function score() {
    square.forEach(moleId => {
        moleId.addEventListener('click', () => {
            if (moleId.id == moleSquareId) {
                console.log(moleId.id)
                result.push('point');
                console.log(result)
                scoreCounter.textContent = result.length/clicked;
            }
        })
    })
}

//move the mole
function moveMole() {
    score();
    movementTimer = setInterval(randomSquare, 750);
}



//countdown
function countdown() {
    if (currentTime > 0) {
        currentTime--;
        timeCounter.textContent = currentTime;
    } else {
        checkCountdown();
    }
}

//check countdown
function checkCountdown() {
    clearInterval(timer);
    clearInterval(movementTimer);
    message.textContent = "Game Over!"
    setTimeout(() => {
        message.textContent = `Score: ${result.length}`
    }, 1500);
    setTimeout(() => {
        message.textContent = `Play again`
        message.classList.add("clickable");
        message.addEventListener('click', game)
    }, 3000);
}

//GAME
function game() {
    clicked = clicked + 1;
    message.textContent = "";
    result = [];
    currentTime = 60;
    timer = setInterval(countdown, 1000);
    moveMole();
}

document.addEventListener('DOMContentLoaded', () => {
    let readySetGo = 4;
    let startInterval = null;
    function start(){
        if (readySetGo > 0){
            readySetGo--
            startCounter.textContent = readySetGo;
        }
    }

    startInterval = setInterval(start, 1000)

    setTimeout(() => {
        startCounter.textContent = "";
        clearInterval(startInterval);
        game();
    }, 4000);

})