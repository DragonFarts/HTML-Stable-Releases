// Global variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var numLines = 100;
var lineWidth = 1;
var lineSpacing = 5;
var rotationSpeed = 0.001;
var stopDrawingFlag = true;
var rotationAngle = 0;

// Moiré pattern draw function
function drawMoirePattern() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(rotationAngle);

    for (var i = 0; i < numLines; i++) {
        context.beginPath();
        context.lineWidth = lineWidth;
        context.moveTo(-canvas.width / 2, i * lineSpacing - canvas.height / 2);
        context.lineTo(canvas.width / 2, i * lineSpacing - canvas.height / 2);
        context.strokeStyle = "black";
        context.stroke();
    }

    context.restore();

    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(-rotationAngle);

    for (var i = 0; i < numLines; i++) {
        context.beginPath();
        context.lineWidth = lineWidth;
        context.moveTo(-canvas.width / 2, i * lineSpacing - canvas.height / 2);
        context.lineTo(canvas.width / 2, i * lineSpacing - canvas.height / 2);
        context.strokeStyle = "black";
        context.stroke();
    }

    context.restore();
}

// Draw loop
function drawLoop() {
    drawMoirePattern();

    rotationAngle += rotationSpeed;

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
