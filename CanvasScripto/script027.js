// Global variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var stopDrawingFlag = true;
var numLines = 50;
var lineSpacing = 20;
var lineWidth = 3;
var maxAngle = 90;

// Draw Moiré pattern
function drawMoirePattern(angle) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "black";
    context.lineWidth = lineWidth;

    for (var i = 0; i < numLines; i++) {
        var xPos = (i * lineSpacing) - canvas.width / 2;
        context.beginPath();
        context.moveTo(xPos, 0);
        context.lineTo(xPos + Math.tan(angle) * canvas.height, canvas.height);
        context.stroke();
    }

    context.save();
    context.translate(canvas.width / 2, 0);
    context.scale(-1, 1);

    for (var i = 0; i < numLines; i++) {
        var xPos = (i * lineSpacing) - canvas.width / 2;
        context.beginPath();
        context.moveTo(xPos, 0);
        context.lineTo(xPos + Math.tan(angle) * canvas.height, canvas.height);
        context.stroke();
    }

    context.restore();
}

// Update Moiré pattern on mouse move
canvas.addEventListener('mousemove', function(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    var angle = ((x / canvas.width) * maxAngle - maxAngle / 2) * Math.PI / 180;
    drawMoirePattern(angle);
});

// Draw loop
function drawLoop() {
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
