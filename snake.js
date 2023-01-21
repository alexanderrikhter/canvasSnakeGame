const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d'); 

let squareSize = 25;
let rows = 20;
let cols = 20;

//snake head

let snakeX = squareSize * 3;
let snakeY = squareSize * 3;

//food 

let foodX;
let foodY;

let speedX = 0;
let speedY = 0;

let snakeBody = [];

let gameOver = false;

canvas.height = squareSize * rows;
canvas.width = squareSize * cols;

function update() {
    if (gameOver) {
        return;
    }

    ctx.fillStyle="black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle="yellow";
    ctx.fillRect(foodX, foodY, squareSize, squareSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    ctx.fillStyle="blue";
    snakeX += speedX * squareSize;
    snakeY += speedY * squareSize;
    ctx.fillRect(snakeX, snakeY, squareSize, squareSize);
    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], squareSize, squareSize);
    }

    //gameover conditions

    //game over conditions
    if (snakeX < 0 || snakeX > cols*squareSize - 1 || snakeY < 0 || snakeY > rows*squareSize - 1) {
        gameOver = true;
        alert("Game Over");
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game   
        }
    }

}

const changeDirection = (e) => {
    if(e.code == 'ArrowUp' && speedY != 1 ) {
        speedX = 0;
        speedY = -1;
    }
    else if(e.code == 'ArrowDown' && speedY != -1 ) {
        speedX = 0;
        speedY = 1;
    }
    else if(e.code == 'ArrowLeft' && speedX != 1 ) {
        speedX = -1;
        speedY = 0;
    }
    else if(e.code == 'ArrowRight' && speedX != -1 ) {
        speedX = 1;
        speedY = 0;
    }
}

const placeFood = () => {
    ctx.clearRect(foodX, foodY, squareSize, squareSize);

    foodX = Math.floor(Math.random() * cols) * squareSize;
    foodY = Math.floor(Math.random() * rows) * squareSize;
}

placeFood();
document.addEventListener('keyup', changeDirection)
setInterval(update, 100);
