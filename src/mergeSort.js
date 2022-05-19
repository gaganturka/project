// merge sort = it divide an array into 2 parts till n/2 then sort array(sort ele.) acc. to comparison of 2 elem. 
// then start joining it give sorted array
// in merge sort divide and conquer technique is used in which we divide problem into sub problem and solve the sub problem
// and conquer problem (combine their answer)
// in merge sort time complexcity is o(nlogn) it is much better then bubble sort so we prefer to merge sort
// it is used in sort data at huge level like million of data we have to sort .

// const { count } = require("console")

// function mergeSort(arr, left, right){
//     if(left>= right){
//         return
//     }

//     const mid = parseInt((left+right)/2)

//     mergeSort(arr, left,mid)
//     mergeSort(arr, mid+1,right)
//     merge(arr,left,mid,right)
// }

// function merge(arr,left,mid,right){

//     let n1 = mid-left+1
//     let n2 = right-mid

//     const arr1 = new Array(n1)
//     const arr2 = new Array(n2)
//     for(let i=0; i<n1; i++){
//         arr1[i] =arr[left+i]
//     }

//     for(let j=0; j<n2; j++){
//         arr2[j] = arr[mid+j+1]
//     }

//     let a=0, b=0 // index of arr1 and arr2
//     var k = left
//     while(a<n1 && b < n2){
//         if(arr1[a] <= arr2[b]){
//             arr[k] = arr1[a]
//             a++
//         } else{
//             arr[k] = arr2[b]
//             b ++
//         }
//         k++
//     }

//     while(a<n1){
//         arr[k] = arr1[a]
//         k++
//         a++
//     }

//     while(b<n2){
//         arr[k] = arr2[b]
//         k++
//         b++
//     }

// }


// const arr = [8,95,86,8,0,8,5,4,7,9]
// let left= 0, right = arr.length-1
// mergeSort(arr, left, right)
// console.log(arr)



//////////////// most second frequent element but remain
// let str = 'aabbccc'

// function freq(str){
//     let  map = new Map()
//     let m_fe = 0
//     let m_ff = str[0]
//     let m_fs = -Infinity
//     for(let i=0; i<str.length; i++){
//         if(map.get(str[i])){
//             map.set(str[i] , map.get(str[i])+1)
//             // console.log(map.get(str[i]))
//             if(m_fe<map.get(str[i])){
//                 m_fs = m_ff
//                 m_ff = str[i]
//                 m_fe = map.get(str[i])
//             } else if(map.get(str[i])>m_fs){
//                 m_fs = str[i]
//             }
//         } else{
//             map.set(str[i],1)
//         }
//     }
//     console.log(m_ff)
//     console.log(m_fs)
// console.log(map)
// }
// freq(str)



//////////////////////////   prime number ....................../////////////////

// check wheater a number is prime or not
// prime number is number that divided by 1 and itself like (2,3,5,7,....)

// function isPrime(number){
//     for(i=2; i<=parseInt(number/2); i++){
//         if(number%i === 0){
//             return false
//         }
//     }
//     return true
// }

// console.log(isPrime(2))
// console.log(isPrime(3))
// console.log(isPrime(4))
// console.log(isPrime(5))
// console.log(isPrime(6))
// console.log(isPrime(7))


// we can take a square root of number we can check i from 2 to square root of that number. if in this range a 
// number is divisible(number % i == 0)(i=2; i<=Math.sqrt(number)) then it is not prime else it is a prime mo.
// there is no need to check further or extend range

// function isPrime(number){
//     for(let i=2; i<=parseInt(Math.sqrt(number)); i++){
//         console.log(parseInt(Math.sqrt(number)))
//         if(number%i===0){
//             return false
//         }
//     }
//     return true
// }

// isPrime(2)
// isPrime(3)
// isPrime(4)
// isPrime(5)
// isPrime(6)
// isPrime(7)

// console.log(isPrime(2))
// console.log(isPrime(3))
// console.log(isPrime(4))
// console.log(isPrime(5))
// console.log(isPrime(6))
// console.log(isPrime(7))

// function primeNo1000(){      ************* not able to understand what it is printing ?
//    let count= 0
//    let number = 2
//    while(count < 1000){
//        if(isPrime(number) ){
//         count++
//            console.log(`${count} is prime number ${number}`)
//        }
//        number++
//    }
// }

// primeNo1000()

///////////////// ****************** find second largest value in array ******************/////////

// function second(arr){
//     let first = arr[0]
//     let second = -Infinity
//     for(let i=0; i<arr.length; i++){
//         if(arr[i] > first){
//             second = first
//             first = arr[i]
//         } else if(arr[i] > second){
//             second = arr[i]
//         }
//     }
//     return second
// }

// console.log(second([1,2,3,4,4,5,6,7,9,8]))



// const arr = [1, 5, 7, -1, 5] //2
// let sum =6
// let count = 0
// for (let i=0; i< arr.length; i++){

//     for(let j=i+1; j<arr.length; j++){
//         if(arr[i] + arr[j] == sum){
//             count++
//         }
//     }
// }
// console.log(count)

// const arr = [ 1, 2, 3, 4, 6, 9, 10] // sum = 13

// let map = new Map()
// for(let i=0; i<arr.length; i++){
//     if(map.get(arr[i])){
//         map.set(arr[i], map.get(arr[i])+1)
//     } else{
//         map.set(arr[i],1)
//     }
// }
// let sum = 0
// for(let key of map){
//     let sqrt = Math.sqrt(key[0])
//     if(Math.floor(sqrt) != Math.ceil(sqrt) ){
//         continue
//     }
//     if(sqrt == 1){
//         continue
//     }
//     console.log(sqrt)
//     if(map.get(sqrt)){
//         sum += (sqrt * sqrt)
//     }
// }
// console.log(sum)

// var sum = function(a){
//   console.log("I am number" + " " + a);
//     var c = 30;
// return function(b){
//   console.log(a,b,c)
// return a+b+c;
// }
// }
// var store = sum(30);
// console.log(store(10));co

// var sum = function(a){
//   var c= 10
//   return function(b){
//     return a+b+c
//   }
// }



var av = function(){
  alert('as')
}
av()

// var summ = sum(10)
// console.log(summ(20))
