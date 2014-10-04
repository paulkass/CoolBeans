var aerospike = require('aerospike');
var easypost = require('easypost');
var sys = require('sys');
var http = require('http');

var config = {
  hosts: [
    { addr: "localhost", port: 3000 }
  ]
}

var client = aerospike.client(config);

var http = http.createServer(function(req, res){
  switch (req.url) {
  case '/':
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<!DOCTYPE html><html><head><title>Cool Beans!</title></head>"
    +"<body><div id='signup'><h2>Sign Up!</h2>");
    res.write("<form action='/signup' method='post'>"
    + "<input required type='text' name='full_name' placeholder='Full Name'/>"
    + "<input required type='email' name='user_email' placeholder='Email' />"
    + "<input required type='text' name='fav_type' placeholder='Favorite Coffe Type'/>"
    + "<input required type='submit' value='SIGN UP!'/>"
    + "</form></div>");
    res.write("</body></html>");
    res.end();
  break;  
  case '/signup':
    res.writeHead(200, {"Content-Type": "text/html"});
    easypost.get(req, res, function(data) {
      res.
    });
    res.end();
  break;
  }
});
http.listen(80);
