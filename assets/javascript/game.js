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
}

buildGrid();

// Function to toggle active player
var currentPlayer = "red";
var pieces = {
	red: [],
	black: []
}


function togglePlayer() {
	if(currentPlayer === "red") {
		currentPlayer = "black";
	} else if(currentPlayer === "black") {
		currentPlayer = "red";
	}
}

// Click event for entire grid to determine drop column
$(".cell").click(function() {
	cellClicked(this);
})


// Function will add piece to the clicked column in lowest index position.  Lower left is [0] [0]

function cellClicked(cell) {

	var x = parseInt($(cell).attr("x"));

	for(var y = 0; y <= 5; y += 1) {

		console.log("x: "+x+" y: "+y)

		var found = false;

		for(var color in pieces) {

			console.log(pieces[color]);

			for(var i = 0; i < pieces[color].length; i += 1) {

				if(pieces[color][i][0] === x && pieces[color][i][1] === y){

					console.log(pieces[color][i][0]+" "+pieces[color][i][1]);

					found = true;

				}
			}
		}

		if(!found) {
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

	if(currentPlayer === "red") {
		pieces.red.push([x,y]);
		console.log(pieces)
	} else {
		pieces.black.push([x,y]);
	}

	togglePlayer();
}

// Function to check if the game is won



		//If game is not won, next player's turn - return to toggle active player



		// If game is won, add score to proper color and reset board
