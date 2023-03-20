// Global variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var numRows = 64;
var numCols = 64;
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

    // Update each cell based on its neighbors
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

            if (grid[i][j] == 1 && (numNeighbors < 2 || numNeighbors > 3)) {
                newGrid[i][j] = 0; // Cell dies from underpopulation or overpopulation
            } else if (grid[i][j] == 0 && numNeighbors == 3) {
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
                context.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
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
