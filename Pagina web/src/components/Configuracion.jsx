import React, { useState, useEffect } from "react";
import "./Configuracion.css";

function Configuracion() {
  // Estado para la información del paciente, inicialmente indefinido
  const [infopatients, setinfopatients] = useState({
    nombre: undefined,
    sexo: undefined,
    edad: undefined,
    sangre: undefined
  });

  // Estado separado para los números de emergencia
  const [emergencyContacts, setEmergencyContacts] = useState({
    1: "",
    2: "",
    3: "",
    4: ""
  });

  // Estado para controlar la acción de guardar
  const [isSaving, setIsSaving] = useState(false);

  // useEffect para cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://vitalsigns.onrender.com/infopatient");
        const data = await response.json();
        if (data.length > 0) {
          const patient = data[0];
          setinfopatients({
            nombre: patient.nombre,
            sexo: patient.sexo,
            edad: patient.edad,
            sangre: patient.sangre
          });
        }

        const responseEmergencia = await fetch("https://vitalsigns.onrender.com/emergencianum");
        const dataEmergencia = await responseEmergencia.json();
        if (dataEmergencia.length > 0) {
          const contacts = dataEmergencia[0];
          setEmergencyContacts({
            1: contacts.num1,
            2: contacts.num2,
            3: contacts.num3,
            4: contacts.num4
          });
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect para guardar los datos cuando se presiona el botón
  useEffect(() => {
    const saveData = async () => {
      if (isSaving) {
        try {
          // Enviar la información del paciente con POST
          await fetch(`https://vitalsigns.onrender.com/changeinfopatient/1/${infopatients.nombre}/${infopatients.sexo}/${infopatients.edad}/${infopatients.sangre}`, {
            method: 'POST',
          });

          // Enviar los números de emergencia con POST
          await fetch(`https://vitalsigns.onrender.com/changeemergencianum/1/${emergencyContacts[1]}/${emergencyContacts[2]}/${emergencyContacts[3]}/${emergencyContacts[4]}`, {
            method: 'POST',
          });

          console.log("Datos guardados exitosamente");
        } catch (error) {
          console.error("Error al guardar los datos:", error);
        } finally {
          setIsSaving(false); // Reinicia el estado de guardado
        }
      }
    };

    saveData();
  }, [isSaving]); // Se activa cuando isSaving cambia a true

  const handleSave = () => {
    setIsSaving(true); // Activa el guardado
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
              value={infopatients.nombre || ""}
              onChange={(e) => setinfopatients({ ...infopatients, nombre: e.target.value })}
            />
            
            <span>Sexo</span>
            <input
              type="text"
              className="small"
              name="sexo"
              value={infopatients.sexo || ""}
              onChange={(e) => setinfopatients({ ...infopatients, sexo: e.target.value })}
            />
            
            <span>Edad</span>
            <input
              type="text"
              className="small"
              name="edad"
              value={infopatients.edad || ""}
              onChange={(e) => setinfopatients({ ...infopatients, edad: e.target.value })}
            />
            
            <span>Tipo de Sangre</span>
            <input
              type="text"
              className="small"
              name="sangre"
              value={infopatients.sangre || ""}
              onChange={(e) => setinfopatients({ ...infopatients, sangre: e.target.value })}
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
                value={emergencyContacts[key] || ""}
                onChange={(e) => setEmergencyContacts({ ...emergencyContacts, [key]: e.target.value })}
              />
            ))}
          </div>
        </div>
      </div>
      <button className="button-19" onClick={handleSave}>
        Guardar Información
      </button>
    </>
  );
}

export default Configuracion;
