





//variables
var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;
var player1Score = 0;
var player2Score = 0;
var showingWinScreen = false;
var paddle1Y = 250;
var paddle2Y = 250;
// const never change
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;
const WINNING_SCORE = 10;

// mouse moves paddle 1 (left)
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}

// click to restart game
function handleMouseClick(evt) {
    if(showingWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
}

// load all before starting
window.onload = function()  {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.font = "3vw Poppins"
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousedown',handleMouseClick);

    canvas.addEventListener('mousemove',
        function(evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
        }
    );
}

// start ball from middle in oposite direction after miss
function ballReset() {
    if( player1Score >= WINNING_SCORE || 
        player2Score >= WINNING_SCORE) {
            showingWinScreen = true;
        }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

// computer paddle 2 (right) moves in the direction of the ball
function computerMovement() {
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if(paddle2YCenter < ballY - 35) {
        paddle2Y += 6;
    }
    else if(paddle2YCenter > ballY + 35){
        paddle2Y -= 6;
    }
}

// how the objects move
function moveEverything() {
    // check for win 
    if(showingWinScreen) {
        return;
    }
    // call computer paddle movement
    computerMovement();
    // ballspeed depends on paddle touch on ball (ends are faster)
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // add score or change ball direction and speed
    if (ballX < 0) {
        if( ballY > paddle1Y &&
            ballY < paddle1Y + 
            PADDLE_HEIGHT) 
            {
                ballSpeedX = -ballSpeedX;
                var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
                ballSpeedY = deltaY * 0.35;
            } 
        else {
            player2Score ++; // player score add one
            ballReset();
            }
    }
    if (ballX > canvas.width) {
        if( ballY > paddle2Y &&
            ballY < paddle2Y + 
            PADDLE_HEIGHT) 
            {
                ballSpeedX = -ballSpeedX;

                var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
                ballSpeedY = deltaY * 0.35;

            } 
        else {
            player1Score ++; // MUST BE BEFORE BALL RESET
            ballReset();
            }
    }
    // change direction if on top and bottom
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}

// draw the net
function drawNet() {
    for(var i=0;i<canvas.height;i+=40){
        colorRect(canvas.width/2,i,2,20,'white')
    }
}

function drawEverything() {
    // create black court
    colorRect(0,0,canvas.width,canvas.height,'black');
    // create left paddle
    colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
    // create right paddle
    colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,
                PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
    // show scores
    canvasContext.fillText(player1Score,canvas.width/4,
                                        canvas.height/8);
    canvasContext.fillText(player2Score,canvas.width*3/4,
                                        canvas.height/8);
    // check for win true = return, false = continue
    // works here because fillText is white after paddles are drawn
    if(showingWinScreen) {
        if( player1Score >= WINNING_SCORE) {
            canvasContext.fillText("The Human Wins!",
            canvas.width*5/16,canvas.height*4/10)
        }
        else if (player2Score >= WINNING_SCORE) {
            canvasContext.fillText("Computer WINS!!!!!",
                        canvas.width*5/16,canvas.height/3);
            canvasContext.fillText("(Puny Human!)",
                        canvas.width*5/16,canvas.height*4/10);
        }

        canvasContext.fillText("Click to Restart Game",
                            canvas.width*5/16,canvas.height*7/8);
        return;
    }
    // draw net
    drawNet();
    // create ball
    colorCircle(ballX,ballY,10,'white');
}

// draw round ball
function colorCircle(centerX,centerY,radius,drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
    canvasContext.fill();
}

// draw rectangle shpaes (court and paddles)
function colorRect(leftX,topY,width,height,drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY,width,height);
}





