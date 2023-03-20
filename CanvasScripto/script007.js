var canvas;
var ctx;
var stopDrawingFlag = false;
var nextUpdateTime = 0;
var layers = [];

function init() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
}

function generateLayer() {
  var layer = {
    angle: Math.random() * Math.PI * 3.14,
    rotationSpeed: (Math.random() - 0.4) / 2160,
    offsetX: Math.random() * canvas.width,
    offsetY: Math.random() * canvas.height,
    speedX: (Math.random() - 2.5) * 0.05,
    speedY: (Math.random() - 2.5) * 0.05,
    parallaxFactor: Math.random() * 42 + 0.2,
    numLines: Math.floor(Math.random() * 0) + 108,
//    lineColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
    lineColor: "#000000",

  };
  return layer;
}

function updateLayers() {
    layers = [];
    const numLayers = Math.floor(Math.random() * 3) + 2; // Generates a random integer between 2 and 7.
    for (let i = 0; i < numLayers; i++) {
      layers.push(generateLayer());
    }
  }
  

function drawLoop(time) {
  if (stopDrawingFlag) return;
  requestAnimationFrame(drawLoop);

  if (time >= nextUpdateTime) {
    updateLayers();
    nextUpdateTime = time + 12000;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let layer of layers) {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(layer.angle);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    ctx.translate(layer.offsetX, layer.offsetY);

    ctx.strokeStyle = layer.lineColor;
    ctx.lineWidth = Math.random() * (2 - 1) + 1;


    for (let i = 0; i < layer.numLines; i++) {
      let x = (i / layer.numLines) * canvas.width - 216;
      let y = (i / layer.numLines) * canvas.height - 216;

      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x * layer.parallaxFactor, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y * layer.parallaxFactor);
      ctx.stroke();
    }

    ctx.restore();

    layer.angle += layer.rotationSpeed;
    layer.offsetX += layer.speedX;
    layer.offsetY += layer.speedY;

    if (layer.offsetX < -canvas.width) layer.offsetX += canvas.width;
    if (layer.offsetX > canvas.width) layer.offsetX -= canvas.width;
    if (layer.offsetY < -canvas.height) layer.offsetY += canvas.height;
    if (layer.offsetY > canvas.height) layer.offsetY -= canvas.height;
  }
}

function startDrawing() {
  stopDrawingFlag = false;
  requestAnimationFrame(drawLoop);
}

function stopDrawing() {
  stopDrawingFlag = true;
}
