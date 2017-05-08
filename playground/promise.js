var asyncAdd =(a,b) => {
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            if(typeof a === 'number' && typeof b === 'number') { resolve(a+b); }
            else {reject("Arguments must be number!!!!!!")}
        },1500)
    })
}

asyncAdd(5,'7').then( (result)=>{
        console.log("Result",result);
        return asyncAdd(result,33);
    }).then((result)=>{
        console.log("Should be 45",result)
    }).catch((errorMessage)=>{
        console.log(errorMessage);
    });
    
    
    
    
    
// var somePromise = new Promise((resolve,reject) => {
//   setTimeout(()=>{
//     //   resolve('Hey, it worked'); 
//         reject('Unable to fulfill promise');
//   },2500)
// });

// somePromise.then(  (message) => {  
//     console.log("Success",message)
// },(errorMessage) => {
//     console.log("error", errorMessage);
// })

// PROMISE
// var somePromise = new Promise((resolve,reject) => {resolve('Hey, it worked'); reject('Unable to fulfill promise');});
// you can resolve one once, or reject one once, but cant do both, and cant do twice
// promise pending when waiting for data
// promise settled when it has resolved or rejected data //so either way "promise settled"

// to make a promise, use constructor  var somePromise = new Promise(someAnonymousFunction(){});
// used for async action like fetch website data
// resolve ->fulfill promise -> its done what you expected, ike DB request, http request, or something lese
//  inside resolve is actual data user wanted
// reject -> cant fullfil promise


// somePromise.then(function1(data1){},function2(data1){}) //call back for success and failure
// can only pass in 1 piece of data to both resolve and reject, so best to use object with multiple properties
// function1 only for success, call works as expected, gets value for resolve
// function2 is for error, but variable ssame as function1

// promise provide callbacks for both success and error cases
// in callback, one function fired no matter what, arguments let us know about status
// promises have 2 functions so that will let us know if things went as planned



//***************
//promise chaining : inside success call, return a new promise