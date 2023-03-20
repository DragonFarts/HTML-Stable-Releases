// get canvas element
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// initialize variables
let sw = 1;
let waves = [];
let freq;
let amp;
let t = 0;

let minFreq = -6;
let maxFreq = 6;
let minAmp = -27;
let maxAmp = 27;
let lineScrollSpeed = 1.08;
let lineThickeningSpeed = 0.01;

let freqDuration = 24;
let ampDuration = 24;

function drawWave(w) {
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x <= 500; x++) {
    let y = w.a * Math.sin(2 * Math.PI * w.f * x / 500 + w.p) + 420 - w.sd;
    x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  }
  ctx.stroke();

  ctx.beginPath();
  for (let x = 0; x <= 500; x++) {
    let y = -w.a * Math.sin(2 * Math.PI * w.f * x / 500 + w.p) + 420 - w.sd;
    x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  }
  ctx.stroke();
}

function drawLoop() {
  if (stopDrawingFlag) return;
  requestAnimationFrame(drawLoop);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let w of waves) drawWave(w);
  sw += lineThickeningSpeed;
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
  freq = minFreq + (maxFreq - minFreq) * (Math.sin(t * Math.PI / freqDuration) + 1) / 2;
  freq2 = minFreq + (maxFreq - minFreq) * (Math.cos(t * Math.PI / freqDuration) + 1) / 2;
  amp = minAmp + (maxAmp - minAmp) * (Math.sin(t * Math.PI / ampDuration) + 1) / 2;
  amp2 = minAmp + (maxAmp - minAmp) * (Math.cos(t * Math.PI / ampDuration) + 1) / 2;
  let w = { a: amp + amp2, f: freq + freq2, p: 0, lw: 1, sd: 0 };
  if (waves.length > 0) {
    let lastWave = waves[waves.length - 1];
    let newAmp = (lastWave.a + w.a) / 2;
    let newFreq = (lastWave.f + w.f) / 2;
    let newPhase = (lastWave.p + w.p) / 2;
    let newLw = (lastWave.lw + w.lw) / 2;
    let newSd = (lastWave.sd + w.sd) / 2;
    waves.push({ a: newAmp, f: newFreq, p: newPhase, lw: newLw, sd: newSd });
  } else {
    waves.push(w);
  }
}, 108);
