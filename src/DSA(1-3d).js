// for(let n=1; n<=sum; n++ ){

// const funct = function(n){

//     if(n>5){
//         for(let n=6; n<10; n++){
//             console.log(n)
//         }

//     }else{
//         for(let n=0; n<6; n++){
//             console.log(n)
//         }

//     }
// }
//     const result = funct(10)
//     console.log(result)
// //
// let a = 'a,b,c'
// console.log(a[--j])



//..............................................maximun occurenence of element in array...... DONE(000000000000000000000)

//we have to find which element repeat(occure) in array most


// const arr = [1,2,3,3,3,4,4,5,5,5,5,5,5,5,5,6,6,6,6,6,6]
// console.log(arr.length)
// let max_occ = 0, max_char_occ = null
// for(let i=0; i<arr.length; i++){

//     curr_occ = 0
//     for(let j=i; j<arr.length ; j++){ //1stly in i loop 1st ele come then j loop try to match each and evey ele of array-
//         if(arr[i] == arr[j]){         // with that ele. if they match then it increase the value of "curr_occ" by one(1) then
//             curr_occ += 1             // in same manner all ele come and if they match it will incease the value of curr_occ 
//         }                              // by 1
//     }
// // curr_occ(currentCharacterCount)
//     if(curr_occ > max_occ){           //if value of curr_occ is greater then max_occ(intialy it was 0) then value of max_occ  
//         max_occ = curr_occ            // will become curr_occ and max_char_occ will be that ele of array and for loop is moving in same manner if anywhere 
//         max_char_occ = arr[i]         // in array value of cur_occ will be grater then max_occ then value of max_occ become 
//     }                                 // curr_occ and max_occ_chr will become that ele of array when loop finished we can
//                                     // conole that value 
// }                                     //********* but in this case time complexicty is ==> o(n(square)) and we got correct ans.
// console.log(max_occ ,'&&', max_char_occ)




// try to decrease time complex city of above problem

// const arr =[1,2,2,3,3,4,4,5,5,6,7,7,7,4,7,7,4,3]

// let max_occ = 0
// let max_occ_char = null
// let freq_count = {}
// for(let i=0; i<arr.length; i++){

//     // curr_char = 0
//     if(freq_count.hasOwnProperty(arr[i])){ 
//         freq_count[arr[i]] +=1
//         if(max_occ < freq_count[arr[i]]){
//             max_occ = freq_count[arr[i]]
//             max_occ_char = arr[i]
//         }

//     }else{
//         freq_count[arr[i]] = 1
//     }

// } //* it has has time complexicity o(n)


// //* 1stly we made a object freq_count(in which we store value of frequency of ele of array) then for loop acess the ele of array 
// // if ele exist in object as a key then increment value of that key(or ele) by 1 && if value of that key is greater then 
// //  the value of max_occ key then value of max_occ will become value of that key 
// // else if key not present then simple add that ele as a key thats value will be 1 then simple console them
// console.log(freq_count)
// console.log(max_occ_char , '&&', max_occ)




// let str = 'g a  g a a g a  g  jnwdkjdnwdnwjw dwdjdnwkdjn wd kwjdbwjekd we xwjhed jw xwjnd kjw xjw xwjn xjwg a a aga '


// const arr = str.split(' ')

// max_occ = 0
// max_char_occ = null
// let obj = {}


// for(let i=0; i<arr.length; i++){

//     if(obj.hasOwnProperty(arr[i])){
//        obj[arr[i]] += 1
//     }else{
//         obj[arr[i]] = 1
//     }

//     if(obj[arr[i]] > max_occ ){
//     max_occ = obj[arr[i]]
//     max_char_occ = arr[i]

// }
// }
// //same as for array
// console.log(max_occ , "&&&&&&&&&&&&&&&&&&&&&&", max_char_occ)


//..................not sort but we convert them array new sort array



// const str = 'g a  g a a g a  g  jnwdkjdnwdnwjw dwdjdnwkdjn wd kwjdbwjekd we xwjhed jw xwjnd kjw xjw xwjn xjwg a a aga '

// const arr = str.split(' ')


// // const arr = [4,5,6,5,-1,4,3]

// let count = {}
// for(let i = 0; i<arr.length; i++){
// if(count[arr[i]]){
//     count[arr[i]] += 1

// }else{
//     count[arr[i]] = 1
// }
// }
// console.log(count)
// let hi = arr.sort()

// console.log(hi)
// let sortt = []
// for(let key in count){
//     // console.log(count[key])
//     const temp = Array.from(new Array(count[key]).fill((key)))
//     sortt = [...sortt, ...temp]
//     // console.log(temp)
// }
// console.log(sortt)



// .................. Sorted array ........../

//// when we store ele(Number) in object it automataic store in sorted way in Ecma 6 it is decision that number store in 
//// sorted way but not alphabats
// const arr = [1,4,4,5,6,7,8,9,9]

// const freq ={}
// let max_occ = 0, max_occ_ele = null
// for(let i=0; i<arr.length; i++){

//     if(freq.hasOwnProperty(arr[i])){
//         freq[arr[i]]++
//     }else{
//         freq[arr[i]] = 1
//     }
// if(max_occ<freq[arr[i]]){
//     max_occ = freq[arr[i]]
//     max_occ_ele = arr[i]
// }

// }
// console.log(freq)
// console.log(max_occ ,'$($', max_occ_ele)
// let sortA = []
// for(let key in freq){
// const arrr = Array.from(new Array(freq[key])).fill(Number(key))
// // sortA = [...sortA,...arrr]
// // console.log((key))L
// // sortA.push(...arrr)
// }
// console.log(sortA)

//..............................sort string ................//

// let str = 'asafdfdfxdgvxcbcbjxnlsnkdjfngjfnzxn jzddn kcdnvnncbjvfkjcjbxbbxkvjxkjnkxjbckxf'

// str = str.split('')

// const arr = str.split('')
// const freq= {}

// for(let i=0; i<str.length; i++){
//     if(freq.hasOwnProperty(arr[i])){
//         freq[arr[i]]++
//     } else{
//         freq[arr[i]] = 1
//     }
// }
                                      //////////////  (((((((((((((((((())))))))))))))))))
// const alpha = 'abcdefghijklmnopqrstuvwxyz'
// let final = ''
// for(let i=0; i<alpha.length; i++ ){
//    while(freq[alpha[i]] > 0){ //// if we using if here it will remove to dublicate elements
//        final += alpha[i]
//        freq[alpha[i]]--
//    }
// }
// console.log(final)



///////////////////////////////////////////////////....................MUTIple POINTER METHOD(we are taking sorted array)....................////////////


//                 find the sum // find that numbers that sum is equal to sum variable 
//const arr = [-6,-2,-3,0,1,2,3,4,5]

// // console.log(arr)
// let sum = 4

// for(let i =0; i<arr.length; i++){  // 
//     for(let j=i; j<arr.length; j++){ 
//         if(arr[i]+arr[j] == sum){
//             console.log([arr[i],arr[j]])
//             break
//         }
//     }
// }



////..............                find that 2 number whose sum equal to given number
// function isNumberPresent(sum) {

// let i=0
// let j= arr.length -1

// while(i<j){
//     if(arr[i] + arr[j] == sum){
//         // return [arr[i] , arr[j]] //in return there is no need to use break when it return 1st resullt it will automatic break
//         // break
//     }
//    else if(arr[i] + arr[j] > sum){
//         j--//j -= 1  
//     }
//     else{
//        i++// i += 1  
//     }    
// console.log(false)
// }
// console.log(false)
// }

// console.log(isNumberPresent(4))

//.........................         find that 2 number whose sum equal to given number
// const arr = [-5,1,2,3,4,5,6,7,8,9]


// let i=0
// let j = arr.length -1
// let sum = 12
// while(i<j){
//     if(arr[i] + arr[j] == sum){
//         console.log(arr[i], arr[j])
//         break
//     } else if(arr[i] + arr[j] > sum){
//         j--
//     }else{
//         i++
//     }
// }


//..................................   find the number that is closest to sum X
// const arr = [1,2,5,8,9,14]

// let i = 0
// let j = arr.length -1 
// let result = []
// let distance = Infinity
// let sum = 18
// console.log(arr[i]);
// while(i < j){
//     if((Math.abs((arr[i] + arr[j])- sum )<  distance)){
//         result = [arr[i] , arr[j]]
//         distance =Math.abs((arr[i] + arr[j]) - sum)
//     } else if((arr[i] + arr[j]) > sum){
//         j--
//     } else{
//         i++
//     }
// }

// console.log(result);


// ////////////                           find the number that is closest to sum X
// const arr = [-6,-2,-3,0,1,2,3,4,5]

// function isClosestNumber(num){
// let distance = [100]
// let i =0
// let j = arr.length -1
// result =[]

// while(i<j){
//     if(Math.abs(arr[i]+arr[j] - num) < distance){
//         distance =  Math.abs((arr[i]+arr[j])- num)
//         result = arr[i],arr[j]
        
//     } else if(arr[i] + arr[j] > num){
//         j--
//     } else{
//         i--
//     }


// }
// // console.log(distance)
// return result
// }

// console.log(isClosestNumber(5))



// ......................sort to string ..............

// let str = 'bbbbvvvvvvvmmmmmmwwwwwwwsjksdjfksfaksfa'

// let obj ={}

// for(let i=0; i<str.length; i++){
//  if(obj[str[i]]){
//      obj[str[i]] += 1
//  }else{
//      obj[str[i]] = 1
//  }
// }
// console.log(obj)




// let alpha = 'abcdefghijklmnopqrstuvwxyz'

// let final = ''
// for(i=0; i<alpha.length; i++){
//     while(obj[alpha[i]] > 0){
//         final += alpha[i]
//         obj[alpha[i]]--
//     }
// }
// console.log(final)


//////////////////////////////////////  


// let arr = [2,7,4]

// arr.sort()

// for(let i=0; i<arr.length -2; i++){
//     if(arr[i] + arr[i + 1] > arr[i +2]){
//         console.log(true)
//     }else{
//         console.log(false)
//     }

// }





// const arr =[1,2,3,4]

// const arrr = arr.splice(1,2,5,4,'dweddw')

// console.log(arr)
  
// result = 1
// function sum(arr){
//     console.log(arr)

//     if(arr.length == 0){
//         console.log(result)
//         return result
//     }
//     let ele = arr.pop()
//     console.log(ele)
//      result = result*ele
//     sum(arr)
// }

// sum([1,2,3,4])


// function smallCalculator(num1 , operator, num2){
   
//     if(isNaN(num1 || num2) == true){
//         return "please Enter Valid Number"
//     }else if(operator == '+' ){
//         return num1 + num2
//     } else if(operator == '-'){
//         return num1 - num2
//     } else if (operator == '*'){
//         return num1*num2
//     } else if(operator == '/'){
//         return num1/num2
//     } else{
//         return 'Please Enter valid number or operator'
//     }
// }
// console.log(smallCalculator('2' ,  '-' , 4 ));






// function seriesOfOdd(number){

//     result = []


// const maxNumber = Math.pow(10, 1000); // 
// for(let i =1; i<= maxNumber; i++ ){
//     result.push(i)
//     if(i == number*2){
//         break
//     }
// }
// return result.filter(num => num %2 != 0)
// }

// console.log(seriesOfOdd(4));


// function seriesOfOdd(number){

//     result = []
//     if(number %2 == 0){
//         number -= 1 
//     }


// const maxNumber = Math.pow(10, 1000); // 
// for(let i =1; i<= maxNumber; i++ ){
//     result.push(i)
//     if(i == number*2){
//         break
//     }
// }
// return result.filter(num => num %2 != 0)
// }

// console.log(seriesOfOdd(2));



// let arr = [1,2,8,9,12,46,76,82,15,20,30]

// let newArr = arr.join('').split('')
// let result = {}

// for(let i=0; i<newArr.length; i++){
//     if(result.hasOwnProperty(newArr[i])){
//         result[newArr[i]] += 1
//     } else{
//         result[newArr[i]] = 1
//     }

// }
// console.log(result);