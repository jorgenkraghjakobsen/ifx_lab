//const nmap = require('libnmap');
const { exec } = require("child_process");

function scanHosts(callback) {
    cmd1 = "nmap -sn 192.168.0.0/24"
	cmd2 = "nmap -sn 192.168.1.0/24"

    raw_result = null
    parsed_result = []

    exec(cmd2, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        raw_result = stdout

        raw_result = raw_result.split("\n")
        result = []
        for(i of raw_result) {
            if(i.match(/Nmap scan report for/)) {
                result.push(i.replace('Nmap scan report for ', ""))
            }
        }

        for(i=0;i<result.length;i++) {
            tmp_obj = {}
            tmp = result[i].match(/\(.*?\)/)
            if (tmp != null) {
                tmp_obj["ip"] = tmp[0].replace("(","").replace(")","")
                tmp_obj["hostname"] = result[i].split(" (")[0]
            } else {
                tmp_obj["ip"] = result[i]
                tmp_obj["hostname"] = undefined
            }
            parsed_result.push(tmp_obj)
        }

          callback(parsed_result);
    });
}


module.exports.scanHosts = scanHosts;
