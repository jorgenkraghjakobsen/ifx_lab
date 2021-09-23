function createTab(tabName) { //This is executed when clicked on a network element
    if(document.getElementById(tabName) == undefined) {
        var tabsElm = document.getElementById('tabs')
        var btn = document.createElement("BUTTON");
        btn.setAttribute("id", "button_" + tabName)
        btn.setAttribute('class', "tablinks")
        btn.onclick = function( ) {
            changeTab(event, tabName)
        }
        btn.innerHTML = tabName
        btnKiller = document.createElement('p')
        btnKiller.innerHTML = "&#9949"
        btnKiller.onclick = function( ) {
            
            if($(this).parent().hasClass('active')) {
                console.log("clicked")

                document.getElementById("networkInventoryDIV").style.display = "block";
                document.getElementById("mainTab").classList.add("active");  
                
                document.getElementById($(this).parent().attr('id').replace("button_", "")).remove()
                $(this).parent().remove()
            }
        }
        btn.append(btnKiller)
        tabsElm.appendChild(btn)

        //Create the tab for this individual network element
        var infoSwitch = document.getElementById("switch")
        var infoDiv = document.createElement('DIV')

        infoDiv.setAttribute("class", "tabcontent")
        thisElement = getSingleElement(network, tabName)
        createSingleTable(infoDiv, network, tabName, thisElement)



        var infoDivP = document.createElement('P')
        infoDivP.innerHTML = tabName
        infoDiv.appendChild(infoDivP)
                
        //Flexbox elements created here
        var table = document.createElement('table');
        table.setAttribute('id', 'individualTable')

        var instrumentsDiv = document.createElement('DIV')
        instrumentsDiv.setAttribute('id', "instrumentsDiv")


        //This is retrieving and parsing the i2c data from this elements variable
        i2c_data_parsed = []
        if(thisElement["i2c_data"]) {
            thisElement["new_i2c_data"] = JSON.parse(thisElement["i2c_data"])
            for(i in thisElement["new_i2c_data"]) {
                i2c_data_parsed.push([])
                cThisElm = thisElement["new_i2c_data"][i].split(" ")
                for(j in cThisElm) {
                    i2c_data_parsed[i].push(cThisElm[j])
                }
            }
        }
        //This is for retrieving the instruments data from this elements variable
        instrumentsData_parsed = []
        if(thisElement["instruments"]) {
            thisElement["instruments"] = thisElement["instruments"]
            thisElementInstruments = thisElement["instruments"].split(",")
            for(i in thisElementInstruments) {
                instrumentsData_parsed.push([])
                instrumentsData_parsed[i] = thisElementInstruments[i]
            }
        }


        //Fill in the i2c data into a table
        for (var i = 0; i < i2c_data_parsed.length; i++) {
            var row = document.createElement('tr');
            for (var j = 0; j < i2c_data_parsed[i].length; j++) {
                if(i2c_data_parsed[i][j] != "") {
                    var cell = document.createElement('td');
                    cell.textContent = i2c_data_parsed[i][j];
                    row.appendChild(cell);
                }
            }
            table.appendChild(row);
        }
        infoDiv.id = tabName
        infoSwitch.appendChild(infoDiv)

        //Create flexbox so its ready...
        var flexContent = document.createElement('DIV')
        flexContent.setAttribute("class", "flex-content")
        infoDiv.appendChild(flexContent);

        //Create flexbox to ask query instruemnt command
        for(i in instrumentsData_parsed) {
            curInstrumentsDiv = document.createElement('DIV')

            curInstrumentsInput = document.createElement('input')
            curInstrumentsInput.setAttribute("type", "text")

            curInstrumentsText = document.createElement('label')
            curInstrumentsText.innerHTML = instrumentsData_parsed[i];
            curInstrumentsText.setAttribute("for", "curInstrumentsButton")
            curInstrumentsText.setAttribute("class", "instrumentLabel")
            curInstrumentsButton = document.createElement('button')
            curInstrumentsButton.setAttribute("class", "curInstrumentsButton")
            curInstrumentsButton.innerHTML = "Submit"

            curInstrumentsIdnButton = document.createElement('button')
            curInstrumentsIdnButton.innerHTML = "Identify"

            curInstrumentsDiv.setAttribute("class", "individualInstrumentDiv")
            curInstrumentsDiv.appendChild(curInstrumentsText)
            curInstrumentsDiv.appendChild(curInstrumentsInput)
            curInstrumentsDiv.appendChild(curInstrumentsButton)
            curInstrumentsDiv.appendChild(curInstrumentsIdnButton)
            instrumentsDiv.appendChild(curInstrumentsDiv)
            
            curInstrumentsButton.onclick = function() {
                instrumentLabel = $(this).parent().find(".instrumentLabel").text().split(" ")
                $.post("/query",
                {
                    instrument: instrumentLabel[instrumentLabel.length - 1],
                    ip: $($(this).parent().parent().parent().parent().find("#singleTable").find('.ip')[0]).text(),
                    command: $(this).parent().find("input").val()
                },
                function(data,status) {
                    alert(`Data: ${data}\nStatus: ${status}`);
                })
            }

            curInstrumentsIdnButton.onclick = function() {
                instrumentLabel = $(this).parent().find(".instrumentLabel").text().split(" ")
                $.post("/query",
                {
                    instrument: instrumentLabel[instrumentLabel.length - 1],
                    ip: $($(this).parent().parent().parent().parent().find("#singleTable").find('.ip')[0]).text(),
                    command: "*idn?"
                },
                function(data,status) {
                    alert(`Data: ${data}\nStatus: ${status}`);
                })
            }
        }

//      Fill data into flexbox
        flexContent.appendChild(table);
        flexContent.appendChild(instrumentsDiv);
    }
}
function changeTab(evt, thisName) {
    //Create the tab in tablist
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    if(document.getElementById(thisName)) {
        document.getElementById(thisName).style.display = "block";
        evt.currentTarget.className += " active";
    }
}