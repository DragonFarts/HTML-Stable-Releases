// CG Animation Art Style script (script016.js)

// Global variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var circleArray = [];
var circleInterval = 100; // time between creating new circles
var stopDrawingFlag = true;
var lastCircleTime;

// Circle class
class Circle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 50 + 10;
    this.color = this.randomColor();
  }

  randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
  }
}

// Create a new circle and add it to the array
function createCircle() {
  var newCircle = new Circle();
  circleArray.push(newCircle);
}

// Draw loop
function drawLoop() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw all the circles
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].draw();
  }

  // Create a new circle every circleInterval milliseconds
  if (Date.now() - lastCircleTime > circleInterval) {
    createCircle();
    lastCircleTime = Date.now();
  }

  // Request another animation frame if not stopped
  if (!stopDrawingFlag) {
    requestAnimationFrame(drawLoop);
  }
}

// Initialize function, starts the loop
function init() {
  stopDrawingFlag = false;
  lastCircleTime = Date.now();
  requestAnimationFrame(drawLoop);
}

// Start drawing function
function startDrawing() {
  stopDrawingFlag = false;
  lastCircleTime = Date.now();
  requestAnimationFrame(drawLoop);
}

// Stop drawing function
function stopDrawing() {
  stopDrawingFlag = true;
}
