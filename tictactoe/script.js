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

function btnsLock() {
  for(j = 0; j < btnArray.length;j++){ btnArray[j].disabled = true; }
}

function btnsUnlock() {
  for(j = 0; j < btnArray.length;j++){ btnArray[j].disabled = false; }
}

/*function boardRender() {
  board.forEach((item, i) => {
    switch (item) {
      case "-":
        btnArray[i].textContent = "-";
        break;
      case "X":
        btnArray[i].textContent = "X";
        break;
      case "O":
        btnArray[i].textContent = "O";
        break;
    }
  });
}*/

function boardRender(){
  
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


///////////////////////////////

board[1][1] = "X";

console.log(getEmptyPos(board));

/*
for(i = 0; i < btnArray.length;i++){
  btnArray[i].onclick = function(){
    console.log(this.id);
    btnsLock();
    setTimeout(function(){
      btnsUnlock();
    }, 1000);
  };
}
*/
