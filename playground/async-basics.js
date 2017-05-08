console.log("starting app");


// console.log();
// setTimeout(function(){},1000);
setTimeout(() => {
   console.log("inside of callback"); 
},2000);

setTimeout(()=>{
    console.log("Set time out works");
},0)

console.log("finishing app");