// define global variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var numArms = 6;
var armLength = canvas.width / 3;
var rotationSpeed = 0.002;
var stopDrawingFlag = true;
var angle = 0;

// draw spirography
function drawSpirography() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 1;

    for (var i = 0; i < numArms; i++) {
        var armAngle = (2 * Math.PI / numArms) * i + angle;
        var x1 = canvas.width / 2 + armLength * Math.cos(armAngle);
        var y1 = canvas.height / 2 + armLength * Math.sin(armAngle);

        for (var j = 0; j < numArms; j++) {
            var innerArmAngle = (2 * Math.PI / numArms) * j + angle;
            var x2 = canvas.width / 2 + armLength * Math.cos(innerArmAngle);
            var y2 = canvas.height / 2 + armLength * Math.sin(innerArmAngle);

            context.strokeStyle = `hsl(${(i * j + angle * 180 / Math.PI) % 360}, 100%, 50%)`;
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();
        }
    }

    angle += rotationSpeed;

    if (!stopDrawingFlag) {
        requestAnimationFrame(drawSpirography);
    }
}

// initialize function, starts the loop
function init() {
    stopDrawingFlag = false;
    requestAnimationFrame(drawSpirography);
}

// start drawing function
function startDrawing() {
    stopDrawingFlag = false;
    requestAnimationFrame(drawSpirography);
}

// stop drawing function
function stopDrawing() {
    stopDrawingFlag = true;
}
