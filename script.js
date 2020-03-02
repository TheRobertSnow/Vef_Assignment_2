var cellList = [];
var data = {};

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
				})
				.then(function () {
						// This code is always executed, independent of whether the request succeeds or fails.
				});
}

function generateGrid(data) {
		this.grid.innerHTML="";
		for (var i=0; i<data.board.rows; i++) {
				row = this.grid.insertRow(i);
				for (var j=0; j<data.board.cols; j++) {
						cell = row.insertCell(j);
						var string = i + "" + j;
						cell.setAttribute("id", string);
						var cla = document.createAttribute("class");
						cla.value = "";
						cell.setAttributeNode(cla);
						var checked = document.createAttribute("checked");
						checked.value = "false";
						cell.setAttributeNode(checked);
						var mine = document.createAttribute("mine");
						mine.value = "false";
						for (var k=0; k<data.board.minePositions.length; k++) {
								if (i == data.board.minePositions[k][0] && j == data.board.minePositions[k][1]) {
										mine.value = "true";
								}
						}
						cell.setAttributeNode(mine);
						cell.addEventListener("click", checkTile);
						cell.addEventListener("contextmenu", flagTile);
				}
		}
}

function checkTile(e) {
	if (e.target.getAttribute("mine") == "true") {
		revealMines();
		console.log("BOMB")
	}
	else if (e.target.getAttribute("mine") == "false") {
		console.log("NOT BOMB");
	}
}

function flagTile(e) {
	e.preventDefault();
	var checked = e.target.getAttribute("checked");
	if (checked == "false") {
		var img = document.createElement("img");
		img.src = "images/flag.png";
		img.width = "20";
		e.target.appendChild(img);
	}
	else if (checked == "true") {

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
