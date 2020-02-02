//canvas vars
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


//ball vars
var ballRadius = 10;
var x = (canvas.width - ballRadius) / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, Math.PI*2, false);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

//paddle vars
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = canvas.height - paddleHeight;
//paddle key var
var rightPressed = false;
var leftPressed = false;

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
}


function drawGameOver() {
    ctx.font = '30px Arial';
    ctx.fillText("Game Over! Try Again!", 45, 175);
}
//draw function
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();
    //ball movement
    x += dx;
    y += dy;
    //paddle movement
    if (rightPressed && paddleX + paddleWidth < canvas.width) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX += -7;
    }
    //wall collision logic + game over
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    } else if (y + dy < ballRadius || (y + dy > canvas.height - ballRadius && x + dx > paddleX && x + dx < paddleX + paddleWidth)) {
        dy = -dy;
    } else if (y + dy > canvas.height) {
       drawGameOver();
    }
}

function keyDownHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
    }
}


var interval = setInterval(draw, 10);

//event listeners for paddle movement
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
