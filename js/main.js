
var canvas = document.getElementById("chess");
var context = canvas.getContext("2d");
var me = true;
var over = false;
var chessBoard = [];

function startGame() {

    for (var i = 0; i < 15; i++) {
        chessBoard[i] = [];
        for (var j = 0; j < 15; j++) {
            chessBoard[i][j] = 0;
        }
    }
    cleanChess();
    drawChess();
    me = true;
    over = false;
    for (var i = 0; i < count; i++) {
        myWin[i] = 0;
        airingWin[i] = 0;
    }
    oneStep(7, 7, false);
    chessBoard[7][7] = 2;
}

function cleanChess() {
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawChess() {
    for (var i = 0; i < 15; i++) {
        context.strokeStyle = "#BFBFBF";
        context.beginPath();
        context.moveTo(15 + i *30, 15);
        context.lineTo(15 + i *30, canvas.height - 15);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(15, 15 + i *30);
        context.lineTo(canvas.width - 15, 15 + i * 30);
        context.closePath();
        context.stroke();
    }
}

function oneStep(i, j ,me) {
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    if (me) {
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
    } else {
        gradient.addColorStop(0, "#0A0A0A");
        gradient.addColorStop(1, "#636766");
    }
    context.fillStyle = gradient;
    context.fill();
}


canvas.onclick = function(e) {
    if (over) {
        return;
    }

    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);


    if(chessBoard[i][j] == 0) {
        oneStep(i, j, me);
        chessBoard[i][j] = 1;

        for (var k = 0; k < count; k ++) {
            if (wins[i][j][k]) {
                myWin[k] ++;
                airingWin[k] = 6;
                if (myWin[k] == 5) {
                    window.alert("You Win");
                    over = true;
                }
            }

        }
        if (!over) {
            me = !me;
            airingGo();
        }
    }


};

