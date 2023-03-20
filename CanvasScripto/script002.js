var canvas;
var ctx;

var particles = [];
var particleCount = 420;
var colorPalettes = generateColorPalettes(24);
var currentPaletteIndex = 0;
var cycleDuration = 108000; // duration to cycle through palettes in milliseconds

function generateColorPalette() {
    var palette = [];
    var hueStep = 360 / 16; // 16 colors in the palette
    for (var i = 0; i < 16; i++) {
      var hue = i * hueStep;
      palette.push('hsl(' + hue + ', 100%, 50%)');
    }
    return palette;
  }
  
  
  

function generateColorPalettes(count) {
  var palettes = [];
  for (var i = 0; i < count; i++) {
    palettes.push(generateColorPalette());
  }
  return palettes;
}

var stopDrawingFlag = false;

function init() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
}

function drawParticle(particle, time) {
    var currentPalette = colorPalettes[currentPaletteIndex];
    var fillColor = currentPalette[particle.colorIndex];
    var outlineColor = currentPalette[(particle.colorIndex + 8) % 16]; // choose a contrasting color for the outline
  
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = outlineColor;
    ctx.globalAlpha = particle.alpha;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = particle.life;
    ctx.stroke();
  }
  
  
  function createParticle() {
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var angle = Math.random() * Math.PI * 2;
    var speed = Math.random() * 2 + -1;
    var size = Math.random() * 108 + 2;
    var life = Math.random() * 21 + 0;
    var alpha = Math.random() * 1;
    var colorIndex = Math.floor(Math.random() * 16); // choose a random color index
    
    return {
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: size,
      life: life,
      alpha: alpha,
      colorIndex: colorIndex // assign the color index to the particle
    };
  }
  

function updateParticle(particle) {
  particle.x += particle.vx;
  particle.y += particle.vy;
  particle.life -= 0.00144;

  if (particle.x - particle.size / 2 <= 0 || particle.x + particle.size / 2 >= canvas.width) {
    particle.vx = -particle.vx;
  }

  if (particle.y - particle.size / 2 <= 0 || particle.y + particle.size / 2 >= canvas.height) {
    particle.vy = -particle.vy;
  }

  return particle.life > 0;
}



function particleAnimation(time) {
    if (stopDrawingFlag) return;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    if (particles.length < particleCount) {
      particles.push(createParticle());
    }
  
    particles = particles.filter(particle => updateParticle(particle));
    particles.forEach(particle => drawParticle(particle, time));
  
    var elapsedTime = time % cycleDuration;
    var progress = elapsedTime / cycleDuration;
    var cycleDelta = Math.sin(progress * Math.PI * 2);
    currentPaletteIndex = Math.floor((cycleDelta + 1) / 2 * colorPalettes.length) % colorPalettes.length;
  
    requestAnimationFrame(particleAnimation);
  }
  
  function startDrawing() {
    stopDrawingFlag = false;
    particleAnimation(0);
  }
  
  function stopDrawing() {
    stopDrawingFlag = true;
  }
  