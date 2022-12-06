// https://cloudy-gear-fawn.cyclic.app


var express = require("express");
//const { Http2ServerRequest } = require("http2");
var app = express();
var path = require("path");
var service = require("./final.js");

var HTTP_PORT = process.env.PORT || 8080;


function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname,"/finalViews/home.html"));
});

app.get("/register", (req, res) =>{
    res.sendFile(path.join(__dirname,"/finalViews/register.html"));
});

app.post("/register", (req, res) =>{
    service.register().then((data)=>{
        res.send(data);
    });
});

app.get("/signIn", (req, res) =>{
    res.sendFile(path.join(__dirname,"/finalViews/signIn.html"));
});


app.post("/signIn", (req, res) =>{
    service.signIn().then((data)=>{res.send(data)});
});

//app.listen(HTTP_PORT, onHttpStart);

app.use((req, res)=>{
    res.status(404).send("Page Not Found");
  });
  

  service.startDB()
  .then(app.listen(HTTP_PORT, onHttpStart))
  .catch((err)=>{
  console.log("unable to start server: " + err);
  });