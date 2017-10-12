// Variable for grid matrix

var gridMatrix = [[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,]]

// Function to create the grid system and assign X/Y coordinates
function buildGrid() {
	var boardDiv = $("#board");
	for(var y = 5; y >= 0; y -= 1) {
		var rowDiv = $("<div>").addClass("row");
		for(var x = 0; x <= 5; x += 1) {
			var colDiv = $("<div>").addClass("col-xs-2 cell");
			$(colDiv).attr("x", x).attr("y",y);
			$(rowDiv).append(colDiv);
		}
		$(boardDiv).append(rowDiv);
	}

	$(".cell").click(function() {
		cellClicked(this);
	})
}

buildGrid();

// Function to toggle active player
var currentPlayer = "r";
var redWins = 0, blackWins = 0;

function togglePlayer() {
	if(currentPlayer === "r") {
		currentPlayer = "b";
		$("#player").css("background-color","black");
		$("#currPlayer").text("Black");
		$("#board").css("border-bottom","10px solid black");
		
	} else if(currentPlayer === "b") {
		currentPlayer = "r";
		$("#player").css("background-color","red");
		$("#currPlayer").text("Red");
		$("#board").css("border-bottom","10px solid red");

	}
}

// Click event for entire grid to determine drop column



// Function will add piece to the clicked column in lowest index position.  Lower left is [0] [0]

function cellClicked(cell) {

	var x = parseInt($(cell).attr("x"));

	for(var y = 0; y <= 5; y += 1) {

		if(gridMatrix[x][y] === undefined) {
			addPiece(x,y);
			return;
		}
	}

	return;

}


// Populate piece color

function addPiece(x,y) {
	var currentCell = $(".cell[x='"+x+"'][y='"+y+"']");
	console.log(currentCell);
	$(currentCell).addClass(currentPlayer);
	$(currentCell).removeClass("cell");

	if(currentPlayer === "r") {
		gridMatrix[x][y] = "r";
	} else {
		gridMatrix[x][y] = "b";
	}

	if(winCheck(x,y)) {
		console.log("win");
		updateScore();
		promptWin();
	} else {
		togglePlayer();
	}
}

// Function to check if the game is won

function winCheck(x, y) {
	//console.log(x);
	//console.log(y);
	// row and column check
	var row = 0, column = 0;
	for(var i = 0; i <= 5; i += 1) {
		if(gridMatrix[x][i] === currentPlayer) {
			column += 1;
		} else {
			column = 0;
		}

		if(gridMatrix[i][y] === currentPlayer) {
			row += 1;
		} else {
			row = 0;
		}

		if(row === 4 || column === 4) {
			return true;
		}
	}

	var lx = x, ly = y, hx = x, hy = y;

	while(lx > 0 && ly > 0) {
		lx -= 1;
		ly -= 1;
	}

	while(hx > 0 && hy < 5) {
		hx -= 1;
		hy += 1;
	}

	// Low Diagonal Check
	if(lx <= 2) {
		var diag = 0
		while(lx <= 5 && ly <= 5) {
			if(gridMatrix[lx][ly] === currentPlayer) {
				diag += 1;
			} else {
				diag = 0;
			}

			if(diag === 4) {
				return true;
			}

			lx += 1;
			ly += 1;
		}
	}

	// High Diagonal Check
	if(hx <= 2) {
		var diag = 0
		while(hx <= 5 && hy >= 0) {
			if(gridMatrix[hx][hy] === currentPlayer) {
				diag += 1;
			} else {
				diag = 0;
			}

			if(diag === 4) {
				return true;
			}

			hx += 1;
			hy -= 1;
		}
	}
}

// If game is won, add score to proper color and reset board

function updateScore() {
	if(currentPlayer === "r") {
		redWins += 1;
	} else {
		blackWins +=1;
	}
	$("#redCount").text(redWins);
	$("#blackCount").text(blackWins);
}


// Prompt if the user wins
function promptWin() {
	var pageDiv = $("<div>").attr("id","pageDiv");

	var winDiv = $("<div>").attr("id", "winDiv");
	if(currentPlayer === "r") {
		var winText = $("<h1>").attr("id","winText").text("Red Wins!");
	} else {
		var winText = $("<h1>").attr("id","winText").text("Black Wins!");
	}

	var keyDiv = $("<p>").attr("id","keyDiv");

	var pressKey = "Press Any Key to Play Again";

	$(winDiv).append(winText);
	$(winDiv).append("<br>");
	$(keyDiv).append(pressKey);
	$(winDiv).append(keyDiv);
	$(pageDiv).append(winDiv);

	$("#board").append(pageDiv);
	console.log("doing shit");


	$(document).keyup(function() {
		resetGame();
	});
}

// Reset game on win
function resetGame() {
	$("#board").html("");
	buildGrid();

	currentPlayer = "r";
	gridMatrix = [[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,]];

}