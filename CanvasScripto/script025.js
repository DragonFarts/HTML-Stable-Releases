// Global variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var numCircles = 50;
var baseRadius = 10;
var stopDrawingFlag = true;

// Moiré Pattern draw function
function drawMoirePattern() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < numCircles; i++) {
    var radius1 = baseRadius + i * 10;
    var radius2 = baseRadius + i * 10 + 2;

    context.beginPath();
    context.arc(centerX, centerY, radius1, 0, 2 * Math.PI);
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.stroke();

    context.beginPath();
    context.arc(centerX, centerY, radius2, 0, 2 * Math.PI);
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.stroke();
  }
}

// Rotate the canvas
function rotateCanvas(rotationAngle) {
  context.translate(centerX, centerY);
  context.rotate((Math.PI / 180) * rotationAngle);
  context.translate(-centerX, -centerY);
}

// Draw loop
function drawLoop() {
  context.save();
  rotateCanvas(Date.now() / 1000);
  drawMoirePattern();
  context.restore();

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
