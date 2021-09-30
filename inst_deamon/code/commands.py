import code.manual_commands as manualCmdExec
import code.pyvisa_commands as pyvisaCmdExec
import string

cmdDict = {
    "manual_commands" : {
        "list_resources" : [manualCmdExec.list_resources, 0],
        "open_resource" : [manualCmdExec.open_resource, 1],
        "query_resource" : [manualCmdExec.query_resource, 2]
    },
    "pyvisa_commands" : {
        "ping" : [pyvisaCmdExec.ping, 0],
        "list_resources" : [pyvisaCmdExec.list_resources, 0],
        "list_open_resources" : [pyvisaCmdExec.list_open_resources, 0],
        "open_resource" : [pyvisaCmdExec.open_resource, 1],
        "query_resource" : [pyvisaCmdExec.query_resource, 2],
        "write_resource" : [pyvisaCmdExec.write_resource, 2],
        "read_resource" : [pyvisaCmdExec.read_resource, 1],
    },
    "daemon_commands" : {"end_daemon"},
    "prefixes" : {"..." : "manual_commands", ".#." : "pyvisa_commands", ".!." : "daemon_commands"}
}