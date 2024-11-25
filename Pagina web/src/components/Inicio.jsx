import { useState, useEffect } from "react";
import FichaMedica from "./fichaMedica";
import NotePad from "./assets/NotePad_svg";
import Medicion from "./Medicion";
import "./Inicio.css";
import './App.css';



function Inicio() {
  const [infoPatient, setInfoPatient] = useState({
    id: "id",
    sexo: "sexo",
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
      fetch('https://vitalsigns.onrender.com/infoPatient')
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const patient = data[0];  // Extrae el primer objeto del array
            setInfoPatient({
              id: patient.id,
              nombre: patient.nombre,
              sexo: patient.sexo,
              edad: patient.edad,
              sangre: patient.sangre
            });
          }
        })
        .catch((error) => {
          console.error('Error obteniendo la información del paciente:', error);
        });
    };
    
    const fetchSignosVitales = () => {
      fetch('https://vitalsigns.onrender.com/signs')
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
        <Medicion descripcion="Glucosa" img="sangre1.png" medida="off" />
        <Medicion descripcion="Co2 exalado" img="co2.svg" medida="off" />
        
      </div>
      </>
  );
}

export default Inicio;
