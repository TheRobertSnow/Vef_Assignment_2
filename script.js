var cellList = [];
var data = {board: {_id: "default", dateGenerated: "2020-03-02T20:00:00.000Z", rows: 10, cols: 10, mines: 10, minePositions: [[1, 3], [3, 0], [4, 2], [4, 5], [4, 7], [6, 9], [7, 7], [8, 9], [9, 3], [9, 9]]}};
var gameOver = false;

function fetchData() {
		//Prepare the parameter value for 'myParam'
		gameOver = false;
		var row = parseInt(document.getElementById("rows").value);
		var column = parseInt(document.getElementById("columns").value);
		var mine = parseInt(document.getElementById("bombs").value);
		var maxMines = row * column
		//The URL to which we will send the request
		var url = 'https://veff213-minesweeper.herokuapp.com/api/v1/minesweeper';
		if (row >= 1 && column >= 1 && mine >= 1 && row <= 40 && column <= 40 && mine <= maxMines){
			//Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
			axios.post(url, {rows: row, cols: column, mines: mine} )
				.then(function (response) {
					//When successful, print 'Success: ' and the received data
					data = response.data;
					console.log("Success: ", data);
					generateGrid(data);
				})
				.catch(function (error) {
					//When unsuccessful, print the error.
					console.log(error);
					generateGrid(data);
				});
		}
		else{
			generateGrid(data)
		}

}

function generateGrid(data) {
	// This function creates the game board.
		this.grid.innerHTML="";
		for (var i=0; i<data.board.rows; i++) {
				row = this.grid.insertRow(i);
				for (var j=0; j<data.board.cols; j++) {
						cell = row.insertCell(j);

						// Create attributes for the cell
						var string = i + " " + j;	// This is the id
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
						cell.onclick = function() { checkCell(this); }
						cell.addEventListener("contextmenu", flagCell);
				}
		}
}

function checkWinner() {
	var flagCounter = 0;
	for (var i = 0; i <= data.board.minePositions.length - 1; i++) {
		pos = data.board.minePositions[i][0] + " " + data.board.minePositions[i][1]
		var flagged = document.getElementById(pos).getAttribute("flagged");
		if (flagged == "true") {
			flagCounter ++;
		}
	}
	for (var i = 0; i <= data.board.rows - 1; i++) {
		for (var j = 0; j <= data.board.cols - 1; j++) {
			console.log(grid.rows[i].cells[j].getAttribute("class"))
			console.log(grid.rows[i].cells[j].getAttribute("flagged"))
		}
	}
	
}

function checkCell(cell) {
	if (gameOver == false) {
		console.log(cell)
		var mine = cell.getAttribute("mine");
		var flagged = cell.getAttribute("flagged");
		if (mine == "true" && flagged == "false") {
			revealMines();
			
			gameOver = true;
			if (gameOver == true){
				var msg = document.getElementById("msg");
				msg.innerHTML = "Game Over!";
			}
		}
		else if (mine == "false" && flagged == "false") {
			cell.setAttribute("class", "td-clicked");
			cell.setAttribute("checked", "true");
			var mineCount = 0;
			var cellPositions = cell.id.split(" ");
			var cellRow = parseInt(cellPositions[0]);
			var cellCol = parseInt(cellPositions[1]);
			for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, data.board.rows-1); i++)
			{
				for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, data.board.cols-1); j++)
				{
					if (i < data.board.rows && j < data.board.cols)
					{
						if (grid.rows[i].cells[j].getAttribute("mine") == "true") mineCount++;
					}
				}
			}
			cell.innerHTML = mineCount;
			if (mineCount == 0)
			{
				cell.innerHTML = " ";
				for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, data.board.rows-1); i++)
				{
					for(var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, data.board.cols-1); j++)
					{
						if (i < data.board.rows && j < data.board.cols)
						{
		  					if (grid.rows[i].cells[j].innerHTML == "")
		  					{
		  						checkCell(grid.rows[i].cells[j]);
		  					}
		  				}
					}
				}
			}
			else if (mineCount == 1)
			{
				cell.style.color = "blue"
			}
			else if (mineCount == 2)
			{
				cell.style.color = "green"
			}
			else if (mineCount > 2)
			{
				cell.style.color = "red"
			}
		}
		checkWinner()
	}
}

function flagCell(e) {
	e.preventDefault();
	if (gameOver == false) {

		var checked = e.target.getAttribute("checked");
		var flagged = e.target.getAttribute("flagged");

		if (e.target == parent) {
			console.log(parent);
		}

		if (checked == "false" && flagged == "false") {
			var img = document.createElement("img");
			img.src = "images/flag.png";
			img.width = "16";
			var isImg = document.createAttribute("is-img");
			isImg.value = "true";
			img.setAttributeNode(isImg);
			e.target.appendChild(img);
			e.target.setAttribute("flagged", "true");
		}

		else if (flagged == "true") {
			var c = e.target.childNodes;
			e.target.removeChild(c[0]);
			e.target.setAttribute("flagged", "false");
		}
		else if (e.target.getAttribute("is-img") == "true") {
			var parent = e.target.parentElement;
			var child = parent.childNodes;
			parent.removeChild(child[0]);
			parent.setAttribute("flagged", "false");
		}
		checkWinner()
	}
}

function revealMines() {
    //Highlight all mines in red
    for (var i=0; i<data.board.rows; i++) {
      for(var j=0; j<data.board.cols; j++) {
        var cell = grid.rows[i].cells[j];
        if (cell.getAttribute("mine")=="true") {
			if (cell.getAttribute("flagged") == "true") {
				var child = cell.childNodes;
				cell.removeChild(child[0]);
			}
          	var pos = i + " " + j;
          	var img = document.createElement("img");
          	img.src = "images/bomb.png";
          	img.width = "16";
          	document.getElementById(pos).appendChild(img);
          	document.getElementById(pos).style.backgroundColor = "red";
        }
      }
    }
}
