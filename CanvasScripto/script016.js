// Global variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var text = "Retro Wave Typography Animation - Dive into the Past!";
var textX = canvas.width;
var textY = canvas.height / 2;
var textSpeed = 0.5;
var amplitude = 100;
var frequency = 0.05;
var stopDrawingFlag = true;
var font = "30px 'Press Start 2P', monospace";
var textColor = "#FF00FF"; // Use a purple color

// Load the custom font from Google Fonts
var link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

// Draw loop
function drawLoop() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Set the font and color
  context.font = font;
  context.fillStyle = textColor;

  // Draw each character with a sine wave offset
  for (var i = 0; i < text.length; i++) {
    var charWidth = context.measureText(text[i]).width;
    var offsetY = amplitude * Math.sin((textX + i * charWidth) * frequency);
    context.fillText(text[i], textX + i * charWidth, textY + offsetY);
  }

  // Update the text position
  textX -= textSpeed;

  // Reset the text position when it moves off-screen
  if (textX < -context.measureText(text).width) {
    textX = canvas.width;
  }

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
