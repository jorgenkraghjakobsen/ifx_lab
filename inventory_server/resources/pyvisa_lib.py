import pyvisa as visa

rm = visa.ResourceManager()

def listResources():
    return rm.list_resources()