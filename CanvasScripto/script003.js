var canvas;
var ctx;

function init() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
}

var angle = 0;
var stopDrawingFlag = false;
var shapes = [];
var nextShapeSpawnTime = 0;

var c64Palette = [
  "#000000", "#ffffff", "#68372b", "#70a4b2",
  "#6f3d86", "#588d43", "#352879", "#b8c76f",
  "#6f4f25", "#433900", "#9a6759", "#444444",
  "#6c6c6c", "#9ad284", "#6c5eb5", "#959595"
];

var nesPalette = [
  "#7C7C7C", "#0000FC", "#0000BC", "#4428BC",
  "#940084", "#A80020", "#A81000", "#881400",
  "#503000", "#007800", "#006800", "#005800",
  "#004058", "#000000", "#000000", "#000000"
];

var amigaPalette = [
  "#000000", "#F0F0F0", "#F0C000", "#C08000",
  "#0000F0", "#C000F0", "#0080F0", "#F000F0",
  "#00C000", "#C0C000", "#00C0C0", "#C0C0C0",
  "#C00000", "#F00000", "#0000C0", "#000000"
];

var palettes = [  c64Palette,  nesPalette,  amigaPalette];
var currentPaletteIndex = 0;
var nextPaletteUpdateTime = 0;

function getCurrentPalette(time) {
  const currentPalette = palettes[currentPaletteIndex];
  const cycleTime = time % 21000;
  if (cycleTime < 12000) {
    // Random colors
    return [      currentPalette[Math.floor(Math.random() * currentPalette.length)],
      currentPalette[Math.floor(Math.random() * currentPalette.length)],
      currentPalette[Math.floor(Math.random() * currentPalette.length)],
      currentPalette[Math.floor(Math.random() * currentPalette.length)],
      currentPalette[Math.floor(Math.random() * currentPalette.length)]
    ];
  } else if (cycleTime < 21000) {
    // Ascending colors
    const startIndex = Math.floor((cycleTime - 5000) / 1000) % currentPalette.length;
    return [      currentPalette[startIndex % currentPalette.length],
      currentPalette[(startIndex + 1) % currentPalette.length],
      currentPalette[(startIndex + 2) % currentPalette.length],
      currentPalette[(startIndex + 3) % currentPalette.length],
      currentPalette[(startIndex + 4) % currentPalette.length]
    ];
  } else {
    // Descending colors
    const startIndex = Math.floor((cycleTime - 10000) / 1000) % currentPalette.length;
    return [      currentPalette[(startIndex + 4) % currentPalette.length],
      currentPalette[(startIndex + 3) % currentPalette.length],
      currentPalette[(startIndex + 2) % currentPalette.length],
      currentPalette[(startIndex + 1) % currentPalette.length],
      currentPalette[startIndex % currentPalette.length]
    ];
  }
}

  

function drawShape(shape) {
    ctx.beginPath();
    for (let i = 0; i <= shape.sides; i++) {
      const angle = (Math.PI * 2 * i / shape.sides) + shape.rotation;
      const px = shape.x + Math.cos(angle) * shape.radius;
      const py = shape.y + Math.sin(angle) * shape.radius;
      ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  }
  function drawLoop(time) {
    if (stopDrawingFlag) return;
    requestAnimationFrame(drawLoop);
  
    if (time >= nextPaletteUpdateTime) {
      currentPaletteIndex++;
      if (currentPaletteIndex >= palettes.length) {
        currentPaletteIndex = 0;
      }
      nextPaletteUpdateTime = time + 5000;
    }
  
    const currentPalette = palettes[currentPaletteIndex];
    const shapePalette = getCurrentPalette(time, currentPalette);
  
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var baseRadius = Math.min(canvas.width, canvas.height) / 4;
    var maxSides = 20;
    var rotationSpeed = 0.02;
    var scaleFactor = 0.01;
  
    if (time >= nextShapeSpawnTime) {
      const loopFactor = (Math.sin(angle) * 0.5) + 0.5;
      const sides = Math.floor(loopFactor * maxSides) + 3;
      const rotation = angle;
      const color = shapePalette[Math.floor(Math.random() * shapePalette.length)];
      const lineThickness = Math.floor(Math.random() * 6);
  
      shapes.push({
        x: centerX,
        y: centerY,
        radius: baseRadius * scaleFactor,
        sides: sides,
        rotation: rotation,
        creationTime: time,
        color: color,
        lineThickness: lineThickness
      });
  
      nextShapeSpawnTime = time + 250;
    }
  
    shapes = shapes.filter(shape => {
      shape.radius *= 1.01;
  
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = shape.lineThickness;
  
      ctx.fillStyle = shape.color;
      drawShape(shape);
  
      return shape.radius < baseRadius * 10;
    });
  
    angle += rotationSpeed;
  }
  
  
function startDrawing() {
stopDrawingFlag = false;
requestAnimationFrame(drawLoop);
}

function stopDrawing() {
stopDrawingFlag = true;
}
