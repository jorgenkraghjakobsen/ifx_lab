

function identifyInstrumentType(ip, callback) {
    //Do some stuff to get string of instruemnt type
    instrument = 0//identification 


    findManual(instrument, (f) => {
        callback(f)
    })
}

function findManual(instrument, callback) {
    //Use instrument string to find a manual that fits. 
    //regex 
    manualName = instrument
    callback(manualName)
}

//look at https://forum.tek.com/viewtopic.php?t=138189&__cf_chl_jschl_tk__=c57a254a9af573337ce0928fac8b5de660073253-1618406828-0-ATMraqjzL3aJVP1-UU3CBD-aYPCUHcQEssPDRuALge_kLqybkB8Z1jvOZeBjbNWi2E60a-fvAcoqCQ6HWm7IvLzo3vRfGe9AOSdbYtqizHB8jzoYRJNjs3MoN4ljJ3SfgdFhDYMnR2ZZ9qwElMzcaPmzUfevBnyV2n-F0eOK5WsmWsrChhVC6sPAKi7Byp8clrWuVUCaUYQW41Wr-cEwv09t8rjduPz2xFVSHuCagLN13hwqTDhwnP1n9LYbZGgsHLaIHJzZVM4OjRDdxe9J54behH5qqsoGKE8Qy7m-Ci1OwhUD9zgqjVzKwjk4J5X-khnyTrnNC6B3Z94NzC8B1e0NIdCIsRBoT3bsLs08fcAYvPd4_5ino2LMI0gWMtFWhSXsYmhqQWeoqIPgCXMMkKqT-8j8WSMu0c0a2RSTOEt87bCNLsh71O2xmX74VP_tTPkCbOpbhYig4GFv2XnNBFo

module.exports.identifyInstrumentType = identifyInstrumentType;