//const nmap = require('libnmap');
const { exec } = require("child_process");



function scanHosts(callback) {/*
    const opts = {
        flags: ["-sn"],
        range: ['192.168.1.0/24']
    };
    nmap.scan(opts, function(err, report) {
        if (err) throw new Error(err);
        result = []
        for (let item in report) {
            //console.log(JSON.stringify(report[item], null, 2));    
            //console.log(item)
            //item.split(" ").forEach((item) => {
            //    result.push(item)
            //})
            console.log(JSON.stringify(report[item]));
        }
        //console.log(JSON.stringify(report["192.168.1.240 192.168.1.241 192.168.1.242 192.168.1.243 192.168.1.244 192.168.1.245 192.168.1.246 192.168.1.247 192.168.1.248 192.168.1.249 192.168.1.250 192.168.1.251 192.168.1.252 192.168.1.253 192.168.1.254 192.168.1.255"], null, 2));    

        //console.log(JSON.stringify(report["192.168.1.240 192.168.1.241 192.168.1.242 192.168.1.243 192.168.1.244 192.168.1.245 192.168.1.246 192.168.1.247 192.168.1.248 192.168.1.249 192.168.1.250 192.168.1.251 192.168.1.252 192.168.1.253 192.168.1.254 192.168.1.255"]))
        //console.log(report)
        //result = JSON.stringify(report["192.168.1.240 192.168.1.241 192.168.1.242 192.168.1.243 192.168.1.244 192.168.1.245 192.168.1.246 192.168.1.247 192.168.1.248 192.168.1.249 192.168.1.250 192.168.1.251 192.168.1.252 192.168.1.253 192.168.1.254 192.168.1.255"])
        result = report
        callback(result)
    });*/


    //REMOVE WHEN DEV DONE ====

    cmd = "nmap -sn 192.168.1.0/24"
    raw_result = null
    parsed_result = []

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        //console.log(`stdout: ${stdout}`);
        raw_result = stdout

        raw_result = raw_result.split("\n")
        raw_result.splice(0, 1)
        raw_result.splice(-1,1)
        raw_result.splice(-1,1)
        
        //raw_result[1].splice(-1, 1)


        for(i in raw_result) {  
            if(raw_result[i].split("(")[0] == "Host is up ") {
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
        console.log(raw_result)
        //console.log(raw_result)
        for(i=0;i<raw_result.length;i+=2) {
            tmp_obj = {}
            tmp = raw_result[i].toString().search("192.168.1");
            
            raw_result[i].substring(tmp)

            tmp_obj["hostname/ip"] = raw_result[i];
            
            tmp_obj["host"] = raw_result[i+1].split("(")[1]//.replace(")", '')
            parsed_result.push(tmp_obj)
        }
        //console.log(parsed_result)
        callback(parsed_result);
    }); 
}



module.exports.scanHosts = scanHosts;