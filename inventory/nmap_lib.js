//const nmap = require('libnmap');
const { exec } = require("child_process");
var identifier = require("./detect_instrument.js")



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
        raw_result.splice(0, 1)
        raw_result.splice(-1,1)
        raw_result.splice(-1,1)


        for(i in raw_result) {
            if(raw_result[i].match(/Host is up/)) {
                raw_result.splice(i, 1)
            }
        }

        for(i in raw_result) {
            if(raw_result[i].match(/Nmap scan report for/)) {
                raw_result[i] = raw_result[i].replace('Nmap scan report for ', "")
            } else {
                raw_result[i] = raw_result[i].replace(')', "")
            }
        }

        for(i=0;i<raw_result.length;i+=2) {
            tmp_obj = {}
            tmp = raw_result[i].toString().search("192.168.1");

            raw_result[i].substring(tmp)

            tmp_obj["hostname/ip"] = raw_result[i];

            if(raw_result[i+1]) tmp_obj["host"] = raw_result[i+1].split("(")[1]//.replace(")", '')
            parsed_result.push(tmp_obj)
        }
        //console.log(parsed_result)

          //console.log(manuals)
          callback(parsed_result);
          //callback(parsed_result);
    });
}


module.exports.scanHosts = scanHosts;
