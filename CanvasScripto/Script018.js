// Define global variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var stopDrawingFlag = true;

// Define logo text and style
var logoText = "RETRO";
var fontSize = 80;
var fontFace = "Arial";
context.font = fontSize + "px " + fontFace;

// Define logo position and velocity
var logoX = (canvas.width - context.measureText(logoText).width) / 2;
var logoY = canvas.height / 2;
var velocityX = 2;
var velocityY = 2;

// Define pixelation
var pixelation = 8;

// Draw loop
function drawLoop() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update logo position
  logoX += velocityX;
  logoY += velocityY;

  // Bounce logo off walls
  if (logoX < 0 || logoX + context.measureText(logoText).width > canvas.width) {
    velocityX = -velocityX;
  }
  if (logoY < fontSize || logoY > canvas.height) {
    velocityY = -velocityY;
  }

  // Draw pixelated logo
  context.save();
  context.scale(pixelation, pixelation);
  context.font = (fontSize / pixelation) + "px " + fontFace;
  context.fillStyle = "#FF00FF";
  context.fillText(logoText, logoX / pixelation, logoY / pixelation);
  context.restore();

  // Request another animation frame if not stopped
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
