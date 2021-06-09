let socket_lib = require('./socket_lib')


socket_lib.device("192.168.1.150", 13371, "ping", (data) => {
    console.log(data)
})
