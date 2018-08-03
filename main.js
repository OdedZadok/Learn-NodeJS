

function a() {
  function b() {
    console.log(myVar);
  }

  var myVar = 2;
  console.log(myVar);
  b();
}

var myVar =1;
a();

console.log(Object.keys(trr));

var a = 1;

function printA() {
  var b = 1;
  function printB() {
    var c=2;
    function printC() {
      var d=3;
      console.log(a+b+c+d);
    }
    
    printC();
  }
  
  printB();
}

printA(); // this creates a scope which gets discarded right after

console.log('end');
return;


let val = 7;
function createAdder() {
    
    function addNumbers(a, b) {
      val =10;
     let ret = a + b;
     return ret;
   }
   return addNumbers;
 }
 let adder = createAdder();
 let sum = adder(val, 8);
 console.log('example of function returning a function: ', sum);
return;



const extModule = require('./Playground/ext-module');
const useLodash = require('./Playground/use-lodash');
const mongoDBClient = require('./Playground/mongoDB-client');

console.log('Start Node.JS');
console.log('Ext Module function use ', extModule.addNumbers(1,2));

console.log('use Lodash library ', useLodash.concatArrays());



const arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function(t) {
    console.log('Index: ' + t + ', element:  + arr[t]');
  }(i), 1);
}



// mongoDBClient.openConnection();
// mongoDBClient.closeConnection();


