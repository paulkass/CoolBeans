var aerospike = require('aerospike');
var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();

var config = {
  hosts: [
    { addr: "localhost", port: 3000 }
  ]
};

var client = aerospike.client(config);
client.connect(function(error) { if (error.status == aerospike.status.AEROSPIKEOK) {
  console.log("Client connected.");}
});

var server = new http.createServer(function(req, res) {
res.writeHead(200, {"Content-Type": "text/html"});
res.write("<div>Updating Database...</div><h2>More information will be here. This feature is not yet implemented.</h2>");
var counter = 0;
var client_array = [];
var client_names = [];
var filename = "cmx_data_anon";
require('readline').createInterface({
    input: fs.createReadStream(filename),
    terminal: false
}).on('line', function(line){
   process.nextTick(function(){
     mod_line = line.substring(line.indexOf('{'), line.length);
     json_line = JSON.parse(mod_line);
     res.write("<p>"+json_line.clientName+"</p>");
     if (client_array[json_line.clientName]) {
       client_array[json_line.clientName]++;
     } else {
       client_array[json_line.clientName] = 0;
     }
     var key = aerospike.key('test', 'demo', json_line.clientName+""+client_array[json_line.clientName]);
     var rec;
     client.exists(key, function(error, meta, return_key) {
       // console.log(error.code);
       if (error.status == aerospike.status.AEROSPIKEOK) {
         console.log(2895845-counter);
         counter++;
       } 
       else if (error.code == 602) {  
         rec = {
           location: {x: json_line.location.x, y:json_line.location.y},
           seenTimes: [ { time: {seenTime: json_line.seenTime, 
                                 seenEpoch: json_line.seenEpoch } }  ],
           favtype: "Latte" 
         };
         client.put(key, rec, function(err) {console.log(err); });
         console.log("hi");  
         key_array.push(key);  
       }
       else {
         console.log(error);
       }
     });       	
   });
});


  // res.setHeader('Content-Type', 'text/html');
  res.write("<div>");
  var time_arr = new Array();
  for (var i=0; i<client_names.length; i++) {
    for (var j=0; j<client_array.length; j++){
      client.get(aerospike.key("test", "demo", client_array[client_names[i]]+""+j),
        function(err, rec, meta) {
          time_arr.push(rec.seenTime.time.seenEpoch+"#####"+client_names[i]);
        });
    }
  }
  small_epoch = null; small_index = 0;
  for (var i=0; i<time_arr.length; i++) {
   var data_arr = time_arr[i].split("#####");
   if (small_epoch) {
     if (data_arr[0]<small_epoch[0]) {
       small_epoch = data_arr; small_index = i;
     }
   }
   else {
     small_epoch = data_arr;
   } 
   if (i == times_arr.length-1) {
     temp_arr = [];
     for (var k=0; k<times_arr.length-1; k++){
       if (k<small_index) {
         temp_arr.push(times_arr[k]);
       }
       else {
         temp_arr.push(times_arr[k+1]);
       }
     }
     times_arr = temp_arr;
     res.write(small_epoch[1]);
     console.log(small_epoch[1]);
     break;
   }
   
  }
  res.end();

});
server.listen(80);
