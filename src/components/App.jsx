import React from "react"
import Editor from "./Editor"



export default function App() {

  const [html, setHtml] = setLocalStorage('html')
  const [css, setCss] = setLocalStorage('css')
  const [js, setJS] = setLocalStorage('js')
  const [srcDoc, setSrcDoc] = React.useState()

  React.useEffect(() =>{
    const timeout = setTimeout(()=>   //waits for 250ms before rendering and updating content in iframe(so the website don't become slower by continuous rendering)
      setSrcDoc( `
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
  ` ),250)

    //cancels timeout is change is made before 250 sec as to not line it in queue
    return() => clearTimeout(timeout) 

  },[html,css,js])

  function setLocalStorage(key){
    const [value, setValue] = React.useState(JSON.parse(localStorage.getItem(key)) || '')

    React.useEffect(() =>{
      localStorage.setItem(key, JSON.stringify(value))
      },[value])

      return [value,setValue]
  }

  return (
    <div className="h-screen">
      <div className="bg-black flex h-1/2">
      <Editor
        language="xml"
        displayName="HTML"
        value={html}
        onChange={setHtml}
      />
      <Editor
        language="css"
        displayName="CSS"
        value={css}
        onChange={setCss}
      />
      <Editor
        language="javascript"
        displayName="JS"
        value={js}
        onChange={setJS}
      />
      </div>
      <div className="h-1/2">
        <iframe 
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        width="100%"
        height="100%" 
        ></iframe>
      </div>
  </div>
  )
}
