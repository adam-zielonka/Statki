//Zadanie 1
for(var i=1; i<=100; i++) {
  var opis = "";
  if(!(i%3)) opis += "Fizz";
  if(!(i%5)) opis += "Buzz";
  if(opis == "") opis = i;
  console.log(opis);
}
//Zadanie 2
function triPascal(n){
  var line = [1];
  console.log(line);
  for(var i=1; i<n; i++) {
      var nextLine = [1];
      for(var j=1; j<line.length; j++){
        nextLine[nextLine.length] = line[j-1] + line[j];
      }
      nextLine[nextLine.length] = 1;
      line = nextLine;
      console.log(line);
  }
}
triPascal(9);
//Zadanie 3
function saper(tablica){
  var n = tablica.length;
  for(var i=0; i<n; i++){
    var m = tablica[i].length;
    for(var j=0; j<m; j++){
      if(tablica[i][j] != "*") {
        var count = 0;
        if(i-1>=0 && j-1>=0 && tablica[i-1][j-1] == "*") count++;
        if(i-1>=0 && tablica[i-1][j] == "*") count++;
        if(i-1>=0 && j+1<m && tablica[i-1][j+1] == "*") count++;
        if(j+1<m && tablica[i][j+1] == "*") count++;
        if(j-1>=0 && tablica[i][j-1] == "*") count++;
        if(i+1<n && j+1<m && tablica[i+1][j+1] == "*") count++;
        if(i+1<n && j-1>=0 && tablica[i+1][j-1] == "*") count++;
        if(i+1<n && tablica[i+1][j] == "*") count++;
        tablica[i][j] = count;
      }
    }
  }
  return tablica;
}
var pola = saper([
  ["","","","",""],
  ["","","*","",""],
  ["","*","","*",""],
  ["","","*","",""],
  ["","","","",""],
  ["","","","","*"]
])
console.log(pola);
for (var i=0; i<pola.length; i++) {
  var linia = "";
  for (var j=0; j<pola[i].length; j++) {
    linia+=pola[i][j]+'\t';
  }
  console.log(linia)
}
//Zadanie 4
function czyPierwsza(liczba){
    if(liczba<2)
      return false;

    for(var i=2;i*i<=liczba;i++){
      if(liczba%i==0)
        return false;
    }
    return true;
}
//Zadanie 5
var memory = [];
function czyPierwszaMemory(liczba){
  if(memory[liczba] == undefined){
    memory[liczba] = czyPierwsza(liczba);
  }
  return memory[liczba];
}
console.log(czyPierwszaMemory(2));
console.log(czyPierwszaMemory(13));
console.log(czyPierwszaMemory(5));
console.log(czyPierwszaMemory(93));
console.log(czyPierwszaMemory(17));
console.log(czyPierwszaMemory(101));
console.log(czyPierwszaMemory(102));
console.log(czyPierwszaMemory(17));
//Zadanie 6
function wartoscReki(reka){
  var suma = 0;
  var liczbaA = 0;
  for (var i = 0; i < reka.length; i++) {
    if(reka[i]>=2 && reka[i]<=10)
      suma += reka[i];
    else {
      switch (reka[i]) {
        case "W":
        case "D":
        case "K":
          suma += 10;
          break;
        case "A":
          liczbaA++;
          break;
      }
    }
  }
  for(var i=liczbaA; i>0;i--){
    if(suma+(11)*i<=21){
      suma+=11;
    } else {
      suma+=1;
    }
  }
  if(suma>21){
    return "FURA";
  } else {
    return suma;
  }
}
console.log(wartoscReki([2,4,7,'A','K']))
console.log(wartoscReki(['A',10]))
console.log(wartoscReki(['A','A',10]))
console.log(wartoscReki([10,10,10]))
console.log(wartoscReki(['A','A','A',10]))
