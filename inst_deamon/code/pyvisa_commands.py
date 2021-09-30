import visa as pyvisa
rm = pyvisa.ResourceManager('@py')

openInstruments = {}
instIDCounter = 0
#Will return a list of resources
def list_resources(args):
    return bytes(str(rm.list_resources()).encode("utf-8"))

def list_open_resources(args):
    return bytes(str(openInstruments),encoding="utf-8")

#Will return a success or failed message
def open_resource(args):
    global instIDCounter
    inst = rm.open_resource(args[0])

    if args[0] in openInstruments:
        for i in openInstruments.keys():
            if args[0] == i:
                return bytes(args[0],encoding="utf-8")
    else:
        openInstruments[args[0]] = inst
        instIDCounter = instIDCounter + 1
        return bytes(f"{instIDCounter-1}", encoding="utf-8")

#Will return the answer from the resource
def query_resource(args):
    global openInstruments
    
    return bytes(openInstruments[args[0]].query(args[1]),encoding="utf-8")

#Will return a success or failed message
def write_resource(args):
    return bytes(str(openInstruments[args[0]].write(args[1])), encoding="utf-8")

def read_resource(args):
    return bytes(openInstruments[args[0]].read(),encoding="utf-8")

#Will return a success or failed message
def close_resource(args):
    pass
    return bytes("Will be added later",encoding="utf-8")

def ping(args):
    return bytes("pong",encoding="utf-8")
