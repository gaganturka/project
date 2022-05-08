// // ///////////.......................................SLLIDING WINDOW......................../
// // in this que we have to find maximun number in window that will move from left to rigth window define no. of array that
// // contain w no of elements
// const arr = [1,3,2,4,5,7,9,8,5,]
// const w= 3
// result = []

// // total no of window = arr.length - W + 1

// for(let i=0; i<arr.length-w+1; i++ ){
//     let max = arr[i]
    
//     for(let j=i; j<i+w ;j++ ){
//         if(max < arr[j]){
//             max= arr[j]
//         }
//     }
//     result.push(max)
// }

// console.log(result)




////////////////////////////////////////////////oooooooooooooooooooooooooNnnnnnnnnnnnnnnnnnnnn

// const arr = [1,3,2,4,5,7,9,8,5]
// const arr = [1,3,-1,-3,5,3,6,7]
// const w= 3
// result = []

// const deque = [] 
// // ist window = [1,3,2]
// for(let cel =0; cel <w; cel++){
// // console.log(arr[deque[deque.length-1]])
//     while(deque.length > 0 && arr[cel] >= arr[deque[deque.length-1]]){ 
//         deque.pop()
//     }
//     // console.log(cel)
    // deque.push(cel) // pushing index of array
// }
// console.log(deque)

// for(let cel=w; cel<arr.length; cel++){
//     result.push(arr[deque[0]])

//     while(deque.length > 0 && arr[cel] >= arr[deque[deque.length-1]]){//5 >=4
//         deque.pop()
//     }

//     while(deque.length > 0 && cel-w >= deque[0]){
//         console.log('Yaa')
//         deque.shift()
//     }
//     deque.push(cel)
// }

// result.push(arr[deque[0]])
// console.log(result)

// const arr = [1,2,3,4,5,6,7,8,9]
// const w = 3
// let result = [], deque =[]


// for(let i=0; i<w;i++){

//     if(deque.length > 0 && arr[i] > arr[deque[deque.length -1]]){
//         deque.pop()
//     }
//     if(deque.length > 0 && i-w >= deque[0]){
//         deque.shift()
//     }
//     deque.push(i)
// }

// for(let i=w; i<arr.length; i++){
//     result.push(arr[deque[0]])

//     if(deque.length > 0 && arr[i] > arr[deque[deque.length -1]]){
//         deque.pop()
//     }


//     deque.push(i)


// }
// result.push(arr[deque[0]])
// console.log(result)


//.................sliding window

// const arr = [1,3,4,2,6,7887,545,645,57734,6,6645,0]

// const w =3
// const result =[]
// const deque = []

// for(let i=0; i< w; i++){

//     while(deque.length > 0 && arr[i] >= arr[deque[deque.length-1]]){
//     deque.pop()
//     }
//     deque.push(i)
// }
// console.log(deque)

// for(let i=w; i<arr.length; i++){
//     result.push(arr[deque[0]])
//     while(deque.length > 0 && arr[i]>= arr[deque[deque.length -1]]){
//         deque.pop()
//     }
    
//     while(deque.length > 0 && i-w >= deque[0]){
//         deque.shift()
//     }
//     deque.push(i)
// }

// result.push(arr[deque[0]])
// console.log(result)
///////...............................................find SUBSTRING from string ....................////////////////////

// function tryy(str){

//     let c_count = 0;
//     let count = []

//     for(let i=0; i<26; i++){
//         count.push(0)
//     }

//     for(let i=0; i<str.length; i++){
//         if(count[str[i].charCodeAt(0) - 'a'.charCodeAt(0)]===0){
//             c_count++
//         }
//         count[str[i].charCodeAt(0) -  'a'.charCodeAt(0)]++
//     }
//     console.log(c_count)
//     console.log(count)
// }

// tryy('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaazsdeerer')

//////////////................................................recursion.....................///////////

//...........iteration is different from recurson like -------iteration all element come one by one and recurson :-
// recurson is a method of solving problem where soution depend on solutions to smaller instance of the same prob.
//recursion solve rcursive problem by function that call them self from their own code


// we want in array how many ele. are divided by 7

// const arr = [12,24,5,6,7,8,34,3,6,675675,78,14]

// // ....ITERATION

// for(let i=0; i<arr.length; i++){
//     if(arr[i]%7 ==0){
//         console.log('Yes')
//     }else{
//         console.log('No')
//     }
// }

//..............RECURSON................//
// const arr = [12,24,5,6,7,8,34,3,6,675675,78,14]

// function isEleDivBy7 (arr){
//     if(arr.length == 0){
//         return  
//     }
// let ele = arr.pop()

// if(ele%7 ==0){
//     console.log('Yes')
// }else{
//     console.log('No')
// }
// isEleDivBy7(arr)
// }
// isEleDivBy7([7,12,24,5,6,7,8,34,3,6,675675,78,14])


// sum of array by recurn 

// n=5
// total = 0
// for(i=1; i<=n ; i++){
//     total += i
    
// }
// console.log(total)
// let total =0
// function sum(num){
    // if(num == 0){
    //     console.log(total)
    //     return 'Yes'
    // }
    // total += num

    // num--

    // sum(num)
    // if(num === 1) return 1
    // return num + sum(num-1)
//     console.log(num + sum(num-1))
// }
// sum(5)