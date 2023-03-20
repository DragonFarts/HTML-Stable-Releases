// get canvas element
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// initialize variables
let waves = [];
let t = 0;

let minFreq = -8;
let maxFreq = 8;
let minAmp = -21;
let maxAmp = 21;
let lineScrollSpeed = 0.54;
let lineThickeningSpeed = 0.01;
let angleOffset = Math.PI / 6;

let freqDuration = 24;
let ampDuration = 24;

const colorPalette = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];

function drawWave(w) {
  ctx.strokeStyle = w.color;
  ctx.lineWidth = w.lw;
  ctx.beginPath();
  for (let x = 0; x <= 500; x++) {
    let y = w.a * Math.sin(2 * Math.PI * w.f * x / 500 + w.p + w.angle) + 420 - w.sd;
    x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  }
  ctx.stroke();
}

function drawLoop() {
  if (stopDrawingFlag) return;
  requestAnimationFrame(drawLoop);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let w of waves) drawWave(w);
  for (let w of waves) w.sd += w.lw * lineScrollSpeed;
  t += 0.01;
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

setInterval(() => {
  let angle = (Math.random() * 2 - 1) * angleOffset;
  let color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

  freq = minFreq + (maxFreq - minFreq) * (Math.sin(t * Math.PI / freqDuration) + 1) / 2;
  freq2 = minFreq + (maxFreq - minFreq) * (Math.cos(t * Math.PI / freqDuration) + 1) / 2;
  amp = minAmp + (maxAmp - minAmp) * (Math.sin(t * Math.PI / ampDuration) + 1) / 2;
  amp2 = minAmp + (maxAmp - minAmp) * (Math.cos(t * Math.PI / ampDuration) + 1) / 2;

  let w = {
    a: amp + amp2,
    f: freq + freq2,
    p: 0,
    lw: Math.random() * 3 + 1,
    sd: 0,
    angle: angle,
    color: color
  };

  waves.push(w);

  if (waves.length > 60) {
    waves.shift();
  }
}, 108);
