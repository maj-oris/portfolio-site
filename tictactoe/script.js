var btnArray = new Array(9);

btnArray[0] = document.getElementById('button00');
btnArray[1] = document.getElementById('button01');
btnArray[2] = document.getElementById('button02');
btnArray[3] = document.getElementById('button10');
btnArray[4] = document.getElementById('button11');
btnArray[5] = document.getElementById('button12');
btnArray[6] = document.getElementById('button20');
btnArray[7] = document.getElementById('button21');
btnArray[8] = document.getElementById('button22');

/*var board = new Array(9).fill("-");*/

var board = [
  new Array(3).fill("-"),
  new Array(3).fill("-"),
  new Array(3).fill("-")
]

///////////////////////////////

function randomArrayElement(inputArray) {
  return inputArray[Math.floor(Math.random() * inputArray.length)];
}

function btnsLock() {
  for(j = 0; j < btnArray.length;j++){ btnArray[j].disabled = true; }
}

function btnsUnlock() {
  for(j = 0; j < btnArray.length;j++){ btnArray[j].disabled = false; }
}

function boardRender(){
  board.forEach((row, i) => {
    row.forEach((square, j) => {
      btnArray[(i*3 + j)].textContent = board[i][j];
    });
  });

}

function getEmptyPos(inputBoard){

  var emptyIndexes = new Array();

  board.forEach((row, i) => {
    row.forEach((square, j) => {
      if(square == "-") {
        emptyIndexes.push([i,j]);
      }
    });
  });

  return emptyIndexes;
}

function playerMove(inputbtn){
  aN = btnArray.indexOf(inputbtn);
  var i = Math.floor(aN/3);
  var j = aN % 3;
  board[i][j] = "X";
}

function computerMove(){
  posMoves = getEmptyPos(board);
  console.log(posMoves);
  selectedPos = randomArrayElement(posMoves);
  console.log(selectedPos);
  board[selectedPos[0]][selectedPos[1]] = "O";
}

///////////////////////////////

boardRender();

for(i = 0; i < btnArray.length;i++){
  btnArray[i].onclick = function(){
    if(this.textContent == "-"){ //player cannot place a marker on an occupied position
      playerMove(this);
      boardRender();
      btnsLock();
      computerMove();
      boardRender();
      setTimeout(function(){
        btnsUnlock();
      }, 500);
    }
  };
}
