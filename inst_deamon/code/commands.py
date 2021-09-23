import code.manual_commands as manualCmdExec
import string

cmdDict = {
    "manual_commands" : {
        "list_resources" : [manualCmdExec.list_resources, 0],
        "open_resource" : [manualCmdExec.open_resource, 1],
        "query_resource" : [manualCmdExec.open_resource, 2]
    },
    "pyvisa_commands" : {"list_resources"},
    "daemon_commands" : {"end_daemon"},
    "prefixes" : {"..." : "manual_commands", ".#." : "pyvisa_commands", ".!." : "daemon_commands"}
}