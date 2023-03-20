var canvas;
var ctx;

function init() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
}

var lines = [];
var lineWidth = 2;
var speed1 = 0.5; // Speed of lines on the left
var speed2 = -0.5; // Speed of lines on the right
var rotationSpeed1 = 0.0005; // Rotation speed of lines on the left
var rotationSpeed2 = -0.0005; // Rotation speed of lines on the right
var stopDrawingFlag = false;

function createLines() {
  var lineSpacing = 10;
  var numLines = Math.ceil(canvas.height / lineSpacing);

  for (var i = 0; i < numLines; i++) {
    // Lines to the left
    lines.push({
      x: -lineWidth / 2,
      y: i * lineSpacing,
      rotation: 0,
      speed: speed1,
      rotationSpeed: rotationSpeed1
    });

    // Lines to the right
    lines.push({
      x: canvas.width + lineWidth / 2,
      y: i * lineSpacing,
      rotation: 0,
      speed: speed2,
      rotationSpeed: rotationSpeed2
    });
  }
}

function drawLines() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = lineWidth;

  for (var i = 0; i < lines.length; i++) {
    ctx.save();
    ctx.translate(lines[i].x, lines[i].y);
    ctx.rotate(lines[i].rotation);
    ctx.beginPath();
    ctx.moveTo(0, -canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.stroke();
    ctx.restore();
  }
}

function updateLines() {
  for (var i = 0; i < lines.length; i++) {
    lines[i].x += lines[i].speed;
    lines[i].rotation += lines[i].rotationSpeed;

    if (lines[i].x > canvas.width + lineWidth / 2) {
      lines[i].x = -lineWidth / 2;
    } else if (lines[i].x < -lineWidth / 2) {
      lines[i].x = canvas.width + lineWidth / 2;
    }
  }
}

function loop() {
  if (stopDrawingFlag) return;

  drawLines();
  updateLines();

  requestAnimationFrame(loop);
}

function startDrawing() {
  stopDrawingFlag = false;
  loop();
}

function stopDrawing() {
  stopDrawingFlag = true;
}

init();
createLines();
startDrawing();
