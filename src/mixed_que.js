////########## concat - concat is used for joining multiple array into single array and return new array
// it return new array not modify existing array (for that we assingn value in it)
// let arr = [1,3,4]
// console.log(arr.flat([1,4,2,5]))

const { kill } = require("process")
const { version } = require("punycode")

///////////................... flat the array................................//////////////////////
// flat the array [1,2,[[[3,4,5,6]]],[7,8]]
//     [1,2,3,4,5,6,7,8]

// function flat(arr){ ////function(flat) remove to one array
//     let result = []
//     for(let i=0; i<arr.length; i++){
//         if(Array.isArray(arr[i])){
//             result = result.concat(flat(arr[i]))
//         }else{
//             result.push(arr[i])  
//         }
//     }
//      return result
// }
// // const result =flat([1,2[3[4,5,5,5,5,5]],5[5,6,7,8],9,0])
// console.log(flat([1,3,2,[3,[4,5,5,5,5,5]],5,[5,6,7,8],9,0]))




// /////////////...................return sum of all even numbers from object .............////////////////////////

// function evenSum(obj){
//     let sum =0 
//     for(let key in obj){
//         if(obj[key] != null && typeof obj[key] == 'object'){
//             sum += evenSum(obj[key])
//         } else if(typeof obj[key] == 'number'){
//             if(obj[key] %2 == 0){
//                 sum += obj[key]
//             }
//         }
//     }
//     return sum
// }

// console.log(evenSum(obj))

;

////////////////////////////......................reverse array without using extra array...............///////////////////
//        OR|
//// swap 2 number without using 3 rd number

// let a=2, b=3
// a= a+b //5
// b=a-b //2
// a= a-b //3
// console.log(a,b)



// function reverseArrat(){
//     const arr = [1,2,3,4,5,6]
//     let left=0, right= arr.length-1
//     while(left<right){
//         //swap 2 element
//         [arr[left],arr[right]] = [arr[right], arr[left]]
//         left++
//         right--
//     }
//     console.log(arr)
// }
// reverseArrat()

////           reverse array without using extra array

// function reverse(arr){
//     let i=0
//     let j= arr.length-1

//     while(i<j){
//         arr[i] = arr[i] + arr[j]
//         arr[j] = arr[i] - arr [j]
//         arr[i] = arr[i] - arr[j]
//         i++
//         j--
//     }
//     return arr
// }

// const result = reverse([1,2,3,4,5,6])
// console.log(result)



///////////////////////...       filter Out dublicate ele. return unique element in array ............////////////

// function unique(arr){
//     let map = new Map()

//     for(let i=0; i< arr.length; i++){
//         if(map.get(arr[i])){
//             map.set(arr[i],map.get(arr[i])+1)
//         }else{
//             map.set(arr[i],1)
//         }
//     }
// let result = []
// for(let key of map){
//     if(key[1] ==1){
//         result.push(key[0])
//     }
// }
// return result
// }

// let result = unique([1,2,4,5,5,6])
// console.log(result)

////////////                  maximun occurr element in array and its freq                   ..................

// function unique(arr){
//     let max_freq =0
//     let max_occ_ele = arr[0]
//     let map = new Map()

//     for(let i=0; i< arr.length; i++){
//         if(map.get(arr[i])){
//             map.set(arr[i],map.get(arr[i])+1)
//             if(map.get(arr[i])> max_freq){
//                 max_freq =map.get(arr[i])
//                 max_occ_ele = arr[i]
//             }
//         }else{
//             map.set(arr[i],1)
//         }
//     }
//     console.log(max_freq,max_occ_ele )
// }
// unique([1,2,3,4,4,4,4,4,5,5,5,5,5,5,5,5,])



///////////////////////////...................... 5387 remain



///////////////////////////........................... check given input is integer or not............///
//// integer = a whole value may be negative(-) should not be in decimal or fraction\
// e.g(1,-1,'1,234',0 )



// function integer(num) {////////// negative number also be a integer so we check to them in if
//     const match = '1,2,3,4,5,6,7,8,9,0'
//     if (num[0] == '-') {
//         for (let i = 1; i < num.length; i++) {
//             if (match.indexOf(num[i]) == -1) {
//                 return 'No'
//             }
//         }
//         return 'Yes'
//     } else {
//         for (let i = 0; i < num.length; i++) {
//             if (match.indexOf(num[i]) == -1) {
//                 return 'No'
//             }
//         }
//         return 'Yes'
//     }
// }


////approach 2 => use regex => /^-?[0-9]+$/
// ? define that - may or may not be present



///////////////////.............................. find largest 2 element in array ...../////

// function largestEle(){
//     const arr =[1,2,3,4,5,687,89,898,87,98979]
//     let firstMax = arr[0]
//     let secondMax = - Infinity
//     for(let i=0; i<arr.length; i++){
//         if(arr[i]>=firstMax){
//             secondMax = firstMax
//             firstMax = arr[i]
//         }else if(arr[i]> secondMax){
//             secondMax = arr[i]
//         }
//     }
//     return [firstMax,secondMax]
// }
// const result = largestEle()
// console.log(result)

// it give largest 2 number and if u want sum of largest number in array then write
// in return [firstMax+secondMax]

////////////..................... Rotate array by K elements ...............////////////


// function rotateArrayByKEle(arr,K){

// let temp = (new Array(arr.length).fill(0))
// for(let i=0; i<arr.length; i++){
//     let ele = (i+K)%arr.length    // taking a reminder as when value of i+k will greater then arr.length then ele
//     temp[ele] = arr[i]             // value become reminder of (i+K)%arr.length  
// }
// return temp
// }
// let result =rotateArrayByKEle([1,2,3,4,5,6,7],3)
// console.log(result)




/// Or rotating array in parts or we can say 'optimalKRotations'.


// function reverse(arr,left,rigth){
//     while(left<rigth){
//         [arr[left],arr[rigth]] = [arr[rigth],arr[left]]
//         left++
//         rigth--
//     }
// }

// function Rotate(arr,k){
//     reverse(arr,0,arr.length-1)
//     reverse(arr,0,k-1)
//     reverse(arr,k,arr.length-1)
// }

// let arr = [1,2,3,4,5,6,7]
// Rotate(arr,3)
// console.log(arr)



/////////////////................... Swap 2 strings.....REMAINING.......///////////

/////swap to number
// a=15, b=10
// a= a+b//// 15 + 10 =25
// b= a-b /// 25 - 10 = 15
// a= a-b ///  25 -15 = 10
// console.log(a,b);


//////////Swap to string


// let a ='somekj', b='Good1234'
// /// join string with concat
// // remove strings with slice /
// len = a.length

// a = a.concat(b)
// b = a.slice(0,len)
// a = a.slice(len)
// console.log(a,b)

