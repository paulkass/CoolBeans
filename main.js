var aerospike = require('aerospike');
var easypost = require('easypost');
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
    res.write("</body></html>");
    res.end();
  break;  
  case '/signup':
    res.writeHead(200, {"Content-Type": "text/plain"});
    var body = "";
    req.on('readable', function() {
      body += req.read();
    });
    var field;
    req.on('end', function() {
      var fields = qs.parse(body);
      field = fields;
      console.log(fields.fav_type);
      res.end("Thanks");
    }); 
  break;
  }
});
http.listen(80);
