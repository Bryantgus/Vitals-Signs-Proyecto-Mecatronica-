import { useState, useEffect } from "react";
import FichaMedica from "./fichaMedica";
import NotePad from "./assets/NotePad_svg";
import Medicion from "./Medicion";
import infoPatient from "../infoPatient";
import signs from "../signs";
import "./Inicio.css";

const { nombre: nombreUser, edad: edadUser, fechaDeNacimiento: fechaUser, tipoSangre: SangreUser } = infoPatient;

import './App.css';

function Inicio() {
  const [signosVitales, setSignosVitales] = useState({
    bpm: '0', // Valor inicial
    o2: '0', // Valor inicial
    temp: '0' // Valor inicial
  });

  useEffect(() => {
    const fetchSignosVitales = () => {
      fetch('http://10.0.0.210:3000/')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Actualiza el estado con los valores de la respuesta, excluyendo la fecha
          setSignosVitales({
            bpm: data.bmp,
            o2: data.o2,
            temp: data.temp
          });
        })
        .catch((error) => {
          console.error('Error fetching the signos vitales:', error);
        });
    };

    // Establecer un intervalo que llame a la API cada 2 segundos
    const intervalId = setInterval(fetchSignosVitales, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []); // [] asegura que solo se ejecute una vez al montar

  return (
    <div className="main">
      <header>
        <NotePad />
        <h1>Signos Vitales</h1>
      </header>

      <FichaMedica nombre={nombreUser} edad={edadUser} sangre={SangreUser} />
      <div className="signosvitales">
        <Medicion descripcion="Pulsaciones por Minuto" img="heartbeat.svg" medida={signosVitales.bpm} />
        <Medicion descripcion="Oxigeno en la Sangre" img="oxygen.png" medida={signosVitales.o2} />
        <Medicion descripcion="Temperatura Corporal" img="temp.svg" medida={signosVitales.temp} />
      </div>
    </div>
  );
}

export default Inicio;
