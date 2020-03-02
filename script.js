var cellList = [];
var data = {};
var gameOver = false;

function fetchData() {
		//Prepare the parameter value for 'myParam'
		var row = parseInt(document.getElementById("rows").value);
		var column = parseInt(document.getElementById("columns").value);
		var mine = parseInt(document.getElementById("bombs").value);

		//The URL to which we will send the request
		var url = 'https://veff213-minesweeper.herokuapp.com/api/v1/minesweeper';

		//Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
		axios.post(url, {rows: row, cols: column, mines: mine} )
				.then(function (response) {
						//When successful, print 'Success: ' and the received data
						data = response.data;
						console.log("Success: ", data);
						generateGrid(data)
				})
				.catch(function (error) {
						//When unsuccessful, print the error.
						console.log(error);
				});
}

function generateGrid(data) {
	// This function creates the game board.
		this.grid.innerHTML="";
		for (var i=0; i<data.board.rows; i++) {
				row = this.grid.insertRow(i);
				for (var j=0; j<data.board.cols; j++) {
						cell = row.insertCell(j);

						// Create attributes for the cell
						var string = i + "" + j;	// This is the id
						cell.setAttribute("id", string);
						var cla = document.createAttribute("class");
						cla.value = "";
						cell.setAttributeNode(cla);
						var checked = document.createAttribute("checked");
						checked.value = "false";
						cell.setAttributeNode(checked);
						var flagged = document.createAttribute("flagged");
						flagged.value = "false";
						cell.setAttributeNode(flagged);
						var mine = document.createAttribute("mine");
						mine.value = "false";

						// Assigns appropriate value to the mine attribute if necessary
						for (var k=0; k<data.board.minePositions.length; k++) {
								if (i == data.board.minePositions[k][0] && j == data.board.minePositions[k][1]) {
										mine.value = "true";
								}
						}
						cell.setAttributeNode(mine);
						cell.addEventListener("click", checkCell);
						cell.addEventListener("contextmenu", flagCell);
				}
		}
}

function checkCell(e) {
	if (gameOver == false) {
		var mine = e.target.getAttribute("mine");
		var flagged = e.target.getAttribute("flagged");
		if (mine == "true" && flagged == "false") {
			revealMines();
			console.log("BOMB");
			gameOver = true;
		}

		else if (mine == "false" && flagged == "false") {
			console.log("NOT BOMB");
			e.target.setAttribute("class", "td-clicked");
			e.target.setAttribute("checked", "true");
		}
	}
}

function flagCell(e) {
	e.preventDefault();
	if (gameOver == false) {
		var checked = e.target.getAttribute("checked");
		var flagged = e.target.getAttribute("flagged");

		if (checked == "false" && flagged == "false") {
			var img = document.createElement("img");
			img.src = "images/flag.png";
			img.width = "20";
			e.target.appendChild(img);
			e.target.setAttribute("flagged", "true");
		}

		else if (flagged == "true") {
			var c = e.target.childNodes;
			e.target.removeChild(c[0]);
			e.target.setAttribute("flagged", "false");
		}
	}
}

function revealMines() {
    //Highlight all mines in red
    for (var i=0; i<data.board.rows; i++) {
      for(var j=0; j<data.board.cols; j++) {
        var cell = grid.rows[i].cells[j];
        if (cell.getAttribute("mine")=="true") {
          var pos = i + "" + j;
          var img = document.createElement("img");
          img.src = "images/bomb.png";
          img.width = "20";
          document.getElementById(pos).appendChild(img);
        }
      }
    }
}
