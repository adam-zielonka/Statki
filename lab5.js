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

function fire(s,x,y,plansza,ships, opponent){
  switch (plansza[x-1][y-1]) {
    case 0:
      plansza[x-1][y-1] = 2
      break;
    case 1:
      plansza[x-1][y-1] = 3
      break;
  }
  var win = shipsStatus(ships,plansza)
  colorBoard(getBoardName(s.id,y),plansza,opponent);
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

function shipsStatus(ships, board){
  var win = true
  for (var ship of ships) {
    var test = true;
    for (var mast of ship) {
      var xy = getXY(mast)
      if(board[xy[0]][xy[1]] == 1) test = false
    }
    if(test) shipDown(ship, board)
    else win = false
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
