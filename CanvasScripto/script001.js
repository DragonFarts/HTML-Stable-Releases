var canvas;
var ctx;
var iteration = 0;
var maxIterations = 3; // number of iterations for L-system
var axiom = "F"; // starting symbol for L-system
var rules = { // rules for L-system
  "F": "F+F-F-F+F"
};
var angle = 15; // angle for L-system rotation
var length = 5; // length for L-system movement
var xCenter = 0;
var yCenter = 0;
var fluidColors = [ // C64 color palette for fluid animation
  "#000000",
  "#FFFFFF",
  "#880000",
  "#AAFFEE",
  "#CC44CC",
  "#00CC55",
  "#0000AA",
  "#EEEE77",
  "#DD8855",
  "#664400",
  "#FF7777",
  "#333333",
  "#777777",
  "#AAFF66",
  "#0088FF",
  "#BBBBBB"
];
var fluidColorIndex = 0; // current color for fluid animation
var stopDrawingFlag = false; // flag to stop drawing loop

function init() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
}

function lSystem() {
  if (stopDrawingFlag) return;
  
  var string = axiom;
  for (var i = 0; i < iteration; i++) {
    var nextString = "";
    for (var j = 0; j < string.length; j++) {
      var char = string.charAt(j);
      if (rules[char]) {
        nextString += rules[char];
      } else {
        nextString += char;
      }
    }
    string = nextString;
  }
  
  ctx.beginPath();
  ctx.moveTo(xCenter, yCenter);
  
  var angleRad = angle * (Math.PI / 180);
  var x = xCenter;
  var y = yCenter;
  
  for (var i = 0; i < string.length; i++) {
    var char = string.charAt(i);
    switch (char) {
      case "F":
        var newX = x + length * Math.cos(angleRad);
        var newY = y + length * Math.sin(angleRad);
        ctx.lineTo(newX, newY);
        x = newX;
        y = newY;
        break;
      case "+":
        angle -= 44;
        angleRad = angle * (Math.PI / 140);
        break;
      case "-":
        angle += 21;
        angleRad = angle * (Math.PI / 280);
        break;
    }
  }
  
  var color = fluidColors[fluidColorIndex];
  fluidColorIndex = (fluidColorIndex + 1) % fluidColors.length;
  ctx.strokeStyle = color;
  ctx.stroke();
  
  iteration++;
  if (iteration > maxIterations) {
    iteration = 0;
    xCenter = Math.random() * canvas.width;
    yCenter = Math.random() * canvas.height;
    angle = Math.random() * 360;
    length = Math.random() * 10 + 5;
  }
  
  requestAnimationFrame(lSystem);
}

function startDrawing() {
  stopDrawingFlag = false;
  lSystem();
}

function stopDrawing() {
  stopDrawingFlag = true;
}
