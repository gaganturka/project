// BInary search = it work only on sorted array. it divide arr in half then check target exist in which arr left or right 
// then divide to that arr in half then again check it divide arr in n/2 (n=no. of element) .
//////5487
///******************************* write mid in this manner => mid= left + (right-left)/2 */
  //               binary

//////  mid => left + right/2 -left/2 => left/2 + right/2 => (left + right)/2
// function binary(arr, search,left,right){
//     if(right>=left){
//     let mid = parseInt((left+right)/2)

//     if(arr[mid] == search){
//         return mid
//     }
//     if(arr[mid] > search){
//         return binary(arr,search,left,mid-1) 
//     }
//     if(arr[mid] < search){
//         return binary(arr,search, mid+1, right)
//     }
// }
// return false
// }


// console.log(binary([1,2,3,4,5,6,7,8,9],10,0,8))



/////////////........... bubble sort ..........////////////////

// but time complex city of bubble sort is o(n square)
//

// function bubble(arr){
//     for(let i=0; i<arr.length; i++){
//         let swap = false
//         for(let j=0; j<arr.length; j++){
//             if(arr[j]> arr[j+1]){ // if this '>' was a comparison arrow it give ascending order of arr like (2,3,4,5,6)
//                                  // if this '<' was a comparison arrow it give decending order of arr like (6,5,4,3,2)               
//                 arr[j] = arr[j] + arr[j+1]
//                 arr[j+1] = arr[j] - arr[j+1]
//                 arr[j] = arr[j] - arr[j+1]
//                 swap = true
//             }
//         }
//         if(swap == false) break
//     }
//     return arr
// }

// let result = bubble([1,3,4,2,5,69,0,6,32,76,1])
// console.log(result)