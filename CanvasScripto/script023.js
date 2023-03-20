// define global variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var tileSize = 15;
var numRows = canvas.height / tileSize;
var numCols = canvas.width / tileSize;
var xOffset = tileSize / 2;
var stopDrawingFlag = true;

// draw the Café Wall pattern
function drawCafeWall() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numCols; j++) {
            var x = j * tileSize;
            var y = i * tileSize;

            // shift every other row by half a tile
            if (i % 2 === 1) {
                x += xOffset;
            }

            drawTile(x, y);
        }
    }
}

// draw a single tile
function drawTile(x, y) {
    context.fillStyle = "black";
    context.fillRect(x, y, tileSize, tileSize);
    context.strokeStyle = "white";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(x, y + tileSize / 2);
    context.lineTo(x + tileSize, y + tileSize / 2);
    context.stroke();
}

// draw loop
function drawLoop() {
    drawCafeWall();

    if (!stopDrawingFlag) {
        requestAnimationFrame(drawLoop);
    }
}

// initialize function, starts the loop
function init() {
    stopDrawingFlag = false;
    requestAnimationFrame(drawLoop);
}

// start drawing function
function startDrawing() {
    stopDrawingFlag = false;
    requestAnimationFrame(drawLoop);
}

// stop drawing function
function stopDrawing() {
    stopDrawingFlag = true;
}
