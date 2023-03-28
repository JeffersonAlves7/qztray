const printButton = document.getElementById('imprimir')

try {
    qz.websocket.connect().then(() => {
        alert("connected")
    })
}
catch (e) { }

function displayMessage(message) {
    document.querySelector("ul").innerHTML(message)
}

function findPrinters() {
    try {
        qz.printers.find().then(function (data) {
            var list = ''
            for (var i = 0; i < data.length; i++) {
                list += "<li>" + data[i] + "<li>"
            }
            displayMessage(list)
        }).catch(function (e) { console.error(e); })
    }
    catch (e) { }
}

printButton.onclick = async () => {
    console.log('imprimir')
    try{
        const printer = await qz.printers.find("zebra")
        var config = qz.configs.create(printer);       // Create a default config for the found printer
        var data = ['^XA^FO50,50^ADN,36,20^FDRAW ZPL EXAMPLE^FS^XZ'];   // Raw ZPL
        return qz.print(config, data);
    }
    catch(e){ }
}

window.onload = () => {findPrinters()}