# TODO:

This will probably not concern you, but feel free to look through it anyway.

---

Entirely written by Marcus:

> ./socket_daemon.py:
>     Todo:
>          Add the daemon functionality
> 
>     Job:
>          Open socket and recieve socket messages. Then iterate through code/commands.py and find the corresponding command and execute it.
> 
> ./code/commands.py:
>     Todo:
>         For now, nothing - but add more functionality when needed. It should be fairly easy.
> 
>     Job:
>         commands.py has a list of the possible commands that a socket should and can execute.
> 
> ./code/manual_commands.py && code/pyvisa_commands.py:
> 
>     Job:
>          The manual_commands.py serves the purpose of answering requests from sockets that uses the prefix ... and pyvisa_commands.py servers the purpose of answering the requests for .#. - this is just so the computer can know weather its talking to a human or a bot.

Partly written by Marcus:

> ```
> Job at TCPVisaSocket: which is around line 100
>      This is a class responsible of communicating with the socket. It just send and recieves whatever it is told to. Looking at the code should make this message make more sense. This class should have all the commands in the code/commands.py file.
> Job at open_socket(self): which is around line 3300
>     this will check through the tryIps varible - if it gets a valid response it return an instance of the TCPVisaSocket etc. etc. etc. 
> 
> Job at open_resource(): which is around line 3300
>     It checks every ip in the array "tryIps"(Which is defined at the top) at port 1340(This is the port that the socket servers is located at). If it gets a valid response from an ip it will return the socket class, which has commands like what open_resource() normally (Without this extra code) would return. If it fails to find a valid socket server, it will fall back to the normal way to open an instrument. This will only succeed with local instruments obviously. 
> ```
