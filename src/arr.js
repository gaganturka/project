// let maxValue = Math.max(532,6)
// Math.max update value of maxValue with gratest value from Math.max(a,b)

/** we have given a arr as a 2D array or Matrix arr in which a given a details of peson and of banks we have to richest
 *  person detail of money acc. to row bank acc. to column 
 */


// function totalBalance(person){
//     let totalBalance = 0
//     for(let balance of person){
//         totalBalance += balance
//     }
//     return totalBalance
// }

// function richestPerson(details){
//    let maxAmount = 0
//    for(let custmor of details){
//        maxAmount = Math.max(totalBalance(custmor),maxAmount)
//    }
//    return maxAmount
// }

// console.log(richestPerson([[1,2,3],[2,3,4],[4,5,6]]))


// .                given a arr of animals. the animal can be repeated give a data of repeated animals .///////////////

// function repeatedAnimals(str){
//     let animalFreq={}
//    /////////// we are using for of loop because we need not a index we want value
//     for(let animal of str){
//         if(animalFreq[animal]){
//             animalFreq[animal] += 1
//         } else{
//             animalFreq[animal] = 1
//         }
//     }
//     return animalFreq
// }

// console.log(repeatedAnimals(['cat', 'cat', 'dog', 'goat', 'lion', 'lion']))


/////////.     convert array of number to array of alphabats e.g 1: a in 2: ab and [2,3] = [ab, abc]
/***in this ques we have to give a alphabts insted of no. .so firstly we made a function that will return alphabts
 * and then making another function in which we passing a arr and updateing its value with alphabts
 */

// function generateString(number){
//     let alphabets = "abcdefghijklmnopqrstuvwxyz"
//     let finalStr = '', currIndex =0
//     while(currIndex < number){
//         finalStr += alphabets[currIndex%26]
//         currIndex++
//     }
//     return finalStr
// }
// // console.log(generateString(27)

// function encodeNumberWithString(arr){
//     for(let i=0; i<arr.length; i++){
//         arr[i] = generateString(arr[i])
//     }
//     return arr
// }

// console.log(encodeNumberWithString([1,2,100]))




/////////                 alternative way of same que.
//////-----------------------------------------------------------------------------------------------------------------------------------
// function generateString(number){
//     let alphabets = "abcdefghijklmnopqrstuvwxyz"
//     let finalStr = '', currIndex =0
//     while(currIndex < number){
//         finalStr += alphabets[currIndex%26]
//         currIndex++
//     }
//     return finalStr
// }

// function encodeNumberWithString(arr){
//     let maxValue = Math.max(...arr)
//     let str = ['']

//     for(let i=1; i<=maxValue; i++){
//     str.push(generateString(i))
//     }

//     for(let i=0; i<arr.length; i++){
//         arr[i] = maxValue[arr[i]]
//     }
//     console.log(str)
//     console.log(maxValue)
//     return arr
// }

// console.log(encodeNumberWithString([1,2,3,5]))

// console.log('AB'.toLowerCase())

//  let a = 'ab'
//  let b = 'cd'
//  let c = 'abcd'
//  console.log((a + b) == c)

// if((a + b) == c){
//     console.log('Yes')
// }else{
//     console.log('No')

// }