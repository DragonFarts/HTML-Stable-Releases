// Global variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var numShapes = 216;
var radius = Math.min(canvas.width, canvas.height) * 0.05;
var stopDrawingFlag = true;

// Draw a symmetric shape pattern
function drawPattern() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.translate(canvas.width / 2, canvas.height / 2);

    for (var i = 0; i < numShapes; i++) {
        context.rotate((Math.PI * 2) / numShapes);

        context.beginPath();
        context.rect(radius, -radius / 0.15, radius / 0.3, radius / 0.25);
        context.fillStyle = i % 2 === 0 ? "black" : "white";
        context.fill();

        context.beginPath();
        context.arc(radius * 1.5, 0, radius / 4.4, 0, Math.PI * 2);
        context.fillStyle = i % 2 === 0 ? "white" : "black";
        context.fill();
    }

    context.setTransform(1, 0, 0, 1, 0, 0);
}

// Draw loop
function drawLoop() {
    drawPattern();

    context.translate(canvas.width, canvas.height);
    context.rotate(0.01);
    context.setTransform(1, 0, 0, 1, 0, 0);

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
