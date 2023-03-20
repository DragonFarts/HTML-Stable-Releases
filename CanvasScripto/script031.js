var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var angle1 = 0.1;
var angle2 = -0.1;
var stopDrawingFlag = false;

function drawLoop() {
  if (stopDrawingFlag) return;
  requestAnimationFrame(drawLoop);

  // set background color
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw first spiral
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, canvas.height/2);
  for (var i = 0; i < 1000; i++) {
    var radius = i / 3;
    var x = canvas.width/2 + radius * Math.cos(angle1 * i);
    var y = canvas.height/2 + radius * Math.sin(angle1 * i);
    var hue = (angle1 * i) % 360;
    ctx.strokeStyle = "hsl(" + hue + ", 100%, 50%)";
    ctx.lineWidth = 2;
    ctx.lineTo(x, y);
  }
  ctx.stroke();

  // draw second spiral
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, canvas.height/2);
  for (var i = 0; i < 1000; i++) {
    var radius = i / 3;
    var x = canvas.width/2 + radius * Math.cos(angle2 * i);
    var y = canvas.height/2 + radius * Math.sin(angle2 * i);
    var hue = (angle2 * i) % 360;
    ctx.strokeStyle = "hsl(" + hue + ", 100%, 50%)";
    ctx.lineWidth = 2;
    ctx.lineTo(x, y);
  }
  ctx.stroke();

  // update angles
  angle1 += 0.00005;
  angle2 -= 0.00005;
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
