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

// function primeNo1000(){      
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


///////////////............        WE have given array as input o and 1. we need to sort array......///
///////// amazon

//// first we have to sort only 2 number then we made 2 variable and intialise a for loop hen taking no. of zero only
//// after zero cont we are taking count of one and define one more variable and incrementing the value of that 
//// as a index means firstly first while loop run after finishing it 2nd loop start so first loop add simple 
//// zero in arr and second loop simple adding one in it. but here we are making 2 loop

// function sort(arr) {
//   let count0 = 0, curr = 0
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] == 0) {
//       count0++
//     }
//   }
//   let count1 = arr.length - count0
//   while(count0 >0){
//     arr[curr] = 0
//     count0--
//     curr++
//   }
//   while(count1 >0){
//     arr[curr] =1
//     count1--
//     curr++
//   }
//   return arr
// }

// console.log(sort([1,1,1,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]))


////////////.                sorting same arr as above it is define trying to complete in 1 loop  //////////////

// now what we are doing we know in sorted arrat on left side is 0 and on right side is 1. so i is definig left and j
//  is definig as right so if in arr on left side is zero then it is on correct position so we simple increase increase 
// index of i. but when 1 will come then we storing that index in i and same for j or right but in case of j value alternate
//or 1 change with 0 and whebn booht loop break we simple swap value .


// function sort(arr){
//   let i=0, j=arr.length-1

//   while(i<j){

//     while(arr[i] == 0 && i<j){
//       i++
//     }

//     while(arr[j] == 1 && i<j){
//       j--
//     }

//     if(i<j){
//     [arr[i],arr[j]] =[arr[j], arr[i]]
//     }
//   }

//   return arr
// }

// console.log(sort([1,1,1,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]))


/////  in arr we have to find the ele. without pair like[1,1,2,2,3,3,4,5] here 4 and 5 are element without pair../////


//// we are making simple map for storing frequency of element then we iterating for of loop on it then we taking
//// reimder if reminder == 1 means single element exist in our arr so we consoling then we can not doirectly return
//// ans. becouse in this case it simple return it not check to all value if u want to return then u can push no 
//// in arrr and in end simple return
// function uniqueElement(arr){
//   let map = new Map()
//   for(let i=0; i<arr.length; i++){
//     if(map.get(arr[i])){
//       map.set(arr[i], map.get(arr[i])+1)
//     }else{
//       map.set(arr[i],1)
//     }
//   }
//   // return map
//   for(let key of map){
//     if(key[1]%2 ==1){
//       console.log(`this element is unique in arr ${key[0]}`)
//     }
//   }
// }
// (uniqueElement([1,1,2,3,4,45,35,5,5]))

////////              write a function to calculate sum of three consecutive number  .....///////////////////////
//// we have to find sum of 3 consecutive no. in arr we are simple taking three cosecutive no.( arr[i]+arr[i+1] + arr[i+2])
//// if sum of no. is greater then the value of variable (sum) then we updating value of that variable and intializing
//// for loop till <arr.length-3 and in and simple return sum

// function sumOf3ConsecutiveNo(arr){
//   if(arr.length <3){
//     return;
//   }
//   let sum = -Infinity
//   for(let i=0; i<arr.length-3;i++){
//     if((arr[i]+arr[i+1] + arr[i+2])> sum){
//       sum = arr[i]+arr[i+1] + arr[i+2]
//     }

//   }
//   return sum
// }

// console.log(sumOf3ConsecutiveNo([1,3,6,9,100,1,1]))


/////////..........    write a function to calcute max. sum of k consecutive number ....///////////////////////////
/// *****************Time complexcity is n(square) 

// ////???????????????SOLVED?????????????????????????????/ sum why not updating means how zero come every time 


// function sumOfkConsecutiveNo(arr,k){
//   if(arr.length<k){
//     return
//   }
//   let curMax = -Infinity

//   for(let i=0; i<=arr.length-k;i++){
//     let sum =0
//      /////////////// ????????????????????????????????????????????????????????????????????????

//     for(let j=i; j<k+i; j++){
//      sum += arr[j]
//     }
//     if(curMax < sum){
//         curMax = sum
//     }
//   }
//   console.log(curMax)
// }

// sumOfkConsecutiveNo([1,2,3,4,5,6,1],2)


///////////                same que. with order n 
//// we fistly add sum of k consecutive no. in total sum with for lop till(i<k). then we itterating reaming loop 
//// from (i =k) we made other variable leftWindowSize in it we are also adding or sum elements of arr but ele(arr-k) and with 
//// that we incrementing totalSum and subtracting to leftWindowSize from totalSum in netSumOf Window variable 
//// if value of that variable will be greater then currSum  then updating the value of currSum
// function sumOfkConsecutive(arr, k){

//     let totalSum = 0, leftWindowSize = 0 , currMax = -Infinity
//     for(let i=0; i<k; i++){
//         totalSum += arr[i]
//     }

//     for(let i=k; i<arr.length; i++){
//         leftWindowSize += arr[i-k]
//         totalSum += arr[i]
//         netSumOfWindow = totalSum - leftWindowSize
//         if(currMax < netSumOfWindow){
//             currMax = netSumOfWindow
//         }
//     }
//     return currMax
// }

// console.log(sumOfkConsecutive([1,2,3,4,5,6,1],2))

// 6010

























































































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



// var av = function(){
//   alert('as')
// }
// av()

// var summ = sum(10)
// console.log(summ(20))
