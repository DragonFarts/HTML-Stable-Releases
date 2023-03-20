var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var lines = [];

function Line() {
  this.x = 0;
  this.y = Math.random() * canvas.height;
  this.speed = Math.random() * 5 + 1;
  this.color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
}

function drawLines() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    
    ctx.beginPath();
    ctx.moveTo(line.x, line.y);
    ctx.lineTo(line.x + 50, line.y);
    ctx.strokeStyle = line.color;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    line.x += line.speed;
    if (line.x > canvas.width) {
      line.x = 0;
    }
  }
}

function createLine() {
  var line = new Line();
  lines.push(line);
}

setInterval(createLine, 100);

var stopDrawingFlag = true;

function drawLoop() {
  if (stopDrawingFlag) {
    return;
  }
  
  drawLines();
  
  requestAnimationFrame(drawLoop);
}

function startDrawing() {
  stopDrawingFlag = false;
  requestAnimationFrame(drawLoop);
}

function stopDrawing() {
  stopDrawingFlag = true;
}
