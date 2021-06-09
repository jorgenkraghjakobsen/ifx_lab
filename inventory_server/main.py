#GLOBAL IMPORTS
import socket
import threading
import json

#CUSTOM RESOURCES
import resources.pyvisa_lib as instruments

#Variables for holding information about connections
connections = []
total_connections = 0

#Client class, new instance created for each connected client
class Client(threading.Thread):
    def __init__(self, socket, address, id, name, signal):
        threading.Thread.__init__(self)
        self.socket = socket
        self.address = address
        self.id = id
        self.name = name
        self.signal = signal


    def __str__(self):
        return str(self.id) + " " + str(self.address)

    #Attempt to get data from client
    def run(self):
        while self.signal:
            try:
                data = self.socket.recv(32)
            except:
                print("Client " + str(self.address) + " has disconnected")
                self.signal = False
                connections.remove(self)
                break

            #Read the response. If there is no response, it will close the connection.
            if str(data.decode("utf-8")) != "":
                print("ID " + str(self.id) + ": " + str(data.decode("utf-8")))
                response = ""
                decodedData = data.decode("utf-8")
                #Attempt to read respone.
                if decodedData == "getDevices":  #Will respond with a list of connected instruments
                    response = instruments.getConnetedDevices()
                elif decodedData == "getName":
                    response = socket.gethostname()
                elif decodedData == "ping":
                    response = "pong"
                else: #If there was no entry for the data recieved, it will ignore the data and return
                    print("Didnt match input. Response = null")
                    response = None

                if response != None:
                    for client in connections:
                        if client.id == self.id:
                            jsonResponse = json.dumps(response)
                            client.socket.sendall(jsonResponse.encode())
#                print(connections)
#                self.sendall("Hi".encode())
            else:
                print("Client " + str(self.address) + " has disconnected")
                self.signal = False
                connections.remove(self)
                break   

#Wait for new connections
def newConnections(socket):
    while True:
        sock, address = socket.accept()
        global total_connections
        connections.append(Client(sock, address, total_connections, "Name", True))
        connections[len(connections) - 1].start()
        print("New connection at ID " + str(connections[len(connections) - 1]))
        total_connections += 1

def main():
    #Get host and port
    host = socket.gethostname()
    
    #PORT SHOULD BE STATIC IN PRODUCTION
    port = 13371
    #port = int(input())

    #Create new server socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind((host, port))
    sock.listen(5)

    #for i in range(10):
    #    print(" ")
    print("--------------------------------------------")
    print(f"Server started at {host}:{port}")
    print("--------------------------------------------")


    #Create new thread to wait for connections
    newConnectionsThread = threading.Thread(target = newConnections, args = (sock,))
    newConnectionsThread.start()

main()
