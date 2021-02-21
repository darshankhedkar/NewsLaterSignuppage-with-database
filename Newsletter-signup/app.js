//jshint esversion:6

const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){
res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

console.log(firstName,lastName,email);
var data={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
      FNAME:firstName,
      LNAME:lastName
    }
    }
  ]
};

var jsonData=JSON.stringify(data);

var options = {
  url:"https://us7.api.mailchimp.com/3.0/lists/1f35f9ecd7",
  method:"POST",
  headers:{
    "Authorization":"Darshans-brew-berry 6a5b89e5f45a5e4d1826f53b203071ab-us7"
  },
  body:jsonData
};

request(options,function(error ,response ,body ){
if (error){
  res.sendFile(__dirname+"/failure.html");
}else{
  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
  }else{res.sendFile(__dirname+"/failure.html");}
}
});

});
app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.port||3000,function(){
  console.log("server is running on port 3000");
});
