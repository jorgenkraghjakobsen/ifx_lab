import pyvisa
rm = pyvisa.ResourceManager('@py')

openInstruments = {}
instIDCounter = 0
#Will return a list of resources
def list_resources(args):
    return bytes(str(rm.list_resources()).encode("utf-8"))

#Will return a success or failed message
def open_resource(args):
    global instIDCounter
    inst = rm.open_resource(args[0])
    openInstruments[instIDCounter] = {inst}
#    print(inst)
#    print(type(inst))
    instIDCounter = instIDCounter + 1
    return bytes(f"{instIDCounter-1}", encoding="utf-8")

#Will return the answer from the resource
def query_resource(args):
    global openInstruments
    print(openInstruments[args[0]])
    print()
    print(args[1])
    return bytes(openInstruments[args[0]].query(args[1]),encoding="utf-8")

#Will return a success or failed message
def write_resource(args):
    pass

#Will return a success or failed message
def close_resource(args):
    pass