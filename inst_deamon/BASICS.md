# How to use?

---

## Make sure that you can import it.

You will need the custom TCPVISA library to do this. Either get it by downloading theese  and add it to \$PATH.

```python
$ export PYTHONPATH=$PYTHONPATH:/path/to/this/folder
```

You can also check if a folder with this library is mounted. You can check this by writing

```
$ cat /proc/mounts
```

and seeing if a line contains 

```
192.168.1.21:/export/rpi
```

If it doesn't you can google how to mount it.

## How can you use the code?

This is the most vital part of using this library. Please make sure that you imported the correct library!

You can find some examples in 

```
./client/
```

and you should be able to see some documentation in there.

## Server commands

You might be asking what commands the server currently can send / recieve.

> PyVisa connection commands (prefix: .#.)::
>     ping || If server works it will respond with pong
>     list_resources || Responds with the connected resources.
>     list_open_resources || Responds with the open resources on the server.
>     open_resource [resource string] || opens a resource on the server. If resource is already open it just returns the already open resource.
>     query_resource [command string] || queries an open resource
>     write_resource [command string] || writes to an open resource
>     read_resource [resource string] || reads from an open resource
> 
> Manual connection commands (prefix: ...):
> 
> Daemon commands (prefix: .!.):
>     end_daemon || This will stop the daemon. 
