import pyvisa as visa


def getConnetedDevices():
    rm = visa.ResourceManager()
    return rm.list_resources()
