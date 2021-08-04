import pyvisa as visa

rm = visa.ResourceManager()

def listResources():
    return rm.list_resources()

def queryResource(resourceAddr, query):
    resource = rm.open_resource(resourceAddr)
    return resource.query(query)
    