var game = new Game();

// function showMines() {
//     var img = document.createElement("img");
//     img.src = "images/bomb.png";
//     img.width = "20";
//     for (var i=0; i<data.rows; i++) {
//         for(var j=0; j<data.cols; j++) {
//             for (var k=0; k<data.board.minePositions.length; k++) {
//                 if (i == data.board.minePositions[k][0] && j == data.board.minePositions[k][1]) {
//                   document.getElementById(i + "" + j).appendChild(img);
//                 }
//             }
//         }
//     }

function revealMines() {
    //Highlight all mines in red
    for (var i=0; i<data.rows; i++) {
      for(var j=0; j<data.cols; j++) {
        var cell = grid.rows[i].cells[j];
        if (cell.getAttribute("data-mine")=="true") cell.className="mine";
      }
    }
}

    //bætir mynd af bombu i alla reiti með bombu
    //, sniðugt að nota þetta ef maður ytir a bombu, þvi þa eiga allar bombur að sjast
    //, var bara með þetta til að sja hvor bombur eru
function cellClicked(pos, cell) {
    console.log(event)
    event.preventDefault();
    if (event.which === 3) { // þetta a að vera rightclick
        var img = document.createElement("img");
        img.src = "images/flag.png";
        img.width = "20";
        document.getElementById(pos).appendChild(img);
        // bætir við mynd af flaggi i reitinn
    }
    // else if (event.which === 1) { // leftclick
    //     var cellValue = cell.getAttributeNode("isMine").value
    //     if (cellValue == "true") {
    //         console.log("Bomb");
    //         revealMines();
    //     }
    //     else if (cellValue == "false"){
    //         console.log("NOT BOMB");
    //         var cla = document.createAttribute("class");
    //         cla.value = "td-clicked";
    //         cell.setAttributeNode(cla);
    //     }
    // }
    else if (event.which === 1) {
      var cell = document.getElementById(pos);
      if (cell.ismine == "true") {
        console.log("BOMB");
      }
      else if (cell.ismine == "false") {
        console.log("NOT BOMB");
      }
    }
}



class Game {
  constructor() {
    this.grid = document.getElementById("grid");
    this.data = {};
    this.cellList = [];
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
              this.data = response.data;
              console.log("Success: ", this.data);
              this.generateGrid()
          })
          .catch(function (error) {
              //When unsuccessful, print the error.
              console.log(error);
          })
          .then(function () {
              // This code is always executed, independent of whether the request succeeds or fails.
          });
  }

  function generateGrid() {
      this.grid.innerHTML="";
      for (var i=0; i<data.board.rows; i++) {
          row = this.grid.insertRow(i);
          for (var j=0; j<data.board.cols; j++) {
              cell = row.insertCell(j);
              var string = i + "" + j;
              cell.setAttribute("id", string);
              var cla = document.createAttribute("class");
              cla.value = "";
              cell.setAttributeNode(cla)
              var mine = document.createAttribute("isMine");
              mine.value = "false";
              for (var k=0; k<this.data.board.minePositions.length; k++) {
                  if (i == this.data.board.minePositions[k][0] && j == this.data.board.minePositions[k][1]) {
                      mine.value = "true";
                      // showMines(i + "" + j); Setur myndir af sprengjum
                  }
              }
              cell.setAttributeNode(mine);
              var newCell = new Cell(mine.value, i, j, string, cell);
              newCell.addEventListener("click", this.checkTile);
  				    newCell.addEventListener("contextmenu", this.flagTile);
              cellList.push(newCell);
              // cell.onmousedown = function(event) {cellClicked(i + "" + j, cell);}
          }
      }
  }

  function checkTile() {

  }

  function flagTile() {

  }
}

class Cell {
  constructor(isBomb, row, col, id, cell) {
    this.isBomb = isBomb;
    this.row = row;
    this.col = col;
    this.id = id;
    this.cell = cell;
  }
}
