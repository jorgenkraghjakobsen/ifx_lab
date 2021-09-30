import socket
import threading
import daemon
import traceback
import code.commands as cmdHandler
import struct
import json

import sys 
sys.path.append('..')

RUN_AS_DAEMON=False

#DEFINE A FEW VARIABLES
host = "localhost"
port = 1340

debug_print=True


sock_counter = 0
sock_counter_total = 0

def handle_client(Client, socket_id):
    global sock_counter
    global sock_counter_total
    if debug_print: print(f"Client socket {socket_id} joined joined.")

    sock_counter = sock_counter + 1
    sock_counter_total = sock_counter_total + 1

    alive = True
    while alive:
        msgStr = None
        try:
            data = Client.recv(2048)
            msgStr = data.decode("utf-8")
            if msgStr =="":
                raise Exception
        except Exception as e:
            alive = False
            sock_counter = sock_counter - 1
            if debug_print: print(f"Client {socket_id} left.")

        if debug_print: print(msgStr)
        if len(msgStr) >= 4:
            cmdIndicator = msgStr[:3]
            curCmd = msgStr[-len(msgStr)+3:]
            
            curCmdArgs = curCmd.split(" ")
            curCmd = curCmdArgs[0]
            curCmdArgs.pop(0)

            for key, value in cmdHandler.cmdDict['prefixes'].items():
                if cmdIndicator == key:
                    for cmdKey, cmdFunction in cmdHandler.cmdDict[value].items():
                        #print(cmdKey, curCmd)
                        if len(curCmdArgs) == cmdFunction[1]:
                            if cmdKey.strip() == curCmd.strip():
                                out = cmdFunction[0](curCmdArgs)
                                print(out)
                                #print(type(out))
                                Client.send(out)

                    cmdFunc = cmdHandler.cmdDict[value]
                    #print(key, value)
                    break
        else:
            Client.send(b"Send a valid command.\n")

#Bind and run the listening loop.
def main():
    server = socket.socket()
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind((host, port))
    server.listen(1)
    print(f"Server listening on {host}:{port}")
    while True:
        Client, address = server.accept()
        socket_id = sock_counter_total
        thread = threading.Thread(target=handle_client, args=[Client, socket_id])
        thread.daemon = True
        thread.start()


if RUN_AS_DAEMON:
    with daemon.DaemonContext():
        main()
else:
    main()
