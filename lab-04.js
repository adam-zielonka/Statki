//Gra w życie
function game(tablica){
  var result = tablica.map(item => item.slice())
  var n = tablica.length;
  for(var i=0; i<n; i++){
    var m = tablica[i].length;
    for(var j=0; j<m; j++){
      var count = 0;
      if(i-1>=0 && j-1>=0 && tablica[i-1][j-1]) {count++;};
      if(i-1>=0 &&           tablica[i-1][j]) {count++};
      if(i-1>=0 && j+1<m  && tablica[i-1][j+1]) {count++};
      if(j+1<m  &&           tablica[i][j+1]) {count++};
      if(j-1>=0 &&           tablica[i][j-1]) {count++};
      if(i+1<n  && j+1<m  && tablica[i+1][j+1]) {count++};
      if(i+1<n  && j-1>=0 && tablica[i+1][j-1]) {count++};
      if(i+1<n  &&           tablica[i+1][j]) {count++};
      if(tablica[i][j]) {
        if(count < 2 || count > 3) result[i][j] = false;
      } else {
        if(count == 3) result[i][j] = true;
      }
    }
  }
  return result;
}

function print(lifeBoard){
  var result = "";
  for (var line of lifeBoard) {
    for (var element of line){
      if(element)result+="1 ";
      else result+="  "
    }
    result+="\n"
  }
  result+="\n"
  console.log(result)
}

function gameOfLife(board,n){
  print(board);
  var i=n;
  while ((i--)>0) {
    console.log("Iteracja: "+(n-i))
    board = game(board)
    print(board);
  }
}

var lifeBoard = [
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,true,false,false,false,false,false],
  [false,false,false,true,false,true,false,false,false,false],
  [false,false,true,false,false,false,false,false,false,false],
  [false,false,false,true,true,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false]
]

// gameOfLife(lifeBoard,20)
/*
gameOfLife([
  [false,false,false,false],
  [false,true,true,false],
  [false,true,true,false],
  [false,false,false,false]
],20)
*/
// gameOfLife([
//   [false,false,false,false,false,false,true,false],
//   [true,true,false,false,false,false,false,false],
//   [false,true,false,false,false,true,true,true],
// ],130)

// gameOfLife([
//   [false,false,true,false,false,false,false,false],
//   [false,false,true,true,false,false,false,false],
//   [false,false,true,true,false,false,false,false],
//   [false,false,false,true,false,false,false,false]
// ],10)

// gameOfLife([
//   [false,false,true,false,false,false,false,false],
//   [false,false,true,false,false,false,false,false],
//   [false,false,true,false,false,false,false,false],
//   [false,false,false,false,false,false,false,false]
// ],10)

// gameOfLife([
//   [true,true,true],
//   [true,false,true],
//   [true,true,true],
// ],10)

// gameOfLife([
//   [true,true,true,true,true,true,true,true,false,true,true,true,true,false,false,false,
//   true,true,true,false,false,false,false,false,false,true,true,true,true,true,true,true,
//   false,true,true,true,true,true]
// ],10)

gameOfLife([
  [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,true,false,false,false,false,true,false,false,false,false,false],
  [false,false,false,true,true,false,true,true,true,true,false,true,true,false,false,false],
    [false,false,false,false,false,true,false,false,false,false,true,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
],100)
