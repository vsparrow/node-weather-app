var getUser = (id, callback) => {
    var user = { id: id, name : "COOLMAN"};
    setTimeout(()=>{
        callback(user);        
    },3000);

}


getUser(31,(userObject)=>{
    console.log(userObject);
});

