		// Variables for the first pattern
		var firstMove = -5;
		var firstPixelSize = 3;
		var firstRotateRightDegrees = 45;
		var firstRotateLeftDegrees = -45;
		var firstRepeats = 10;

		// Variables for the second pattern
		var secondMove = 2;
		var secondPixelSize = 2;
		var secondRotateRightDegrees = 2;
		var secondRotateLeftDegrees = -2;
		var secondRepeats = 13;

		// Variables for the third pattern
		var thirdMove = -5;
		var thirdPixelSize = 17;
		var thirdRotateRightDegrees = 45;
		var thirdRotateLeftDegrees = -45;
		var thirdRepeats = 10;

		// Convert degrees to radians
		function degreesToRadians(degrees) {
			return degrees * (Math.PI / 180);
		}

		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");

		// Starting point in the middle of the canvas
		var x = canvas.width / 2;
		var y = canvas.height / 2;

		// Draw the first pattern
		drawPattern(x, y, "brown", firstPixelSize, firstMove, firstRepeats, degreesToRadians(firstRotateRightDegrees), degreesToRadians(firstRotateLeftDegrees), 1);

		// Redraw pattern with darker brown pixels, 3x square size, and moves down instead of up
		x = canvas.width / 2;
		y = canvas.height / 2;
		drawPattern(x, y, "#8B4513", secondPixelSize, secondMove, secondRepeats, degreesToRadians(secondRotateRightDegrees), degreesToRadians(secondRotateLeftDegrees), 1);

		// Redraw the first pattern with 10px 50% transparent pixels drawn of shades of green
		x = canvas.width / 2;
		y = canvas.height / 2;
		drawPattern(x, y, "rgba(0, 128, 0, 0.1)", thirdPixelSize, thirdMove, thirdRepeats, degreesToRadians(thirdRotateRightDegrees), degreesToRadians(thirdRotateLeftDegrees), 0.5);

		function drawPattern(startX, startY, color, squareSize, move, repeats, rotateRight, rotateLeft, alpha) {
			ctx.globalAlpha = alpha;

			// Draw the trunk
			ctx.fillStyle = color;
			for (var i = 0; i < repeats; i++) {
				ctx.fillRect(startX - squareSize / 2, startY - squareSize / 2, squareSize, squareSize);
				startY += move;
			}

			// Draw the first branch to the right
			drawBranch(startX, startY, rotateRight, repeats, color, squareSize, move);

			// Draw the second branch to the left
			drawBranch(startX, startY, rotateLeft, repeats, color, squareSize, move);

			// Draw the fourth branch to the left
			drawBranch(startX, startY, rotateLeft, repeats, color, squareSize, move);
		}

		// Function to draw a branch at a given angle with a given length
		function drawBranch(startX, startY, angle, length, color, squareSize, move) {
			ctx.save();
			ctx.translate(startX, startY);
			ctx.rotate(angle);

			ctx.fillStyle = color;
			for (var i = 0; i < length; i++) {
				ctx.fillRect(0, 0, squareSize, squareSize);
				ctx.translate(0, move);
			}

			if (length > 1) {
				// Draw the first branch to the right
				drawBranch(0, 0, angle, length - 1, color, squareSize, move);

				// Draw the second branch to the left
				drawBranch(0, 0, -angle, length - 1, color, squareSize, move);
			}

			ctx.restore();
		}