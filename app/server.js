var app = require("express")();
var http = require( "http" ).createServer( app );
var io = require("socket.io")( http, {
    cors: {
      origin: '*',
    }
  } );
var cors = require("cors")
const PORT = 4000;

const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions))

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

http.listen( PORT, function() {
console.log( "Server listening on port:" + PORT );
});
let upvote_count=0
let interval;
io.on("connection", function( socket ) {
    console.log("a user has connected!");
    if (interval) {
        clearInterval(interval);
      }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on( "disconnect", function() {
        console.log( "user disconnected" );
        clearInterval(interval);
    });
     
    // socket.on( "upvote-event", function( upvote_flag ) {
    // console.log( "upvote: " + upvote_flag );
    // upvote_count += upvote_flag ? 1: -1;
    // var f_str = upvote_count + ( upvote_count == 1 ? " upvot": " upvotes");

    // io.emit( "update-upvotes", f_str );
    // });
});