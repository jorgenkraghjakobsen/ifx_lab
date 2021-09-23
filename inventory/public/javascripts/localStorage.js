
if (typeof(Storage) !== "undefined") {
    localStorageSupport = true;
    if(localStorage.network != null) {
        console.log("Storage saved and will be loaded.")
        network = JSON.parse(localStorage.network)["inventory"];
        createTable(network)
    }
} else {
    console.log("This browser doesnt support web storage.")
}