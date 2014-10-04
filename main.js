var aerospike = require('aerospike');
var easypost = require('easypost');
var express = require('express');
var sys = require('sys');
var http = require('http');
var qs = require('querystring');


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
    res.write("<!DOCTYPllE html><html><head><title>Cool Beans!</title></head>"
    +"<body><div id='signup'><h2>Sign Up!</h2>");
    res.write("<form action='/signup' name='signup_form' method='post'>"
    + "<input required type='text' name='full_name' placeholder='Full Name'/>"
    + "<input required type='email' name='user_email' placeholder='Email' />"
    + "<input required type='text' name='fav_type' placeholder='Favorite Coffe Type'/>"
    + "<input required type='submit' value='SIGN UP!'/>"
    + "</form></div>");
    res.write("</body></html><div><p class="process_box">Cool beans are in your area</p></div>");
    res.end();
  break;  
  case '/signup':
    var body = "";
    req.on('readable', function() {
      body += req.read();
    });
    req.on('end', function() {
      var fields = qs.parse(body);
      res.writeHead({"Content-Type": "text/plain"});
      res.write(fields.full_name);
      res.end();
    });
  break;

  }
});
http.listen(80);
