var canvas;
var ctx;
var stopDrawingFlag = false;

function init() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
}

var time = 0;

function draw() {
  if (stopDrawingFlag) return;

  var width = canvas.width;
  var height = canvas.height;
  var x, y, amplitude, frequency, color;

  // clear canvas
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);

  // draw scrolling lines from left to right
  for (y = 0; y < height; y += 10) {
    color = "rgb(" + (y % 256) + ", " + ((y + 64) % 256) + ", " + ((y + 128) % 256) + ")";
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (x = 0; x < width; x += 5) {
      amplitude = height / 2;
      frequency = 0.01;
      ctx.lineTo(x, y + amplitude * Math.sin(frequency * (x + time)));
    }
    ctx.stroke();
  }

  // draw scrolling lines from right to left
  for (y = 0; y < height; y += 10) {
    color = "rgb(" + (y % 256) + ", " + ((y + 128) % 256) + ", " + ((y + 64) % 256) + ")";
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(width, y);
    for (x = width; x > 0; x -= 5) {
      amplitude = height / 2;
      frequency = 0.01;
      ctx.lineTo(x, y + amplitude * Math.sin(frequency * (x + time)));
    }
    ctx.stroke();
  }

  time += 0.1;
  requestAnimationFrame(draw);
}

function startDrawing() {
  stopDrawingFlag = false;
  draw();
}

function stopDrawing() {
  stopDrawingFlag = true;
}
