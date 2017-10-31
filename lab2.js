var tablica = [null,"c",3,4.32,false,"c",true,true,true,0,undefined,"","a",0,null,"c"];
var tablica2 = ["Ala","ma","kota"];
//Zadanie 1
var zad1 = tablica.filter(v => v != false && v != null);
console.log(zad1);
//Zadanie 2
function findMax(tab){
  function KeyValue(){};
  KeyValue.prototype.forEach = function (fun) {
    for (var v in this) if (this.hasOwnProperty(v)) fun(v,this[v]);
  };
  var kv = new KeyValue();
  var keys = [];
  var max = 0;
  tab.forEach(k => kv[k] = 0);
  tab.forEach(k => kv[k]++);
  kv.forEach((k,v) => max = v > max ? v : max);
  kv.forEach((k,v) => v == max ? keys.push(k) : 0);
  return keys + " : " + max;
}
console.log(findMax(tablica));
console.log(findMax(tablica2));
//Zadanie 3
var zad3 = tablica2.map(v => v.length);
console.log(zad3);
//Zadanie 4
function test(from, to, i){
  if(from<to) return i<=to;
  return i>=to;
}
function fill(from, to, step){
  var tab = [];
  for(var i=from;test(from,to,i);i+=step)
    tab.push(i);
  return tab;
}
console.log(fill(3,27,3));
console.log(fill(25,-5,-5));
//Zadanie 5
var tablica3 = ["a",["b","c"],"d","e",["f","g"]];
var zad5 = tablica3.reduce((total,v) => total.concat(v), []);
console.log(zad5);
