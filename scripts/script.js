const printButton = document.getElementById('imprimir')
const impressoraName = "CUPS-BRF-Printer"

try {
    qz.websocket.connect().then(() => {
        findPrinters()
    })
}
catch (e) { }

function displayMessage(message) {
    const ul = document.querySelector("ul")
    console.log({ ul, message })
    ul.innerHTML = message
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
    try {
        const printer = await qz.printers.find(impressoraName)
        var config = qz.configs.create(printer);       // Create a default config for the found printer
        // var data = ['^XA^FO50,50^ADN,36,20^FDRAW ZPL EXAMPLE^FS^XZ'];   // Raw ZPL
        const data = [
            {
                type: 'pixel',
                format: 'pdf',
                flavor: 'file',
                data: 'assets/14323982_1.pdf'
            }
        ]
        return qz.print(config, data);
    }
    catch (e) {
        console.log(e)
    }
}
