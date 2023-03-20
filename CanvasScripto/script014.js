// define global variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var lineArray = []; // array to hold all the line instances
var lineSpeed = 0.1; // speed at which lines move
var lineInterval = 100; // time between creating new lines
var stopDrawingFlag = true; // flag to stop drawing loop
// define LeftLines start x and Y and RightLines start x and y
var leftLinesStartX = 0;
var leftLinesStartY = 0;
var rightLinesStartX = canvas.width;
var rightLinesStartY = 0;


// define Line class
class Line {
  constructor(isReversed) {
    this.x = isReversed ? rightLinesStartX : leftLinesStartX;
    this.y = isReversed ? rightLinesStartY : leftLinesStartY;
    this.speed = isReversed ? -lineSpeed : lineSpeed;
    this.angle = isReversed ? 0.2 : -0.2;
    this.rotateSpeed = isReversed ? 0.0004 : -0.0004;
    this.startTime = Date.now(); // add startTime property to keep track of creation time
  }

  draw() {
    // set line color and thickness
    context.strokeStyle = "black";
    context.lineWidth = 1;
  
    // save the current context state
    context.save();
  
    // translate to the line position
    context.translate(this.x, this.y);
  
    // rotate the canvas around the line position
    context.rotate(this.angle);
  
    // draw the line
    context.beginPath();
    context.moveTo(0, -canvas.height);
    context.lineTo(0, canvas.height);
    context.stroke();
  
    // restore the context state
    context.restore();
  }
  

  update() {
    // move the line to the left or right based on direction
    this.x += this.speed;

    // rotate the line
    this.angle += this.rotateSpeed;

    // if the line goes off screen, remove it from the array
    if ((this.speed > 0 && this.x > canvas.width) || (this.speed < 0 && this.x < 0)) {
      lineArray.splice(lineArray.indexOf(this), 1);
    }

    // if the line has been on the screen for more than 10 seconds, remove it from the array
    if (Date.now() - this.startTime > 432000) {
      lineArray.splice(lineArray.indexOf(this), 1);
    }
  }
}


// create a new line and add it to the array, alternating direction
var isReversed = false;
function createLine() {
  var newLine = new Line(isReversed);
  lineArray.push(newLine);
  isReversed = !isReversed; // toggle direction
}

// draw loop
function drawLoop() {
  // clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // update and draw all the lines
  for (var i = 0; i < lineArray.length; i++) {
    lineArray[i].update();
    lineArray[i].draw();
  }

  // create a new line every lineInterval milliseconds
  if (Date.now() - lastLineTime > lineInterval) {
    createLine();
    lastLineTime = Date.now();
  }

  // request another animation frame if not stopped
  if (!stopDrawingFlag) {
    requestAnimationFrame(drawLoop);
  }
}

// initialize function, starts the loop
function init() {
  stopDrawingFlag = false;
  lastLineTime = Date.now();
  requestAnimationFrame(drawLoop);
}

// start drawing function
function startDrawing() {
  stopDrawingFlag = false;
  lastLineTime = Date.now();
  requestAnimationFrame(drawLoop);
}

// stop drawing function
function stopDrawing() {
  stopDrawingFlag = true;
}
