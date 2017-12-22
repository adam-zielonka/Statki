//Statki
function createHTMLBoard(id, plansza, ships, opponent=false){
  var html = "<table>"
  for(var i=0;i<=10;i++){
    html+= "<tr>"
    for(var j=0;j<=10;j++){
      var button = ""
      if(j == 0 && i == 0){
        button = "&nbsp;"
      } else if (i == 0) {
        button = j
      } else if (j == 0) {
        button = numberToChar(i)
      } else {
        var buttonID = id+numberToChar(i)+j
        var enabled = opponent ? "" : "disabled"
        button = `<button type="button" onclick="fire(this,${i},${j},${plansza},${ships},${opponent})" ${enabled}
         id="${buttonID}" >&nbsp;</button>`
      }
      html+= "<td>" +  button + "</td>"
    }
    html+= "</tr>"
  }
  html += "</table>"
  document.getElementById(id).innerHTML = html
}

function colorBoard(name, board, opponent) {
  for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
      var color = opponent ? getOpponentColor(board[i][j]) : getColor(board[i][j])
      document.getElementById(name+numberToChar(i+1)+(j+1)).style.backgroundColor = color
    }
  }
}

function numberToChar(number) {
  switch (number) {
    case 1: return "A"
    case 2: return "B"
    case 3: return "C"
    case 4: return "D"
    case 5: return "E"
    case 6: return "F"
    case 7: return "G"
    case 8: return "H"
    case 9: return "I"
    case 10: return "J"
    default: return ""
  }
}

function charToNumber(char) {
  switch (char) {
    case "A": return 0
    case "B": return 1
    case "C": return 2
    case "D": return 3
    case "E": return 4
    case "F": return 5
    case "G": return 6
    case "H": return 7
    case "I": return 8
    case "J": return 9
    default: return 10
  }
}

function getColor(id) {
  switch (id) {
    case 1: return "red"
    case 2: return "white"
    case 3: return "black"
    default: return "blue"
  }
}

function getOpponentColor(id) {
  switch (id) {
    case 2: return "white"
    case 3: return "black"
    default: return "blue"
  }
}

function getBoardName(id, y){
   return id.substring(0, id.length - (y == 10 ? 3 : 2))
}

function fire(s,x,y,plansza, ships, opponent){
  if(!endGame) {
    var playAgain = true
    switch (plansza[x-1][y-1]) {
      case 0:
        plansza[x-1][y-1] = 2
        playAgain = false
        // if(!opponent) {
        //   ai.last = undefined
        // }
        break;
      case 1:
        plansza[x-1][y-1] = 3
        if(!opponent) {
          ai.last = []
          ai.last[0] = x-1
          ai.last[1] = y-1
        }
        break;
    }
    endGame = shipsStatus(ships,plansza,opponent)
    colorBoard(getBoardName(s.id,y),plansza,opponent);
    if((!playAgain && opponent) || (playAgain && !opponent)) playAI()
  }
}

function getXY(id) {
  return [charToNumber(id.substring(0,1)), id.substring(1)-1]
}

function listShips(ships){
  for (var ship of ships) {
    var log = ship.length+" "
    for (var mast of ship) {
      log += mast + ": [" + getXY(mast) + "], "
    }
    console.log(log);
  }
}

var endGame = false

function shipsStatus(ships, board, opponent){
  var win = true
  var counter = 0
  for (var ship of ships) {
    var test = true;
    for (var mast of ship) {
      var xy = getXY(mast)
      if(board[xy[0]][xy[1]] == 1) test = false
    }
    if(test) {
      shipDown(ship, board)
      counter++
    }
    else win = false
  }
  if(!opponent){
    if(ai.counter != counter){
      ai.last = undefined
      ai.counter = counter
    }
  }
  return win
}

function shipDown(ship, board) {
  for (var mast of ship) {
    var xy = getXY(mast)
    setMishits(xy[0],xy[1],board)
  }
}

function setMishits(i, j, board){
  if(i-1>=0 && j-1>=0 && board[i-1][j-1] == 0) board[i-1][j-1] = 2
  if(i-1>=0 &&           board[i-1][j] == 0) board[i-1][j] = 2
  if(i-1>=0 && j+1<10 && board[i-1][j+1] == 0) board[i-1][j+1] = 2
  if(j+1<10 &&           board[i][j+1] == 0) board[i][j+1] = 2
  if(j-1>=0 &&           board[i][j-1] == 0) board[i][j-1] = 2
  if(i+1<10 && j+1<10 && board[i+1][j+1] == 0) board[i+1][j+1] = 2
  if(i+1<10 && j-1>=0 && board[i+1][j-1] == 0) board[i+1][j-1] = 2
  if(i+1<10 &&           board[i+1][j] == 0) board[i+1][j] = 2
}

function generateBoard(ships) {
  var board = []
  for(var i=0; i<10; i++) {
    board[i] = []
    for(var j=0; j<10; j++)
      board[i][j] = 0
  }
  for (var ship of ships) {
    for (var mast of ship) {
      var xy = getXY(mast)
      board[xy[0]][xy[1]] = 1
    }
  }
  return board
}

function pushLast(){}

var ai = {}
function setAI(boardName, board, ships){
  ai.boardName = boardName
  ai.board = board
  ai.ships = ships
  ai.counter = 0
}

function around(i, j, board, counter=0) {
  var x = getRandom(1, 5)
  switch (x) {
    case 1: if(i-1>=0 && (board[i-1][j] == 0 || board[i-1][j] == 1)) return [i-1,j]
    case 2: if(i+1<10 && (board[i+1][j] == 0 || board[i+1][j] == 1)) return [i+1,j]
    case 3: if(j-1>=0 && (board[i][j-1] == 0 || board[i][j-1] == 1)) return [i,j-1]
    case 4: if(j+1<10 && (board[i][j+1] == 0 || board[i][j+1] == 1)) return [i,j+1]
    default: {
      if(i-1>=0 && (board[i-1][j] == 0 || board[i-1][j] == 1)) return [i-1,j]
      if(i+1<10 && (board[i+1][j] == 0 || board[i+1][j] == 1)) return [i+1,j]
      if(j-1>=0 && (board[i][j-1] == 0 || board[i][j-1] == 1)) return [i,j-1]
      // if(i-1>=0 && (board[i-1][j] == 3)) return [i-1,j]
      // if(i+1<10 && (board[i+1][j] == 3)) return [i+1,j]
      // if(j-1>=0 && (board[i][j-1] == 3)) return [i,j-1]
      // if(j+1<10 && (board[i][j+1] == 3)) return [i,j+1]
      return [getRandom(1, 11), getRandom(1, 11)]
    }
  }
}

function playAI(){
  var s = {}
  if(!ai.last) {
    var x = getRandom(1, 11)
    var y = getRandom(1, 11)
  } else {
    var xy = around(ai.last[0],ai.last[1], ai.board)
    var x = xy[0]+1
    var y = xy[1]+1
  }
  s.id = ai.boardName + numberToChar(x) + y
  fire(s, x, y, ai.board, ai.ships, false)
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
