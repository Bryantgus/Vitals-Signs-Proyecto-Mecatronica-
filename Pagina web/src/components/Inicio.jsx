import { useState, useEffect } from "react";
import FichaMedica from "./fichaMedica";
import NotePad from "./assets/NotePad_svg";
import Medicion from "./Medicion";
import "./Inicio.css";
import './App.css';



function Inicio() {
  const [infoPatient, setInfoPatient] = useState({
    nombre: "nombre",
    edad: "edad",
    sangre: "sangre"
  });

  const [signosVitales, setSignosVitales] = useState({
    bpm: '0',
    o2: '0', 
    temp: '0' 
  });

  useEffect(() => {
  
    const fetchInfoPatient = () => {
      fetch('http://localhost:3000/infoPatient')
        .then((response) => response.json())
        .then((data) => {
          setInfoPatient({
            nombre: data.nombre,
            edad: data.edad,
            sangre: data.sangre
          });
          console.log(infoPatient);
        })
        .catch((error) => {
          console.error('Error obteniendo la información del paciente:', error);
        });
    };

    const fetchSignosVitales = () => {
      fetch('http://localhost:3000/signs')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSignosVitales({
            bpm: data.bmp,
            o2: data.o2,
            temp: data.temp
          });
        })
        .catch((error) => {
          console.error('Error obteniendo los signos vitales:', error);
        });
    };

    fetchInfoPatient();
 
    fetchSignosVitales();

    const intervalId = setInterval(fetchSignosVitales, 1000);

    return () => clearInterval(intervalId);
  }, []); 

  return (
    <>
      <header>
        <NotePad />
        <h1>Signos Vitales</h1>
      </header>

  
      <FichaMedica nombre={infoPatient.nombre} edad={infoPatient.edad} sangre={infoPatient.sangre} />
      <div className="signosvitales">
        <Medicion descripcion="Pulsaciones por Minuto" img="heartbeat.svg" medida={signosVitales.bpm} />
        <Medicion descripcion="Oxígeno en la Sangre" img="oxygen.png" medida={signosVitales.o2} />
        <Medicion descripcion="Temperatura Corporal" img="temp.svg" medida={signosVitales.temp} />
        <Medicion descripcion="na" img="temp.svg" medida={signosVitales.temp} />
        <Medicion descripcion="na" img="temp.svg" medida={signosVitales.temp} />
        <Medicion descripcion="na" img="temp.svg" medida={signosVitales.temp} />
      </div>
      </>
  );
}

export default Inicio;
