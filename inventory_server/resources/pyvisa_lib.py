import pyvisa as visa


def getConnetedDevices():
    rm = visa.ResourceManager('@ivi')
    return rm.list_resources()
