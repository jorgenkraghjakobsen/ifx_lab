import socket,json

# I do not recommend using this example. It manually opens a socket and sends commands to the socket server. This is what it would look like without automation.
HOST = 'localhost'
PORT = 1340
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST, PORT))
cmd = "...list_resources"
#data_string = json.dumps(cmd)
data_string = bytes(cmd,encoding="utf-8")
s.send(data_string)
print(data_string)

data = s.recv(4096)
print('Received', repr(data.decode()))
s.send(bytes("...open_resource ASRL/dev/ttyUSB0::INSTR", encoding="utf-8"))
data = s.recv(4096)
print('Received', repr(data.decode()))
s.send(bytes("...query_resource ASRL/dev/ttyUSB0::INSTR *idn?", encoding="utf-8"))
data = s.recv(4096)
print('Received', repr(data.decode()))
s.close()

