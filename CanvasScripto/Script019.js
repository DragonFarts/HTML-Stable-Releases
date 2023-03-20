// Global variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var stopDrawingFlag = true;
var pixelSize = 64;
var animationSpeed = 100;

// Color palette
var colors = [
  "#000000", // black
  "#FFFFFF", // white
  "#FF0000", // red
  "#00FF00", // green
  "#0000FF", // blue
  "#FFFF00", // yellow
  "#FF00FF", // magenta
  "#00FFFF"  // cyan
];

// Pattern data
var pattern = [
  [0, 1, 2, 3, 4, 5, 6, 7],
  [1, 0, 3, 2, 5, 4, 7, 6],
  [2, 3, 0, 1, 6, 7, 4, 5],
  [3, 2, 1, 0, 7, 6, 5, 4],
  [4, 5, 6, 7, 0, 1, 2, 3],
  [5, 4, 7, 6, 1, 0, 3, 2],
  [6, 7, 4, 5, 2, 3, 0, 1],
  [7, 6, 5, 4, 3, 2, 1, 0]
];

// Draw a pixel at x, y with the specified color index
function drawPixel(x, y, colorIndex) {
  context.fillStyle = colors[colorIndex];
  context.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

// Draw the pattern
function drawPattern() {
  for (var y = 0; y < pattern.length; y++) {
    for (var x = 0; x < pattern[y].length; x++) {
      drawPixel(x, y, pattern[y][x]);
    }
  }
}

// Shift the pattern colors
function shiftPatternColors() {
  var lastColor = colors.pop();
  colors.unshift(lastColor);
}

// Animation loop
function animationLoop() {
  if (!stopDrawingFlag) {
    drawPattern();
    shiftPatternColors();
    setTimeout(animationLoop, animationSpeed);
  }
}

// Initialize function, starts the loop
function init() {
  stopDrawingFlag = false;
  animationLoop();
}

// Start drawing function
function startDrawing() {
  stopDrawingFlag = false;
  animationLoop();
}

// Stop drawing function
function stopDrawing() {
  stopDrawingFlag = true;
}
