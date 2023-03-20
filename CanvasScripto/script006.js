var canvas;
var ctx;
var stopDrawingFlag = false;

function init() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
}

function tunnelEffect() {
  if (stopDrawingFlag) return;

  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var maxRadius = Math.min(canvas.width, canvas.height) / 2;
  var numCircles = 108;
  var colors = [
    "#00FFFF",
    "#FF00FF",
    "#FFFF00",
    "#FF0000",
    "#00FF00",
    "#0000FF",
  ];

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < numCircles; i++) {
    var radius = (maxRadius * i) / numCircles;
    var offset = (performance.now() * 0.01) % maxRadius;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + offset, 0, 3.45 * Math.PI);
    ctx.strokeStyle = colors[i % colors.length];
    ctx.lineWidth = maxRadius / numCircles;
    ctx.stroke();
  }

  requestAnimationFrame(tunnelEffect);
}

function startDrawing() {
  stopDrawingFlag = false;
  tunnelEffect();
}

function stopDrawing() {
  stopDrawingFlag = true;
}
