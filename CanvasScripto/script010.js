var canvas;
var ctx;
var stopDrawingFlag = false;
var sinFrequency1 = 0.5;
var sinAmplitude1 = 120;
var sinFrequency2 = 72;
var sinAmplitude2 = 125;

function init() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
}

function drawLoop(time) {
  if (stopDrawingFlag) return;
  requestAnimationFrame(drawLoop);

  var numLines = 108;
  var lineWidth = canvas.width / numLines;
  var lineSpacing = canvas.height / numLines;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < numLines; i++) {
    var y1 = i * lineSpacing + sinAmplitude1 * Math.sin(2 * Math.PI * i / numLines * sinFrequency1 + time / 420 * 2 * Math.PI / 21);
    var y2 = i * lineSpacing + sinAmplitude2 * Math.sin(2 * Math.PI * i / numLines * sinFrequency2 - time / 420 * 2 * Math.PI / 21);
    ctx.beginPath();
    ctx.moveTo(0, y1);
    ctx.lineTo(canvas.width, y2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
  }
}

function startDrawing() {
  stopDrawingFlag = false;
  requestAnimationFrame(drawLoop);
}

function stopDrawing() {
  stopDrawingFlag = true;
}
