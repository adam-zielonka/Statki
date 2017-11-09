//http://icis.pcz.pl/~agrosser/js4A.pdf
function test(regx, text){
  console.log(text.match(regx))
  return text.match(regx)
}
function replace(regx, replacer, text){
  console.log(text.replace(regx, replacer))
}
function replaceTab(regx, replacer, tab){
  var result = [];
  for(var i=0; i<tab.length; i++)
    result[i] = tab[i].replace(regx, replacer)
  return result
}
//zad1
test(/123/g, "123test123test123")
//zad2
test(/^123/g, "123tes123t")
//zad3
test(/123$/g, "t123est123")
//zad4
test(/((\+|-)?([0-9]+)(\.[0-9]+)?)|((\+|-)?\.?[0-9]+)/g, "sdfa34.234ad34fa.4")
//zad5
test(/(?:\w+\s+)([a-zA-Z_][a-zA-Z0-9_]*)/g,"int zmienna1; A zmienna2; I zmienna3;")
//zad6
test(/\bfor\b|\bif\b|\bwhile\b/g," for(;while(){if(i=0)};)")
//zad7
test(/[0-9]{2}-[0-9]{2}-[0-9]{4}/g,"df 01-01-2017 23-09-1993")
//zad8
replace(/([0-9]{2})\/+([0-9]{2})\/+([0-9]{4})/g,'$2/$1/$3',"sf 12/28/2014 s 10/18/2017")
//zad9
function linki(text){
  return replaceTab(/(href=")(.*:\/\/)?(.*?)(")/g,'$3',test(/(href=")(.*?)(")/g,text))
}
var zad9 = linki('<a href="http://en.cppreference.com/w/">C++ref </a><a href="http://www.boost.org/">Boost</a><a href="http://www.horstmann.com/cpp/pitfalls.html">Pułapki C++</a>"')
console.log(zad9)
