// define global variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var numArms, armLength, rotationSpeed, stopDrawingFlag, angle, time, zoomScale;
var maxArms = 21;
var minArms = 1;
var zoomSpeed = 0.0005;
var circleSpeed = 0.05;
var circles = [];

armLength = canvas.width / 3;
rotationSpeed = 0.0002;
angle = 0;
time = 0;
zoomScale = 1;

// draw expanding circle
function drawCircle(circle) {
    context.strokeStyle = circle.color;
    context.lineWidth = circle.lineWidth;
    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    context.stroke();
}

// update expanding circle
function updateCircle(circle) {
    circle.radius += circleSpeed;
    circle.lineWidth *= 0.99;
    if (circle.lineWidth < 0.1) {
        circles.splice(circles.indexOf(circle), 1);
    }
}

// create a new expanding circle
function createCircle() {
    var circle = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 0,
        lineWidth: 5,
        color: `hsl(${time * 2 % 360}, 100%, 50%)`
    };
    circles.push(circle);
}

// draw spirography
function drawSpirography() {
    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draw and update expanding circles
    for (var i = 0; i < circles.length; i++) {
        drawCircle(circles[i]);
        updateCircle(circles[i]);
    }

    // set the arm number based on a sinusoidal function of time
    numArms = Math.round(minArms + (maxArms - minArms) * (Math.sin(time * 0.1) * 0.5 + 0.5));

    // draw spirography lines
    for (var i = 0; i < numArms; i++) {
        var armAngle = (4 * Math.PI / numArms) * i + angle;
        var x1 = canvas.width / 2 + armLength * Math.cos(armAngle);
        var y1 = canvas.height / 2 + armLength * Math.sin(armAngle);

        for (var j = 0; j < numArms; j++) {
            var innerArmAngle = (2 * Math.PI / numArms) * j + angle;
            var x2 = canvas.width / 2 + armLength * Math.cos(innerArmAngle);
            var y2 = canvas.height / 2 + armLength * Math.sin(innerArmAngle);

            context.strokeStyle = `hsl(${(i + j) * 10 % 360}, 100%, 50%)`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();
        }
    }

    // update angles, time, and scale
    angle += rotationSpeed;
    time += 0.01;
    zoomScale += zoomSpeed;

    // create a new expanding circle every 100 milliseconds
    if (time % 0.1 < 0.01) {
        createCircle();
    }
}

// draw loop
function drawLoop() {
    drawSpirography();

    // apply the zoom effect
    context.setTransform(zoomScale, 0, 0, zoomScale, canvas.width / 2 * (1 - zoomScale), canvas.height / 2 * (1 - zoomScale));

    if (!stopDrawingFlag) {
        requestAnimationFrame(drawLoop);
    }
}

// initialize function, starts the loop
function init() {
    stopDrawingFlag = false;
    requestAnimationFrame(drawLoop);
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
