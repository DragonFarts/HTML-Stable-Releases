// Define variables for canvas and context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Define variables for line properties
var lineLength = 100;
var lineWidth = 2;
var lineColor = "#000000";

// Define array for storing lines
var lines = [];

// Define function for creating new line
function createLine() {
  // Set initial x position off-screen to the left
  var x = -lineLength;

  // Set initial rotation to 0
  var rotation = 0;

  // Return an object with the x and rotation properties
  return {
    x: x,
    rotation: rotation
  };
}

// Define function for drawing a line
function drawLine(line) {
  // Save the context state
  ctx.save();

  // Translate to the line's position
  ctx.translate(line.x, canvas.height / 2);

  // Rotate by the line's rotation
  ctx.rotate(line.rotation);

  // Draw the line
  ctx.beginPath();
  ctx.moveTo(0, -lineWidth / 2);
  ctx.lineTo(lineLength, -lineWidth / 2);
  ctx.lineTo(lineLength, lineWidth / 2);
  ctx.lineTo(0, lineWidth / 2);
  ctx.closePath();
  ctx.fillStyle = lineColor;
  ctx.fill();

  // Restore the context state
  ctx.restore();
}

// Define function for updating a line's position and rotation
function updateLine(line, deltaTime) {
  // Calculate the line's new x position
  line.x += deltaTime * 0.1;

  // Calculate the line's new rotation
  line.rotation += deltaTime * 0.001;

  // If the line has moved off-screen to the right, reset its position and rotation
  if (line.x > canvas.width) {
    line.x = -lineLength;
    line.rotation = 0;
  }
}

// Define function for drawing and updating lines
function drawLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Iterate over the lines array
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    // Draw the line
    drawLine(line);

    // Update the line's position and rotation
    updateLine(line, 1000 / 60);
  }

  // Create a new line every 100ms and add it to the lines array
  setTimeout(function() {
    var line = createLine();
    lines.push(line);
  }, 100);

  // If stopDrawingFlag is false, request another animation frame
  if (!stopDrawingFlag) {
    requestAnimationFrame(drawLoop);
  }
}

// Call the startDrawing function to begin drawing
function startDrawing() {
  stopDrawingFlag = false;
  requestAnimationFrame(drawLoop);
}

// Call the stopDrawing function to stop drawing
function stopDrawing() {
  stopDrawingFlag = true;
}
