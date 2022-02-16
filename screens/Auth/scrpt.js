    // let a = [1,2,3,4,1,2,3];
    // let unique = 0;
    // // const uniqueElements = new Set(a);
    // for (let i =0; i<a.length; i++){
        
    //     for(let j = i+1; j<a.length; j++){
    //         if(a[i] == a[j]){
    //             break;
    //         }else{
    //             continue;
    //         }
    //     }
    //     unique = a[i];
    //     // console.log("dsds",unique);
    // }
    // console.log("dsds",unique);

    // const result = a.filter(word => {
    //     console.log("word ", word);
    // });





// function toFindDuplicates(arry) {
//     let arr = [];
//     const uniqueElements = new Set(arry);
//     const filteredElements = arry.filter(item => {
//         if (uniqueElements.has(item)) {
//             // uniqueElements.delete(item);
//             arr.push(item);
//         } else {
//             return item;
//         }
//     });
//     return arr;
//     // return [...new Set(uniqueElements)]
// }

// const arry = [1, 2, 1, 3, 4, 3, 5];
// const duplicateElements = toFindDuplicates(arry);
// console.log(duplicateElements);


// var data = [1, 2, 3, 5, 2, 1, 4];

// let result = data.filter((ele)=>{
//     return ele;
// });

// console.log(result);

// var a = [0, 0, 1, 2, 1];

// // iterate over elements and filter
// let res = data.filter((v)=> {
//   // get the count of the current element in array
//   // and filter based on the count
//   return data.filter((v1)=> {
//     // compare with current element
//     return v1 == v;
//     // check length
//   }).length == 1;
// });

// let resp = "";
// if(res.length == 0){
//     resp =  res = 0;
// }else if(res.length = 1){
//     resp = res.join("")
// }else if(res.length >1){
//     resp =  res.join(",");
// }
// console.log(resp);



// let res = a.filter((v1)=>{
//     return a.filter((v2)=>{
//         return v1 == v2
//     }).length == 1;
// });
// let resp = 0;
// if(res.length == 0){
//     resp =  res = 0;
// }else if(res.length = 1){
//     resp = res.join("")
// }else if(res.length >1){
//     resp =  res.join(",");
// }
// console.log(parseInt(resp));



// ones = (ones ^ a[i]) & ~twos;
// let ones = 3;
// let twos = 2;

// ones = (ones ^ 6);

// console.log("me",ones);

// function findElement(arr) {
//     var ones = 0;
//     var twos = 0;
//     for (var i = 0; i < arr.length; i++) {
//       ones = (ones ^ arr[i]) & ~twos;
//       twos = (twos ^ arr[i]) & ~ones;
//     }
//     return ones;
//   }
    let ar = [1,2,3,4,1,2,3];
    let res = ar[0]; 
        for (let i = 1; i < ar.length; i++){ 

            console.log("outBefore",res," ar", ar[i]);
            res = res ^ ar[i]; 
            console.log("outAfter",res," ar", ar[i]);
        }
        console.log( res); 