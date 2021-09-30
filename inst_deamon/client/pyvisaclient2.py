import sys 
sys.path.insert(0, '..')

import visa  #(THIS HAS TO BE THE MODIFIED VERSION!)
rm = visa.ResourceManager()
sm = visa.SocketManager()
socket = sm.open_socket()

i1 = socket.open_resource("TCPIP::192.168.1.189::INSTR") #Resource string could fx be "TCPIP::192.168.1.189::INSTR"
i1.query('*IDN?')