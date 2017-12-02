//Statki
function createHTMLBoard(id, plansza, enable=true){
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
        var enabled = enable ? "" : "disabled"
        button = `<button type="button" onclick="fire(this,${i},${j},${plansza})" ${enabled}
         id="${buttonID}" >&nbsp;</button>`
      }
      html+= "<td>" +  button + "</td>"
    }
    html+= "</tr>"
  }
  html += "</table>"
  document.getElementById(id).innerHTML = html
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

function fire(s,x,y,plansza){
  if(plansza[x-1][y-1] == 0){
    s.style.backgroundColor = "red"
    plansza[x-1][y-1] = 1
  } else {
    s.style.backgroundColor = "blue"
    plansza[x-1][y-1] = 0
  }
}
