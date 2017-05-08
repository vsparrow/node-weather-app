var request = require("request");

function geocodeAddress(address,callback){
  
    var encodedAddress = encodeURIComponent(address);
    var url = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`
        
    request({
        url: url,
        json : true    
    },(error,response,body)=>{
        if(error){callback("Unable to connect to Google Servers.")}
        else if(body.status === "ZERO_RESULTS") {callback("Error with address listed")}
        else if(body.status === "OK"){
            callback(undefined,{
             address : body.results[0].formatted_address ,  
             latitude : body.results[0].geometry.location.lat ,
             longitude : body.results[0].geometry.location.lng
            })

        }
        else {console.log("ERROR UNKNOWN in request function")}
    });
  
}


module.exports = {geocodeAddress}


