const express = require("express")
const port = process.env.PORT || 4000;
const path = require("path");
const cors = require("cors")
const bodyParser= require("body-parser")
const cookieParser = require('cookie-parser');
const apiRoutes = require("./routes")
var app = require("express")();
var http = require( "http" ).createServer( app );

var io = require("socket.io")( http, {
    cors: {
      origin: '*',
    }
  } );
require("dotenv").config()
  require("./config/db").connect(process.env.DB_DEV_URL)


  function myMiddleWare(req, res, next) {
    console.log(new Date());
    next();
  }
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  const corsOptions ={
    origin: 'http://localhost:5173', // Your React app origin
    credentials: true, // Allow credentials
  }
  app.use(cors(corsOptions))
  app.use(cookieParser());

  
  // configure public and uploads
  app.use(express.static(__dirname + "/public"));
  app.use("/uploads", express.static("uploads"));
  
  app.use(myMiddleWare);

  app.use("/api",apiRoutes(express))

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
  };



// app.get( "/", function( req, res ) {
//     res.sendFile( __dirname + "/public/index.html");
// });

// app.get( "/chat", function( req, res ) {
//     res.sendFile( __dirname + "/public/chat.html");
// });

http.listen(port, function() {
console.log( "Server listening on port:" + port );
});
let upvote_count=0
let interval;
io.on("connection", function( socket ) {
 const userId = socket.request.userId;
   console.log(userId)
    console.log("a user has connected!");
    if (interval) {
        clearInterval(interval);
      }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on( "disconnect", function() {
        console.log( "user disconnected" );
        clearInterval(interval);
    });
     
    socket.on("message",function(message){
      console.log(`, said: ${message}`)
    })
    // socket.on( "upvote-event", function( upvote_flag ) {
    // console.log( "upvote: " + upvote_flag );
    // upvote_count += upvote_flag ? 1: -1;
    // var f_str = upvote_count + ( upvote_count == 1 ? " upvot": " upvotes");

    // io.emit( "update-upvotes", f_str );
    // });
});