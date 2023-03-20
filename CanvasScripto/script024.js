// Global variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var numRows = 84;
var numColumns = 84;
var rectWidth = (canvas.width / numColumns)*3;
var rectHeight = (canvas.height / numRows);
var offsetAmplitude = rectHeight / 0.25;
var scrollSpeed = 0.1;
var stopDrawingFlag = true;

// Sinusoidal Cafe Wall draw function
function drawCafeWall() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numColumns; j++) {
            var offsetX = Math.sin(i * 2.5 + Date.now() / 2000) * offsetAmplitude;
            var x = j * rectWidth + offsetX;
            var y = i * rectHeight;

            if (i % 2 == 0) {
                x += rectWidth / 2;
            }

            context.fillStyle = (j % 2 === 0) ? "black" : "white";
            context.fillRect(x, y, rectWidth, rectHeight);
        }
    }
}

// Draw loop
function drawLoop() {
    drawCafeWall();

    // Scroll rows in opposite directions
    for (var i = 0; i < numRows; i++) {
        if (i % 2 === 0) {
            canvas.style.backgroundPositionX = `${parseFloat(canvas.style.backgroundPositionX || 0) + scrollSpeed}px`;
        } else {
            canvas.style.backgroundPositionX = `${parseFloat(canvas.style.backgroundPositionX || 0) - scrollSpeed}px`;
        }
    }

    if (!stopDrawingFlag) {
        requestAnimationFrame(drawLoop);
    }
}

// Initialize function, starts the loop
function init() {
    stopDrawingFlag = false;
    requestAnimationFrame(drawLoop);
}

// Start drawing function
function startDrawing() {
    stopDrawingFlag = false;
    requestAnimationFrame(drawLoop);
}

// Stop drawing function
function stopDrawing() {
    stopDrawingFlag = true;
}
