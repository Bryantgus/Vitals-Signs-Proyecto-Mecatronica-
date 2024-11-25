import './App.css'
import Inicio from "./Inicio"
import Configuracion from './Configuracion';
import { useState } from 'react';

function App() {

  const[state, setState] = useState(true);

  const alternarComponente = () => {
    setState(prevState => !prevState);
  };

  return <>
  
    <button class="config" onClick={alternarComponente}></button>
    {state ? <Inicio /> : <Configuracion />}
  </>

}

export default App;