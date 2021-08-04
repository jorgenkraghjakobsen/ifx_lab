const net = require('net');


class device {
  constructor(HOST, PORT, message, callback) {
    //INIT CLIENT CONNECTION
    this.HOST = HOST
    this.PORT = PORT

    this.client = net.connect({port: this.PORT, host: this.HOST});
    this.client.this_message = message
    this.client.this_callback = callback
    this.callback = callback

    this.client.this_host = HOST
    this.host = HOST

    //DEFINE HANDLER EVENTS
    this.client.on('connect', function() {
      this.write(this.this_message)
      console.log(this.this_message)
    });

    this.client.on('data', (data) => {
      this.client.end()
      this.callback(null, data.toString(), this.host)
    });

    this.client.on('error', function(err) {
      this.this_callback(err, 'err', this.this_host)
    })
  }
}

exports.device = device;