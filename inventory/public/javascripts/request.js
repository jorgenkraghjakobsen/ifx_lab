function detect( ) {
    value = document.getElementById('raspberries').checked;
    if(value){
        detectRaspberries()
    } else{
        detectNetworks()
    }
}
function detectNetworks() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
            network = JSON.parse(this.responseText)["inventory"]
            createTable(network)
        }
    };
    xhttp.open("POST", "/", true);
    xhttp.setRequestHeader("DetectType", "network")
    xhttp.send("");
}
function detectRaspberries() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            network = JSON.parse(this.responseText)["inventory"]
            createTable(network)
            if(localStorageSupport) {
                localStorage.network = this.responseText;
            }
        }
    };
    xhttp.open("POST", "/", true);
    xhttp.setRequestHeader("DetectType", "raspberries")
    xhttp.send("");
}