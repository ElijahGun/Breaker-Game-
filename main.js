//canvas vars
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var body = document.getElementById('body');


//ball vars
var ballRadius = 10;
var x = (canvas.width - ballRadius) / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, Math.PI*2, false);
    ctx.fillStyle = 'chartreuse';
    ctx.fill();
    ctx.closePath();
}

function returnBall() {
    x = (canvas.width - ballRadius) / 2;
y = canvas.height - 30;
dx = 2;
dy = -2;
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

var spacePressed = false;
var gameOver = false;

function drawGameOver() {
    canvas.style.backgroundImage = 'url(./you_lose.png)';
    canvas.style.backgroundSize = 'contain';
    ctx.beginPath();
    ctx.font = '30px Arial';
    ctx.fillText("HAHAHA LOL! Try Again!", 70, 375);
    ctx.fillText('Press spacebar to reset', 70, 450, 480);
    ctx.closePath();
}

//brick vars
var brickHeight = 20;
var brickWidth = 75;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var brickPadding = 10;
var brickColumns = 5;
var brickRows = 3;
var brickX = 0;
var brickY = 0;
//brick 2d arr
var bricks = [];
for (let c = 0; c < brickColumns; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRows; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1}
    }
}

function drawBricks() {
    for (let c = 0; c < brickColumns; c++) {
        for (let r = 0; r < brickRows; r++){
        var b = bricks[c][r]; 
            brickX= (c * (brickWidth + brickPadding)) + brickOffsetLeft;
            brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            b.x = brickX;
            b.y = brickY;
            if (b.status == 1) {
                ctx.beginPath();
                ctx.rect(b.x, b.y, brickWidth, brickHeight);
                ctx.fillStyle = 'brown';
                ctx.fill();
                ctx.closePath(); 
            }
      
        }
        }
    }

    function brickCollision() {
        for (let c = 0; c < brickColumns; c++) {
            for (let r = 0; r < brickRows; r++) {
                var brick = bricks[c][r]
                if (brick.status == 1) {
                    if (x + dx > brick.x && x + dx < brick.x + brickWidth && y + dy > brick.y && y + dy < brick.y + brickHeight) {
                        brick.status = 0;
                        dy = -dy;
                        score ++;
                    }                }
                
            }
            
        }
    }

    var score = 0;
    //keeps score
    function drawScore() {
        
        ctx.font = '20px serif';
        ctx.fillText(`Score: ${score}`, 400, 20);    
        //ctx.strokeStyle = 'chartreuse';
    }

    var lives = 0;
    //keeps score
    function drawLives() {
        
        ctx.font = '20px serif';
        ctx.fillText(`Lives: ${lives}`, 20, 20);    
        //ctx.strokeStyle = 'chartreuse';
    }

    function winLevel() {
        if (score == (brickColumns*brickRows)) {
            dx = 0;
            dy = 0;
            canvas.style.backgroundImage = 'url(./win.png)';
            canvas.style.backgroundSize = 'contain'
        }
    }
   
//draw function
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawScore();
    drawLives();
    drawPaddle();
    drawBricks();
    brickCollision();
    winLevel();
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
    } else if (y + dy > canvas.height +20) {
        if (lives == 0) {
            gameOver = true;
            drawGameOver();
        } else if (lives > 0) {
            lives --;
            returnBall();
        }
        
    }

    //reset logic
    if (gameOver && spacePressed) {
        clearInterval(interval);
        document.location.reload();
    }
}

function keyDownHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    } else if (e.key == ' ') {
        spacePressed = true;
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
