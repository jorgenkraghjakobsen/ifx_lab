let socket_lib = require('./socket_lib')


socket_lib.device("localhost", 1337, "ping", (data) => {
    console.log(data)
})
