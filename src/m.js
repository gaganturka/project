// const { METHODS } = require("http")

const { rejects } = require("assert");
const { create } = require("yallist");

// let str = '[[[()]]]' 
// let left = 0
// let right = str.length


// mid = (left+right)/2-1

// console.log(str[mid])

// function reverseStr(str){
//     if(str.length == 0){

//     }
// }

// function checkValidString(str){
//     if(str.length%2 != 0){
//         return 'Invalid string'
//     }

//     left <= mid
//     right = right-mid-1

//     let firstHalf = ''
//     let secondHalf = ''

//     for(let i=0 ; i<=mid; i++){
//         firstHalf += str[i]
//     }
//     console.log(firstHalf);


//     for(let j=right ; j<str.length; j++){
//         secondHalf += str[j]
//     }

// }

// checkValidString(str)

// // basics ,logicbuilding,  

// // mongodb METHODS
// // node.js packages
// console.log(2+'3')
// stack
// closures
// let a = 'anx'
// console.log(`'${a}'`);

////////////////////////// call back function

/**Callbacks

Callback is a function that is passed as an argument to another function and its execution is delayed until 
that function in which it is passed is executed.Meaning, if I pass a function, let’s say function1 to another function, 
i.e., function2,then function1 will not be executed until function2 is executed.Callbacks are a fundamental part 
of Functional Programming, and you may be already using them without knowing; methods like .map(), .filter(), 
and.reduce() all make use of callback functions.  */
// function add (a,b){
//     return a+b
// }

// function complex(hi){
//     console.log(hi(200,300));
//     console.log('hi');

// }
// complex(add)

////here add is a call back function

////////////////////////////////////////////////////// Promise///////////////////////

// let a = undefined //// is a data type

// setTimeout(() => {
//     a = 'hello sir'

// }, 1000)

// console.log(a);
/**  but here we exepting our ans will be 'hello sir' now think same thing about api in api we think
 data will console but not any out put come so thats why promises introduce*/

//  let a = undefined
//  const promiseDa = new promise((resolve,reject)=>{
//     setTimeout(() => {
//         a = 'hello sir'
//         resolve('done')
    
//     }, 1000)
//  })

//  promiseDa.then(()=>{
//     console.log(a);
//  })

/////////////////     closure

/**A closure is the combination of a function bundled together (enclosed) with references to its surrounding
 *  state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from 
 * an inner function. In JavaScript, closures are created every time a function is created, at function creation time. */

