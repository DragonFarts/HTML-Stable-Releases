var canvas;
var ctx;

var stopDrawingFlag = false;

var c64Palette = [
  "#000000", "#ffffff", "#68372b", "#70a4b2",
  "#6f3d86", "#588d43", "#352879", "#b8c76f",
  "#6f4f25", "#433900", "#9a6759", "#444444",
  "#6c6c6c", "#9ad284", "#6c5eb5", "#959595"
];

var c64Colors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function drawLoop(time) {
  if (stopDrawingFlag) return;
  requestAnimationFrame(drawLoop);

  var xSize = 4;
  var ySize = 4;
  var xCount = canvas.width / xSize;
  var yCount = canvas.height / ySize;

  for (var x = 0; x < xCount; x++) {
    for (var y = 0; y < yCount; y++) {
      var colorIndex = c64Colors[getRandomInt(c64Colors.length)];
      var color = c64Palette[colorIndex];
      ctx.fillStyle = color;
      ctx.fillRect(x * xSize, y * ySize, xSize, ySize);
    }
  }
}

function init() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function startDrawing() {
  stopDrawingFlag = false;
  drawLoop();
}

function stopDrawing() {
  stopDrawingFlag = true;
}
