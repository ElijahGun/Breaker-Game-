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

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
}
//draw function
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();
    x += dx;
    y += dy;
    //wall collision logic
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    } else if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        dy = -dy;
    }
}

setInterval(draw, 10);
