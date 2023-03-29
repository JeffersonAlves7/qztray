import qz from 'qz-tray'
import { useEffect, useState } from 'react'

const impressoraName = ""

function App() {
  const [impressoras, setImpressoras] = useState<string[]>([])

  function imprimir(){
    qz.websocket.connect()
      .then(() => {
        return qz.printers.find()
      })
      .then((printers: string[]) => {
        const config  = qz.configs.create(
          impressoraName || printers.filter(printer => printer.toLowerCase().includes("zebra"))[0]
        )
        return qz.print(config, [{
          type: 'pixel',
          format: ' html',
          flavor: 'plain',
          data: (document.querySelector("ul")?.innerHTML)
        }])
      })
      .then(() => {
        return qz.websocket.disconnect()
      })
      .then(() => {
        //  process.exit(0)
      })
      .catch((err: any) => {
        console.error(err ?? "Erro")
      })
  }


  useEffect(() => {
    qz.websocket.connect()
      .then(() => {
        return qz.printers.find()
      })
      .then((printers: string[]) => {
        setImpressoras(printers)
        return qz.websocket.disconnect()
      })
      .then(() => {
        //  process.exit(0)
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
