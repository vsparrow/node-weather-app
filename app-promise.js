var yargs = require("yargs");
const axios = require("axios");
const fs = require("fs");
var demandAddress = true;
var defaultAddressFileExists = false;
// var fileAddress = "";

//fs.existSync depricated in older versions of node, so will use alternate method.
//fs.existsSync("default.address",(exists)=>{ console.log("return of exist: " + exists)    //defaultAddressFileExists = true})
// fs.statSync("./default.address",(error,stat)=>{

// fs.readFileSync("./default.address",(error,stat)=>{
//     if(error)     {throw error}
// }).catch((error)=>{console.log(`error is: ${error}`)})

// console.log(fs.existsSync("./default.address"));
defaultAddressFileExists = fs.existsSync("./default.address")
console.log(`Does file default.address exist? ${defaultAddressFileExists}`);

const argv = yargs
    .options({
        a: {
            demand : demandAddress,   
            alias : "address",
            describe : "Address to fetch weather for",
            string : true //tells yargs to always parse address as a string
        },
        d: {
            alias : "default",
            describe : "Create default address",
            string : true
        }
    })
    .help()
    .alias("help", "h")
    .argv;
// ***************************************************************************** end yargs
var address = "";
(argv.address != "") ? address = argv.address : address = argv.default;
console.log("This is address: " + address);

// var encodedAddress = encodeURIComponent(argv.address);
var encodedAddress = encodeURIComponent(address);
var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;


// ***************************************************************************** option d

// console.log("argv.address is " +argv.address)
// console.log(argv);
if(argv.d != undefined) {
    console.log("YOU CHOSE TO CREATE A DEFAULT ADDRESS");
    //write to default.address
    
    fs.writeFileSync("./default.address",argv.d);
    
    
}
// ***************************************************************************** end option d







//console.log(argv.address); //undefined if no address given.

// console.log(encodedAddress);
// if(argv.address === undefined)
//     {
//         console.log("Please use option -a to add an address")
//         console.log("Else, please use option -d to add an default address so you wont have to type it again")
//     }

// else {//************************************************************************

// ***************************************************************************** axios http request
    axios.get(geocodeUrl).then((response)=>{
        //trhow error if status property is set to 0 results
        if(response.data.status==="ZERO_RESULTS"){
            //TO THROW ERROR  our promise can catch // to create error from result that we know is erronus but promise doesnt
            throw new Error("Unable to find that address.")
        }
        var lat = response.data.results[0].geometry.location.lat;
        var lon = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/c1c79c93374cb0e0b5e2439d84fd12f5/${lat},${lon}`;
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl);
    
    }).then((response)=>{ //chained call ****************************** see axios.get(weatherUrl) above
        // console.log(response)
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}, but it feels like  ${apparentTemperature}`)
    }).catch((error) => {
        if(error.code==="ENOTFOUND"){
            console.log("unable to connect to api servers")
        }
        else {console.log(error.message)}
        // console.log(error)
    }); 
// } //end else *******************************************************************


//axios knows how to automatically parse json data
//what get returns is actually a promise -> we can use  .then to run some code when a promise is fulfilled or rejected
//success case: axios library recommends you calll it response
//add catch after try to catch all the errors  axios.get(url).then((response)=>{}).catch((error)=>{})



//promise
// can chain multiple then and have one catch at the end   axios.get().then().then().then().catch() 
// one reason why people like promises over callbacks is instead of nesting, you chain // no crazy indentation

// TO THROW ERROR  our promise can catch // to create error from result that we know is erronus but promise doesnt
// throw new Error("error message here")
// console.log(error.message) to print error above, console should be in catch

