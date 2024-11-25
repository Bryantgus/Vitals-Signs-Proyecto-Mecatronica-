import React, { useState } from "react";
import "./Configuracion.css";

function Configuracion() {
  // Estado para la información del paciente
  const [infopatients, setinfopatients] = useState({
    nombre: "Bryant Tejeda Florimon",
    sexo: "F",
    edad: "23",
    sangre: "O+"
  });

  // Estado separado para los números de emergencia
  const [emergencyContacts, setEmergencyContacts] = useState({
    1: "8091234567",
    2: "8291234567",
    3: "8491234567",
    4: "8097654321"
  });

  // Función para manejar cambios en la información del paciente
  const handleChange = (e) => {
    const { name, value } = e.target;
    setinfopatients((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función para manejar cambios en los números de emergencia
  const handleEmergencyChange = (e, index) => {
    const { value } = e.target;
    setEmergencyContacts((prevState) => ({
      ...prevState,
      [index]: value
    }));
  };

  return (
    <>
      <div className="mainconfig">
        <div className="divconfig">
          <div className="h1">
            <h1>Configurar Información</h1>
          </div>
          <div className="infopatientconfig">
            <span>Nombre</span>
            <input
              type="text"
              className="normal"
              name="nombre"
              value={infopatients.nombre}
              onChange={handleChange}
            />
            
            <span>Sexo</span>
            <input
              type="text"
              className="small"
              name="sexo"
              value={infopatients.sexo}
              onChange={handleChange}
            />
            
            <span>Edad</span>
            <input
              type="text"
              className="small"
              name="edad"
              value={infopatients.edad}
              onChange={handleChange}
            />
            
            <span>Tipo de Sangre</span>
            <input
              type="text"
              className="small"
              name="sangre"
              value={infopatients.sangre}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="divconfig">
          <div className="h1">
            <h1>Contactos de Emergencia</h1>
          </div>
          <div className="tel">
            {Object.keys(emergencyContacts).map((key) => (
              <input
                key={key}
                type="tel"
                value={emergencyContacts[key]}
                onChange={(e) => handleEmergencyChange(e, key)}
              />
            ))}
          </div>
        </div>
      </div>
      <button>Guardar Información</button>
    </>
  );
}

export default Configuracion;
