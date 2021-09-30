# Instrument deamon so multiple people can talk to 1 socket that then will talk to an instrument.


Written entirely by Marcus:
    socket_daemon.py:
        todo:
            add the daemon functionality

        job:
            open socket and recieve socket messages. Then iterate through code/commands.py and find the corresponding command and execute it. 

    code/commands.py:
        todo:
            Add more functionality

        job:
            commands.py has a list of the possible commands that a socket should and can execute. 

    code/manual_commands.py && code/pyvisa_commands.py:
        todo:
            Add more functionality along with commands.py

        job:
            The manual_commands.py servers the purpose of answering to requests from sockets that use prefix ... and pyvisa_commands.py servers the purpose of answering the requests for .#. - this is simply here to seperate any commands from pyvisa sockets from commands from normal sockets. Its not really important, so dont think to much about it if it doesnt make sense. As a rule of thumb, jsut ignore the manual commands.

Partly written by Marcus:
    pyvisa/highlevel.py:
        todo:
            Add more functionality along with commands.py etc.

        job at TCPVisaSocket: which is around line 100
            This is a class responsible of communicating with the socket. It just send and recieves whatever it is told to. Looking at the code should make this message make more sense. This class should have all the commands in the code/commands.py file.  

        job at open_socket(self): which is around line 3300
            this will check through the tryIps varible - if it gets a valid response it return an instance of the TCPVisaSocket etc. etc. etc. 

        job at open_resource(): which is around line 3300
            It checks every ip in the array "tryIps"(Which is defined at the top) at port 1340(This is the port that the socket servers is located at). If it gets a valid response from an ip it will return the socket class, which has commands like what open_resource() normally (Without this extra code) would return. If it fails to find a valid socket server, it will fall back to the normal way to open an instrument. This will only succeed with local instruments obviously. 

Example on how to use the code:
    import visa #(THIS HAS TO BE THE MODIFIED VERSION!)
    sm = visa.SocketManager()
    socket = sm.open_socket()
    inst1 = socket.open_resource("[resource string]") #Resource string could fx be "TCPIP::192.168.1.189::INSTR"
    inst1.query('*IDN?')

Another example:
    import visa #(THIS HAS TO BE THE MODIFIED VERSION!)
    rm = visa.ResourceManager()  
    i1 = rm.open_resource("TCPIP::192.168.1.189::INSTR",checkSocket=True)
    i1.query('*IDN?')

PyVisa connection commands (prefix: .#.)::
    ping || If server works it will respond with pong
    list_resources || Responds with the connected resources.
    list_open_resources || Responds with the open resources on the server.
    open_resource [resource string] || opens a resource on the server. If resource is already open it just returns the already open resource.
    query_resource [command string] || queries an open resource
    write_resource [command string] || writes to an open resource
    read_resource [resource string] || reads from an open resource


Manual connection commands (prefix: ...)::


Daemon commands (prefix: .!.):
    end_daemon || This will stop the daemon. Full command will be .!.end_daemon
    