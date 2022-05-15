
// practice from 4840

// recursion - it is a method of solving computitional problem whaere solution depend on solution as small instance in code
//. it solve problem by using function that call themselve in their own code
// DON't use inbuilt function


// iteration - means ik ik element aay gaa toh we arr iteration array with foor loop


//** chances of mistake in recursion
// * miss base case
// * forget to return base case
// * return wrong thing

//............................................ find even number in array ................./...........................//

// const arr = [3,4,5,6,6,,7,8]

// iteration 


// for(let i=0; i<arr.length; i++){
//     if(arr[i] % 2 == 0){
//         console.log('Yes')
//     } else{
//         console.log('NO')
//     }
// }


// RECURSION =>      same que with reqursion
//**not able to use BREAK becouse it is use in loop */
// function evenNum(arr){
//     if(arr.length ==0){
//         return   
//     }

//     let ele = arr.pop()
//     if(ele % 2 ==0){
//         console.log('Yes')
//     } else{
//         console.log('No')
//     }
//     evenNum(arr)
// }

// const result = evenNum([3,4,5,6,6,7,8])
// console.log(result)



//....................return sum of n number ............................................................////////////

//iteration
// let n = 10

// let result = 0
// while(n>0){
//     result += n
//     n--
// }
// console.log(result)


//with  RECURTION
// function sum(n){
//     if(n==1){
//         return 1
//     }
//     return n +sum(n-1)
// }

// console.log(sum(5))


//............... ....................FINDIND FACTORIAl..............................................................//
//4576

// iteration
// n=4
// result = 1
// for(let i=n; i>0; i--){
//     result =result * i

// }
// console.log(result)


// recursion

// function fact(n){
//     if(n==1){
//         return 1
//     }

//     return n* fact(n-1)
// }
// console.log(fact(1))


//................................. fabonacci ....................................................//
// fabonacci = every number is a sum of previous 2 elements like
// we will provide inedex(n as a input) or(N AS A INPUT THEN U HAVE TO CHANGE BASE CASE AS (NUM<=2)) 
// u have to find the nth element in fabonacci
// e.g - fabonacci series -// 1,1,2,3,5,8,13,21,........
        //  n as a input  - //1,2,3,4,5, 6,7, 8,.......
        //  index         -// 0,1,2,3,4,5, 6, 7,.......

//  n = (n-1) + (n-2)  //(how answer look like)


// function fabonacci(num){
//     if(num <= 1){
//         return 1
//     }

//     return fabonacci(num-1) + fabonacci(num-2)
// }

// console.log(fabonacci(7))

///// working of it as a commen
// base case when fab(n) == n <=1
// if(n<=1) return 1

// fabonacci(6) == fabonacci(n-1) + fabonacci(n-2)
//              == fabonacci(5) + fabonacci(4) // fab(5) == fab(4) + fab(3),   fab(4) == fab(3) + fab(2)
//              and they divided furture again and again in the end when they reach till base case 
//               they give answere as a they sum from all as they divided same in all case of recursion


//............................. PRODUCT OF ARRAY ............................................................////

// WORKING or flow in recuesion product is defining as a name of function
// [1,2,3,4] = 1* product([2,3,4])
//           = 1* 2 product([3,4])
//           = 1* *2 * 3 product([4])
//           = 1* 2 * 3 * 4 product([])
//           = 1* 2 * 3* 4 * 1(//we will set in base case when length of array is zero then return 1)
// const arr = [1,2,3,4] // = 24


//***************** it is acc. to me and i want return in function  */
// var result = 1

// function product(arr){
//     if(arr.length == 0){
//         return 1
//     }
//     let ele = arr.pop()
//      result = result * ele

//      product(arr)


//     }
//   product([1,2,3,4])
//   console.log(result)

//// with pop we are taking answer in return 
// function product(arr){
//     if(arr.length == 1){
//         return arr[0]
//     }
//     let ele = arr.pop()
//     return ele* product(arr)
// } 
// console.log(product([1,2,3,4]))

// /////////////////////............................(priority to this)alternative way of product of arr........../

// function product(arr){
//     if(arr.length == 0){
//         return 1
//     }
//     return arr[0] * product(arr.slice(1)) // u can use slice and splice give same answer

// }

// const result = product([1,2,3,4])
// console.log(result)

//////////////////////////////////..................................alternative product array .......//

// function product(arr, index){

//     if(index == 0){
//         return arr[0]
//     }

//     return arr[index -1]* product(arr, index-1)
// }

// console.log(product([1,2,3,4], 4))

//.............................. power function ........................//
// we will pass number and exponent in function as a(num, exp) in result we want num(power(exp)) like (2(pwer(3))) == 8 in ans

// function power(num, exp){
//     // simple u can return num**exp
//     if(exp == 1){
//         return num
//     }
//     return num *power(num, exp-1)
// }
// console.log(power(2,10))


////////..........................................REVERSE to string ...............................................//
//Array - in case of array it return sum of array

// function REVERSE(str){
// if(str.length <= 1){
//     return str
// }

// return REVERSE(str.slice(1)) + str[0]
// }

// console.log(REVERSE('hi there'))

//////..............................     palindrome ........................................////////////////////////////
////plaindrome = reading to word and number from from front and back is same e.g- level, 12321 
//// find the number or string is plaindrome 

// function plaindrome(str){
//     if(str.length == 1){
//         return str[0]
//     }
//     return plaindrome(str.slice(1)) + str[0]
// }


// function result(res){
//     return plaindrome(res) == res
// }
// console.log(result('abcbaa'))

////////////////////////..................(mainly we use) alternative ...................../////////////////////////

// function plaindrome(str){
//     if(str.length <= 1){
//         return true
//     }

//     return str[0] == str.slice(-1) && plaindrome(str.slice(1, -1))
           // slice(-1) is define last one ele from last
// }

// console.log(plaindrome('13431'))

////////////////......................... alternative ................///////////////////////

// function plaindrome(str, left, right){
//     if(left < right){
//         if(str[left] === str[right]){
//             return plaindrome(str, left +1, right-1)
//         }else{
//             return false
//         }
//     }
//     return true

// }

// console.log(plaindrome('12321',0, 4))



///////////////............................. flatern array ........................./////////////////////////////
////// == [1,2 ,[3,4],[[[5,6]]]] => [1.2,3,4,5,6]

////.. flatrnArr => it will check each element one by one.if not array then it will concat the element in the new "arr"
////else if the element in itself is an array => then it will try to flatern that

// function flatern(arr){  ///// first arr auto emit 
//     let flat = []
//     for(let i=0; i<arr.length; i++){
//         console.log(arr[i])
//         if(Array.isArray(arr[i]) == false){
//             flat.push(arr[i])
//         }else{
//             flat = flat.concat(flatern(arr[i]))
//         }
//     }
//         return flat
    
// }
// console.log(flatern([1,2,[[3,4,4]]]))


////////////////........................... CapitaliseLetters(first letter only) ......................./////////

////// ('hi', 'there') => ('Hi', 'There')
// in it we have to provide a array


// function CapitaliseLetters(str){
//     let result =[]
//     if(str.length == 0){
//         return []
//     }
    
//     let s= str[0][0].toUpperCase() + str[0].slice(1)
//     result.push(s)

//     return  result.concat(CapitaliseLetters(str.slice(1)))
// }
// console.log(CapitaliseLetters(['acddc', 'there']))

//////////////.............................. reverse each word of string .................../////////////////
// ('123', 'abc', 'zas') => ('321', 'cba', 'saz')

// function reverse(str){
//     if(str.length == 0) return ""

//     return reverse(str.slice(1)) + str[0]
// }

// function reveseWord(ans){
// let split = ans.split(' ')
// for(let i=0; i<split.length; i++){
//     split[i] = reverse(split[i])

// }
// return split.join(' ')
// }
// console.log(reveseWord('123 456'))

/////////////////.................................Print dublicate ele in arr..................///////////////////
//// [1,2,2,3,4,5,5] => [2,5]

// const arr = [1,2,3,4,4,5,5,9]


// let freq ={}
// for (let i=0 ; i<arr.length; i++){
//     if(freq.hasOwnProperty(arr[i])){
//         freq[arr[i]] += 1
//     } else{
//         freq[arr[i]] = 1
//     }
// }
// for (let value in freq){
//   if(freq[value] > 1){
//       console.log(value)
//   }
// }

///////////////////////////....................... with map ................../////////////////////
// const arr = [1,2,3,4,4,5,5,6,7,7]

// function dublicate(arr){
//         let map= new Map()
//         for(let i=0; i<arr.length; i++){
//                 if(map.get(arr[i])){
//                         map.set(arr[i], map.get(arr[i])+1)
//                 }else{
//                         map.set(arr[i],1)
//                 }
//         }
//         let result =[]
//         for(let value of map){

//                 if(value[1] >1){
//                         result.push(value[0])
//                 }
//         }
//         return result
// }

// const result =dublicate([1,2,3,4,4,5,5,6,7,7])
// console.log(result)










































// const arr =[1,2,3,4,4,5]
// let a = 6
// let result = 0
// function sum (arr){
//     if(arr.length == 0) return []
//     let ele = arr.pop()
//     result += ele
//     sum(arr)

// }
// sum([1,2,3,4])
// console.log(result)



// find unique ele in array

// const arr =[1,2,3,4,4,5]

// let freq = {}
// for(let i=0; i<arr.length; i++){
//     if(freq.hasOwnProperty(arr[i]) ){
// freq[arr[i]] += 1
//     }else{
//         freq[arr[i]] =1
//     }
// }
// console.log(freq[])


// find pairs of ele thats sum is equal to target k
// const arr = [9,4,7,98,3,7.8,9,9,6,0]

// i=0
// j = arr.length-1

// while(i<j){
//     if(arr[i] + arr[j] == 18){
//         console.log([arr[i],arr[j]])
//     } else if (arr[i] + arr[j] > j){
//         j--
//     }else{
//         i++
//     }
// }











