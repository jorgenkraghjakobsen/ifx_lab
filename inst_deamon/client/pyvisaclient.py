import sys 
sys.path.insert(0, '..')

import tcpvisa as pyvisa

#This example firstly opens a socket to every open sockets out there. It then iterates through every socket and asks them to list their resources. 

rm = pyvisa.ResourceManager()
i1 = rm.open_socket()
print(i1)
for i in i1:
    print(i.list_resources())

#    print(i.open_resource("TCPIP::192.168.1.189::INSTR"))

