// Global variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var textLayers = [
  { text: "Parallax Scrolling - Far", speed: 0.5, font: "20px 'Press Start 2P', monospace", color: "#9999FF" },
  { text: "Illusion - Middle", speed: 1, font: "30px 'Press Start 2P', monospace", color: "#6666FF" },
  { text: "Retro Text - Close", speed: 1.5, font: "40px 'Press Start 2P', monospace", color: "#3333FF" },
];
var stopDrawingFlag = true;

// Load the custom font from Google Fonts
var link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

// Initialize text X positions
for (var i = 0; i < textLayers.length; i++) {
  textLayers[i].x = canvas.width;
}

// Draw loop
function drawLoop() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw each layer with different speed, font, and color
  for (var i = 0; i < textLayers.length; i++) {
    context.font = textLayers[i].font;
    context.fillStyle = textLayers[i].color;
    context.fillText(textLayers[i].text, textLayers[i].x, canvas.height / 2 + i * 40);

    // Update the text position
    textLayers[i].x -= textLayers[i].speed;

    // Reset the text position when it moves off-screen
    if (textLayers[i].x < -context.measureText(textLayers[i].text).width) {
      textLayers[i].x = canvas.width;
    }
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
