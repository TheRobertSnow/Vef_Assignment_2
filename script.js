var grid = document.getElementById("grid");


function generateGrid(data) {
    // grid.innerHTML = "";
    for(var i=0; i<data.board.rows; i++) {
        var row = grid.insertRow(i);
        for(var j=0; j<data.board.cols; j++) {
            var cell = row.insertCell(j);
        }
    }
}

function fetchData() {
    //Prepare the parameter value for 'myParam'
    var row = parseInt(document.getElementById("rows").value);
    var column = parseInt(document.getElementById("columns").value);
    var mine = parseInt(document.getElementById("bombs").value);
    console.log(row);
    console.log(column);
    console.log(mine);

    //The URL to which we will send the request
    var url = 'https://veff213-minesweeper.herokuapp.com/api/v1/minesweeper';

    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, {rows: row, cols: column, mines: mine} )
        .then(function (response) {
            //When successful, print 'Success: ' and the received data
            console.log("Success: ", response.data);
            generateGrid(response.data)
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error);
        })
        .then(function () {
            // This code is always executed, independent of whether the request succeeds or fails.
        });
}
