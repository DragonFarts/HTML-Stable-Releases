// Global variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var numRows = 216;
var numCols = 216;
var cellSize = canvas.width / numCols;
var stopDrawingFlag = true;

// Initialize the grid
var grid = [];
for (var i = 0; i < numRows; i++) {
    var row = [];
    for (var j = 0; j < numCols; j++) {
        row.push(Math.random() > 0.5 ? 1 : 0);
    }
    grid.push(row);
}

// Rulesets
var rulesets = [    { name: "Conway's Game of Life", born: [3], survive: [2, 3] },
    { name: "Maze", born: [3], survive: [1, 2, 3, 4, 5] },
    { name: "Seeds", born: [2], survive: [] },
    { name: "Mazectric", born: [3, 4, 5], survive: [1, 2, 3, 4, 5] }
];
var currentRuleset = 0;

// Add click listener to canvas to change ruleset
canvas.addEventListener("click", function(event) {
    currentRuleset = (currentRuleset + 1) % rulesets.length;
    console.log("Ruleset changed to:", rulesets[currentRuleset].name);
});

// Update the grid
function updateGrid() {
    // Copy the current grid to a new one
    var newGrid = [];
    for (var i = 0; i < numRows; i++) {
        var row = [];
        for (var j = 0; j < numCols; j++) {
            row.push(grid[i][j]);
        }
        newGrid.push(row);
    }

    // Update each cell based on its neighbors and the current ruleset
    var bornRules = rulesets[currentRuleset].born;
    var surviveRules = rulesets[currentRuleset].survive;
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numCols; j++) {
            var numNeighbors = 0;
            for (var di = -1; di <= 1; di++) {
                for (var dj = -1; dj <= 1; dj++) {
                    if (di == 0 && dj == 0) continue;
                    var ni = i + di;
                    var nj = j + dj;
                    if (ni < 0 || ni >= numRows || nj < 0 || nj >= numCols) continue;
                    if (grid[ni][nj] == 1) {
                        numNeighbors++;
                    }
                }
            }

            if (grid[i][j] == 1 && surviveRules.indexOf(numNeighbors) == -1) {
                newGrid[i][j] = 0; // Cell dies from underpopulation or overpopulation
            } else if (grid[i][j] == 0 && bornRules.indexOf(numNeighbors) != -1) {
                newGrid[i][j] = 1; // Cell is born from reproduction
            }
        }
    }

    grid = newGrid;
}

// Draw the grid on the canvas
function drawGrid() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numCols; j++) {
            if (grid[i][j] == 1) {
                context.fillStyle = "#000000";
            } else {
                context.fillStyle = "#FFFFFF";
            }
            context.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
}

// Draw loop
function drawLoop() {
    updateGrid();
    drawGrid();

if (!stopDrawingFlag) {
    requestAnimationFrame(drawLoop);
}
}

// Initialize function, starts the loop
function init() {
    stopDrawingFlag = false;
    requestAnimationFrame(drawLoop);
}

// Start drawing function
function startDrawing() {
    stopDrawingFlag = false;
    requestAnimationFrame(drawLoop);
}

// Stop drawing function
function stopDrawing() {
    stopDrawingFlag = true;
}

// Add click listener to canvas to change ruleset
canvas.addEventListener("click", function (event) {
    currentRuleset = (currentRuleset + 1) % rulesets.length;
    console.log("Ruleset changed to:", rulesets[currentRuleset].name);
});

// Start the simulation
init();