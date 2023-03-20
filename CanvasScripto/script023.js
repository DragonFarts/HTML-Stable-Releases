// get canvas element
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// initialize variables
var x = canvas.width/2;
var y = canvas.height/2;
var angle = 0;
var radius = 10;
var numCircles = 216;
var circleSpacing = 1;
var circleRadius = 3;
var stopDrawingFlag = false;

// draw loop function
function drawLoop() {
  if (stopDrawingFlag) return;
  requestAnimationFrame(drawLoop);

  // set background color
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw circles
  for (var i = 0; i < numCircles; i++) {
    var circleX = x + (radius + (i * circleSpacing)) * Math.cos(angle * (i+1));
    var circleY = y + (radius + (i * circleSpacing)) * Math.sin(angle * (i+1));
    var hue = (angle * (i+1) * 5) % 360;
    ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
    ctx.fill();
  }
  // draw circles
  for (var i = 0; i < numCircles; i++) {
    var circleX = x - (radius + (i * circleSpacing)) * Math.cos(angle * (i+1));
    var circleY = y - (radius + (i * circleSpacing)) * Math.sin(angle * (i+1));
    var hue = (angle * (i+1) * 5) % 360;
    ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  // draw circles
  for (var i = 0; i < numCircles; i++) {
    var circleX = x + (radius + (i * circleSpacing)) * Math.cos(angle * (i+1));
    var circleY = y - (radius + (i * circleSpacing)) * Math.sin(angle * (i+1));
    var hue = (angle * (i+1) * 5) % 360;
    ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
    ctx.fill();
  }
  // draw circles
  for (var i = 0; i < numCircles; i++) {
    var circleX = x - (radius + (i * circleSpacing)) * Math.cos(angle * (i+1));
    var circleY = y + (radius + (i * circleSpacing)) * Math.sin(angle * (i+1));
    var hue = (angle * (i+1) * 5) % 360;
    ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
    ctx.fill();
  }
  // update variables
  x += 0;
  angle += 0.00004;

  // reset x if it goes off screen
  if (x > canvas.width) {
    x = 0;
  }
}

// start drawing function
function startDrawing() {
  stopDrawingFlag = false;
  requestAnimationFrame(drawLoop);
}

// stop drawing function
function stopDrawing() {
  stopDrawingFlag = true;
}
