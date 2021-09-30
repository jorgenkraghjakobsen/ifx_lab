import sys 
sys.path.insert(0, '..')

import visa as pyvisa

rm = pyvisa.ResourceManager()
i1 = rm.open_socket()
print(i1.open_resource("TCPIP::192.168.1.189::INSTR"))
print(i1.query('*IDN?'))
print(i1.write('*IDN?'))
print(i1.read())
