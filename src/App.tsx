import qz from 'qz-tray'
import { useEffect, useState } from 'react'

const impressoraName = "Microsoft XPS Document Writer"

function App() {
  const [impressoras, setImpressoras] = useState<string[]>([])

  async function imprimir() {
    try{
      console.log(document.querySelector("ul")?.innerHTML)
      const printer = await qz.printers.find(impressoraName)
      const config = qz.configs.create(printer)
      await qz.print(config, ['^XA^FO50,50^ADN,36,20^FDRAW ZPL EXAMPLE^FS^XZ'])
    }
    catch(e){}
  }

  useEffect(() => {
    qz.websocket.connect()
      .then(() => {
        return qz.printers.find()
      })
      .then((printers: string[]) => {
        setImpressoras(printers)
      })
      .catch((err: any) => {
        console.error(err ?? "Erro")
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
