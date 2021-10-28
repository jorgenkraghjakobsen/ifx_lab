import sys 
sys.path.insert(0, '..')
"""
This example asks every open socket if they have a matching insturment. open_resource will then return an array with the similiar instruments.
"""
import tcpvisa  #(THIS HAS TO BE THE MODIFIED VERSION!)
rm = visa.ResourceManager('@py')

i1 = rm.open_resource("ASRL/dev/ttyUSB0::INSTR", checkSocket=True)[0]

print(i1.query('*IDN?'))
