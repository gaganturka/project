// for(let n=1; n<=sum; n++ ){

// const funct = function(n){

//     if(n>5){
//         // for(let n=6; n<10; n++){
//             console.log(n)
//         // }

//     }else{
//         // for(let n=0; n<6; n++){
//             console.log(n)
//         }

//     }

//     const result = funct(10)
//     console.log(result)
// //
// let a = 'a,b,c'
// console.log(a[--j])

// const arr = [1,2,3,3,3,4,4,5,5,5,6,6,6,6,6,6]
// let max_count = 0
// console.log(arr.length)
let max_occ = 0, max_char_occ = null
// for(let i=0; i<arr.length; i++){

//     curr_occ = 0
//     for(let j=i; j<arr.length ; j++){
//         if(arr[i] == arr[j]){
//             curr_occ += 1

//         } 
//     }
//     if(curr_occ > max_occ){
//         max_occ = curr_occ
//         max_char_occ = arr[i]
//     }

// }


// const str = 'g a  g a a g a  g  jnwdkjdnwdnwjw dwdjdnwkdjn wd kwjdbwjekd we xwjhed jw xwjnd kjw xjw xwjn xjwg a a aga '

// const arr = str.split(' ')


// let obj = {}


// for(let i=0; i<arr.length; i++){

//     if(obj.hasOwnProperty(arr[i])){
//        obj[arr[i]] += 1
//     }else{
//         obj[arr[i]] = 1

//     }
//     if(obj[arr[i]] > max_occ ){
//     max_occ = obj[arr[i]]
//     console.log(arr[i])
//     max_char_occ = arr[i]

// }
// }
// console.log(obj)

// console.log(max_occ , "&&&&&&&&&&&&&&&&&&&&&&", max_char_occ)

// const str = 'g a  g a a g a  g  jnwdkjdnwdnwjw dwdjdnwkdjn wd kwjdbwjekd we xwjhed jw xwjnd kjw xjw xwjn xjwg a a aga '

// const arr = str.split(' ')


// const arr = [5,3,4,3,5,5,5,2,5,5,5,5]

// let count = {}
// for(let i = 0; i<arr.length; i++){
// if(count[arr[i]]){
//     count[arr[i]] += 1

// }else{
//     count[arr[i]] = 1
// }
// }

// console.log(count)
// let sortt = []
// for(let key in count){
//     // console.log(count[key])
//     const temp = Array.from(new Array(count[key]).fill((key)))
//     sortt = [...sortt, ...temp]
//     console.log(temp)
// }
// console.log(sortt)







///////////////////////////////////////////////////....................MUTIple POINTER METHOD....................////////////





//                 find the sum
const arr = [-6,-2,-3,0,1,2,3,4,5]
// // console.log(arr)
// let sum = 4

// for(let i =0; i<arr.length; i++){
//     for(let j=i; j<arr.length; j++){
//         if(arr[i]+arr[j] == sum){
//             console.log([arr[i],arr[j]])
//             break
//         }
//     }
// }
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









// ////////////                           find the number that is closest to sum X
// const arr = [-6,-2,-3,0,1,2,3,4,5]

// function isClosestNumber(num){
// let distance = [100]
// let i =0
// let j = arr.length -1
// result =[]

// while(i<j){
//     if(Math.abs(arr[i]+arr[j] - 12) < distance){
//         distance =  Math.abs((arr[i]+arr[j])- 12)
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



// sort to alphabets

// let str = 'bbbbvvvvvvvmmmmmmwwwwwwwsjksdjfksfksf'

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
