// function multipli(a){
// let namer  
//     return function(b){
// //         return a*b
// const { type } = require("os");
// const { stringify } = require("querystring");
// const { sort } = require("semver");

// const { execFile } = require("child_process")
// const { request } = require("http")

//     }

// }

// let result = multipli(2)
// console.log(result(2))

// for(var i=0; i<10; i++){
//     // console.log(i)
// }

// console.log(i)

// console.log('1' == 1)
// console.log('1' === 1)

// const obj1 ={} 
// const  obj2 = new Object()
// const obj3 = obj1


// console.log(obj1 == obj3)
// console.log(obj1 === obj2)

// const str = '123' 
// const str1 = 'sdffs'


// console.log(str + str1)

// const obj1 = {

// }

// 500 => code is break
// 200 => sucessfull Response 
// 201 => update data sucessfull
// 400 => bad request
// 403 => authentication error;
// 404 => page no

// const arr = [2,5,19,1,0,15,25,7,11]

// const freq ={}
// for(let i=0; i<arr.length; i++){
//     if(freq.hasOwnProperty(arr[i])){
//         freq[arr[i]] += 1
//     }else{
//         freq[arr[i]] =1
//     }
// }
// // console.log(freq)
// let result = []
// for(let keys in freq){
//     console.log(keys)
// }
// function linear(arr, search){

// for(let i=0; i< arr.length;i++){
//     // console.log(arr[i] === search)
//     if(arr[i] === search){
//         return true
//     }

// }
// return false
// }

// console.log(linear([2,5,19,1,0,15,25,7,11], 12))
// arcetecture , indexing , clint server , eventdriven , mid, http & https, process module, env . module 

//node.s=> frame work, 
// http  => 




// // tempplate String
// let name = 'Gagan'
// let age = "21"
// let aboutMe = `i am ${name} and i am ${age} years old`
// console.log(aboutMe);



// forEack
// const hi = [{name: "jg"},{name: "gjfhgf"},{name: "jgjghfjg"},{name: "jgjghfjg"},{name: "jgjghfjg"}]

// hi.forEach(function(hi){
// console.log(hi.name);
// })



//map
// const number = [ 1,2,3,4,5,6,7,8]
// const square = function(Number){
//     return Number*Number
// }
// console.log(number.map(square));
//   or
// const square = number.map(num =>{
//     return num*num
// })
// console.log(square);




//Filter 
// const number = [1,2,3,4,5,6,7,8,9,10]

// const isOdd = function(number){
//     return number%2!= 0
// }
// console.log(number.filter(isOdd));

// const isOdd = number.filter(num => {
//     return num%2 ==0 
// })
// console.log(isOdd);



// reduce
// let number = [1,3,4,2,5]
// const sum = number.reduce((acc,cur) => {
//     return acc+cur
// },100)

// console.log(sum);


// sort
// it mutate orignal array
// const number = [1,12,63,74,5,4566,7,889,9,99999999910]

// console.log(number.sort(function(a,b){
//     return b-a
// }));
// console.log(number);


//find
// const str = ["hi", "gagan" , "i", "love", " you"]

// console.log(str.find((str1) => {
//    return str1.length == 4
// }));


// fill
// let arr = new Array(10).fill(123)
// console.log(arr);

// arr.fill(0,5)
// console.log(arr);
 
                              


//call
// const user1 = {
//     name : "gagan",
//     about : function(){
//         console.log(this.name)
//     }
    
// }
// const user2 = {
//     name : "Arman",
    
// }
// user1.about.call(user2,"trrthrtf")



// let array = [1, [2, 3], 2, [55, 2, 3], [2, 3, [4, 5], 6, 1], 4, 5];

// let result = []

// function flat(arr){
//     for(let i=0; i<arr.length; i++){
       
//         if(Array.isArray(arr[i])){
//             result.concat(flat(arr[i]))
//         }else{
//             result.push(arr[i])
//         }
//     }
// }
// flat(array);
// console.log(result);

// const arr = [8, 12, 44, 34, 55, 11, 22, 66, 65, 33, 4];

// let obj = {}

// for(let i=0; i<arr.length; i++){
//     if(obj.hasOwnProperty(arr[i])){
//        obj[arr[i]]++
//     }else{
//         obj[arr[i]] = 1
//     }
// }

// let sortt = []

// for(let key in obj){
//   let temp = new Array(obj[key]).fill(key)
// sortt = [...sortt, ...temp]
// }

// console.log(sortt);


// // const mongoose = require('mongoose')

// // const blogSchema = new mongoose.Schema({
// //     title : String,


// // })
// //comunication , !e.g, fast, 


//     let a = () => {
//     setTimeout(() => {
//     console.log("internal serval call.");
//     }, "5000");
//     console.log("One");
//     };

//     let b = () => {
//     setTimeout(() => {
//     console.log("Two");
//     }, "1000");
//     console.log("function b called");
//     };

//     console.log("Coding Test");
//     a();
//     b()
    
   
//     for (var i = 0; i < 4; i++) 
//     {
//     // global scope
//     setTimeout(() => console.log(i));
//     }
//     // coding Test"
//     //one
//     // tow
//     //i
//     // function b
//     //interval
    

console.group('group')
console.log('hello');
console.log('world');
console.groupEnd()