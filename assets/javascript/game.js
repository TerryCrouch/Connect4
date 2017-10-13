// Variable for grid matrix

var gridMatrix = [[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,]];

var ai = {
	possMoves: [0,0,0,0,0,0],
	threat: [0,0,0,0,0,0],
	offense: [0,0,0,0,0,0],
	player: {
		possTwo: [0,0,0,0,0,0],
		possThree: [0,0,0,0,0,0],
		possFour: [0,0,0,0,0,0]
	},
	cpu: {
		possTwo: [0,0,0,0,0,0],
		possThree: [0,0,0,0,0,0],
		possFour: [0,0,0,0,0,0]
	}
}


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

	$("#pageDiv").keyup(function() {
		return;
	});
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

	$(currentCell).addClass(currentPlayer);
	$(currentCell).removeClass("cell");

	if(currentPlayer === "r") {
		gridMatrix[x][y] = "r";
	} else {
		gridMatrix[x][y] = "b";
	}

	// update possible moves array
	ai.possMoves[x] += 1;

	determineMove();

	console.log(ai.player);
	console.log(ai.cpu);

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

	$("#pageDiv").keyup(function() {
		resetGame();
	});

	$("#pageDiv").click(function() {
		resetGame();
	})
}

// Reset game on win
function resetGame() {
	$("#board").html("");
	buildGrid();

	currentPlayer = "r";
	gridMatrix = [[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,]];

	$("#pageDiv").keyup(function() {
		return;
	});

	$("#pageDiv").click(function() {
		return;
	})
}


var ai = {
	possMoves: [0,0,0,0,0,0],
	threat: [0,0,0,0,0,0],
	offense: [0,0,0,0,0,0],
	player: {
		possTwo: [0,0,0,0,0,0],
		possThree: [0,0,0,0,0,0],
		possFour: [0,0,0,0,0,0]
	},
	cpu: {
		possTwo: [0,0,0,0,0,0],
		possThree: [0,0,0,0,0,0],
		possFour: [0,0,0,0,0,0]
	}
}

// determine next move
function determineMove() {

	ai.player = {
		possTwo: [0,0,0,0,0,0],
		possThree: [0,0,0,0,0,0],
		possFour: [0,0,0,0,0,0]
	}
	ai.cpu = {
		possTwo: [0,0,0,0,0,0],
		possThree: [0,0,0,0,0,0],
		possFour: [0,0,0,0,0,0]
	}

	/* loop through possible moves array */
	for(var i = 0; i <= 5; i += 1) {
		/* only process if column isn't full */
		if(ai.possMoves[i] < 6) {
			/* get x and y coords */
			var x = i;
			var y = ai.possMoves[i];

			var moves = { 
				in: {
					red: {
						row: 0, 
						col: 0, 
						diagD: 0, 
						diagU: 0
					},
					black: {
						row: 0, 
						col: 0, 
						diagD: 0, 
						diagU: 0
					}
				},
				poss: {
					red: {
						row: 0, 
						col: 0, 
						diagD: 0, 
						diagU: 0
					},
					black: {
						row: 0, 
						col: 0, 
						diagD: 0, 
						diagU: 0
					}
				}
			}

			ai.player = {
				possTwo: [0,0,0,0,0,0],
				possThree: [0,0,0,0,0,0],
				possFour: [0,0,0,0,0,0]
			},
			ai.cpu = {
				possTwo: [0,0,0,0,0,0],
				possThree: [0,0,0,0,0,0],
				possFour: [0,0,0,0,0,0]
			}


			/* row and column check */
			for(var k = 0; k <= 5; k += 1) {
				if(gridMatrix[x][k] === "b") {
					moves.poss.black.col += 1;
					moves.in.black.col += 1;
					moves.poss.red.col = 0;
					moves.in.red.col = 0;
				} else if(gridMatrix[x][k] === "r"){
					moves.poss.red.col += 1;
					moves.in.red.col += 1;
					moves.poss.black.col = 0;
					moves.in.red.col = 0;
				} else {
					moves.poss.red.col += 1;
					moves.poss.black.col += 1;
				}

				if(gridMatrix[k][y] === "b") {
					moves.poss.black.row += 1;
					moves.in.black.row += 1;
					moves.poss.red.row = 0;
					moves.in.red.row = 0;
				} else if(gridMatrix[k][y] === "r"){
					moves.poss.red.row += 1;
					moves.in.red.row += 1;
					moves.poss.black.row = 0;
					moves.in.black.row = 0;
				} else {
					moves.poss.red.row += 1;
					moves.poss.black.row += 1;
				}


				if(moves.poss.red.col === 4) {
					if(moves.in.red.col === 2){
						ai.player.possTwo[k] += 1;
					} else if(moves.in.red.col === 3) {
						ai.player.possThree[k] += 1;
					} else if(moves.in.red.col === 4) {
						ai.player.possFour[k] += 1;
					}
				}

				if(moves.poss.black.col === 4) {
					if(moves.in.black.col === 2){
						ai.cpu.possTwo[k] += 1;
					} else if(moves.in.black.col === 3) {
						ai.cpu.possThree[k] += 1;
					} else if(moves.in.black.col === 4) {
						ai.cpu.possFour[k] += 1;
					}
				}

				if(moves.poss.red.row === 4) {
					if(moves.in.red.row === 2){
						ai.player.possTwo[x] += 1;
					} else if(moves.in.red.row === 3) {
						ai.player.possThree[x] += 1;
					} else if(moves.in.red.row === 4) {
						ai.player.possFour[x] += 1;
					}
				}

				if(moves.poss.black.row === 4) {
					if(moves.in.black.row === 2){
						ai.cpu.possTwo[x] += 1;
					} else if(moves.in.black.row === 3) {
						ai.cpu.possThree[x] += 1;
					} else if(moves.in.black.row === 4) {
						ai.cpu.possFour[x] += 1;
					}
				}
			}

		}

	}
}