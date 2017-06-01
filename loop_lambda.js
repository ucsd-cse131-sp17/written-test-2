function make_functions() {
  var functions = [];
  var i = 0;
  while(i < 10) {
    functions.push(function(x) { return x + i; });
    i += 1;
  }
  return functions;
}

var functions = make_functions();
var answers = [];
for(var j = 0; j < functions.length; j += 1) {
  answers.push(functions[j](100));
}

console.log(answers);
