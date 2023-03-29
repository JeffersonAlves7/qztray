import qz from 'qz-tray'
import { useEffect, useState } from 'react'

const impressoraName = "CUPS-BRF-Printer"

async function imprimir() {
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
        data: 'http://localhost:3000/pdf'
      }
    ]
    return qz.print(config, data);
  }
  catch (e) {
    console.log(e)
  }
}

function App() {
  const [impressoras, setImpressoras] = useState<string[]>([])

  function findPrinters() {
    try {
      qz.printers.find().then(function (data: any) {
        setImpressoras(data)
      }).catch(function (e: any) { console.error(e); })
    }
    catch (e) { }
  }


  useEffect(() => {
    qz.websocket.connect().then(() => {
      alert("connecte4d")
      findPrinters()
    })
  }, [])

  return (
    <div className="App">
      <ul>
        {impressoras.map(impressora => <li>{impressora}</li>)}
      </ul>

      <button onClick={imprimir}>
        Imprimir
      </button>
    </div>
  )
}

export default App