import './App.css'
import Inicio from "./inicio"
import InicioSesion from "./InicioSesion"

const login = true;


function App() {

  return <>
  {login ? <Inicio /> : <InicioSesion />}
  
  </>

}

export default App;