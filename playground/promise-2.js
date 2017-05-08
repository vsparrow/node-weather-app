//make a function that wraps request returning a promise
 
const request = require("request");

// function geocodeAddress(address){
//     console.log("inside");
//     return new Promise((resolve,reject) => {
//         resolve("Address is",address)
//         reject("Badd adddddress! :", address);    
//     })

// }

var geocodeAddress = (address) => {
    // console.log("got here")
    
    return new Promise((resolve,reject) => {
    // console.log("got here")

        var encodedAddress = encodeURIComponent(address);
        var url = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`        
        //*****************************************************************************************************
        request({
        url: url,
        json : true    
        },(error,response,body)=>{
        if(error){
            console.log("unable to get weather");
            // reject("Unable to connect to Google Servers.")
        }
        else if(body.status === "ZERO_RESULTS") {
            console.log("unable to get weather");
            // reject("Error with address listed")
        }
        else if(body.status === "OK"){
            resolve({
             address : body.results[0].formatted_address ,  
             latitude : body.results[0].geometry.location.lat ,
             longitude : body.results[0].geometry.location.lng
            })
        }
        else {
            console.log("unable to get weather");
            // reject("ERROR UNKNOWN in request function")
        }
        });
        //*****************************************************************************************************
    })//end return promise
};//end geocode

    
geocodeAddress('10001').then((location)=>{
    //add + lat + lon
    //print object using pretty printing
    console.log(JSON.stringify(location,undefined,2))
},(errorMessage)=>{
    //log error
    console.log(errorMessage)
});
    
// geocodeAddress("90210");    