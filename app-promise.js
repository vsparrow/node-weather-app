//  app will demand address unless file default.address exists
//  if no arguments given it will read the address from the default address file
//  if arguments given, app will use arguments instead

var yargs = require("yargs");           //required for parsing arguments
const axios = require("axios");         //required for http requests
const fs = require("fs");               //required for file functions

var demandAddress = true;               //by default demand address from user
var defaultAddressFileExists = false;   //does address file exist? default is false
var fileAddress = "";                   //address from file will go here
var address = "";

defaultAddressFileExists = fs.existsSync("./default.address") //get true or false
if(defaultAddressFileExists){           //read file adddress into var fileAddress
    fileAddress = fs.readFileSync("./default.address");
    demandAddress = false;              //if the file exists we dont demand address from user
}

// ***************************************************************************** start yargs
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

// ***************************************************************************** option d

if(argv.d != undefined) {
    console.log("YOU CHOSE TO CREATE A DEFAULT ADDRESS");
    if(argv.d === "") {argv.d = argv.a} //if argv.d came in blank but exists, use arg.a's data
    fs.writeFileSync("./default.address",argv.d); //write to default.address
}
// ***************************************************************************** end option d

//set the address 
if(argv.address == undefined && argv.default== undefined){ address = fileAddress}
else {(argv.address != "") ? address = argv.address : address = argv.default}

var encodedAddress = encodeURIComponent(address);
var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

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