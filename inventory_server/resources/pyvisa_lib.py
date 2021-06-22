import pyvisa as visa


def listResources():
    rm = visa.ResourceManager()
    return rm.list_resources()
