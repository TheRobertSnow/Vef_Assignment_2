var grid = document.getElementById("grid");

function generateGrid(data) {
    grid.innerHTML="";
    for (var i=0; i<data.board.rows; i++) {
        row = grid.insertRow(i);
        for (var j=0; j<data.board.cols; j++) {
            cell = row.insertCell(j);
            cell.id = i + "" + j
            var mine = document.createAttribute("isMine");
            mine.value = "False";
            for (var k=0; k<data.board.minePositions.length; k++) {
                if (i == data.board.minePositions[k][0] && j == data.board.minePositions[k][1]) {
                    mine.value = "True"
                    setMines(i + "" + j);
                }
            }  
            cell.setAttributeNode(mine);
            cell.onmousedown = function() {cellClicked(i + "" + j, cell);}
        }
    }
}

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
            var data = response.data;
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

function setMines(pos) {
    var img = document.createElement("img");
    img.src = "images/bomb.png";
    img.width = "20";
    document.getElementById(pos).appendChild(img);
    //bætir mynd af bombu i alla reiti með bombu
    //, sniðugt að nota þetta ef maður ytir a bombu, þvi þa eiga allar bombur að sjast
    //, var bara með þetta til að sja hvor bombur eru
}
function cellClicked(pos, cell) {
    console.log(event)
    ev.preventDefault();
    if (e.which == 3) { // þetta a að vera rightclick
        var img = document.createElement("img");
        img.src = "images/flag.png";
        img.width = "20";
        document.getElementById(pos).appendChild(img);
        // bætir við mynd af flaggi i reitinn
    }
    else if (e.which == 1) { // leftclick
        if (cell.getAttributeNode("isMine").value != "False") {
            console.log("BOMB")
        }
        else{
            console.log("NOT BOMB")
        }
    }
}