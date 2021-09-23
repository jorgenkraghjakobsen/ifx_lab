//Defining a few global variables

displayMode = 0 // 0 = The default selectedindex
//0 = all, 1 = Instruments, etc              

network = []
knownManufactures = ["Tektronix"]

SHOWKEYS = ["ip", "hostname", "socket", "instruments"]

localStorageSupport = false;

//Dont worry about this, it's just to purify the data the server recieves.
function htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

previous = null;