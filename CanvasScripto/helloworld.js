// Global variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var numRows = 10;
var numColumns = 10;
var rectWidth = (canvas.width / numColumns);
var rectHeight = (canvas.height / numRows);
var stopDrawingFlag = true;

// Retro-style font properties
const fontSize = 48;
const fontFamily = "'Courier New', monospace";
const textColor = 'white';
const helloWorldText = "Hello, World!";

// Function to draw tiles background
function drawBackground() {
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numColumns; j++) {
            var x = j * rectWidth;
            var y = i * rectHeight;
            context.fillStyle = (i % 2 === j % 2) ? 'black' : 'blue';
            context.fillRect(x, y, rectWidth, rectHeight);
        }
    }
}

// Function to draw "Hello World" text with a retro style
function drawHelloWorld() {
    context.font = `${fontSize}px ${fontFamily}`;
    context.fillStyle = textColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(helloWorldText, canvas.width / 2, canvas.height / 2);
}

// Draw loop
function drawLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawHelloWorld();

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
