var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

var angle = 0;
var stopDrawingFlag = false;

function drawLoop(time) {
  if (stopDrawingFlag) return;
  requestAnimationFrame(drawLoop);

  // Slower animation
  time /= 2;

  // Blur effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Time dilation effect
  var factor = (Math.sin(time / 1000) + 1) / 2;
  factor = 0.5 + factor * 2;
  ctx.setTransform(factor, 0, 0, 1, centerX * (1 - factor), 0);

  // Screen tearing effect
  var rowHeight = 5;
  var rowOffset = Math.floor(Math.random() * rowHeight);
  for (var y = rowOffset; y < canvas.height; y += rowHeight) {
    ctx.drawImage(canvas, 0, y, canvas.width, rowHeight, 0, y, canvas.width, rowHeight);
  }

  var amplitude = Math.min(canvas.width, canvas.height) / 2;
  var period = 100;
  var waveSpeed = 0.05;
  var lineWidth = 2;
  var lineColor = "#ffffff";
  
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  
  for (var x = 0; x <= canvas.width; x += lineWidth * 2) {
    var y = centerY + Math.sin((x + angle) / period) * amplitude;
    ctx.lineTo(x, y);
  }
  
  ctx.stroke();
  
  angle += waveSpeed;
}

function startDrawing() {
  stopDrawingFlag = false;
  requestAnimationFrame(drawLoop);
}

function stopDrawing() {
  stopDrawingFlag = true;
}
