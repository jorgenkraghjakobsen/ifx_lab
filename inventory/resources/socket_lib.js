const net = require('net');

/*
class device {
  constructor(HOST, PORT) {
    //INIT CLIENT CONNECTION
    this.HOST = HOST
    this.PORT = PORT
    this.client = net.connect({port: this.PORT, host: this.HOST});
    this.open = true

    //DEFINE HANDLER EVENTS
    this.client.on('connect', function() {
      //this.write("getDevices");
      console.log("Connected")
      
    });
    
    this.client.on('data', (data) => {
      console.log(data.toString());
    });
  }

  writeMessage(message) {
    if(this.open) {
      this.client.write(message+"\n")
    } else {
      console.log("Can't write messages after socket is closed!")
    }
  }
  endConnection() {
    this.client.end()
    this.open = false
    console.log("Closed")
  }
}*/

function device(host,port,message,callback) {
  client = net.connect({port: port, host: host});
  client.on('connect', function() {
    client.write(message)
  });
  
  client.on('data', (data) => {
    client.end()
    callback(data.toString())
  });
}

exports.device = device;