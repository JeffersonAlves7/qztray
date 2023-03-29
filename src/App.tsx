import qz from 'qz-tray'
import { useEffect, useState } from 'react'

const impressoraName = ""

function App() {
  const [impressoras, setImpressoras] = useState<string[]>([])

  async function imprimir() {
    console.log('imprimir')
    try {
      const printer = await qz.printers.find("Microsoft XPS Document Writer")
      var config = qz.configs.create(printer);       // Create a default config for the found printer
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
