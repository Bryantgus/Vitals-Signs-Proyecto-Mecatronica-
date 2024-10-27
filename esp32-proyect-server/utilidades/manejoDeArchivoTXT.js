import fs from "fs";

function txtManagement(bpm, o2, temp) {
    
    const nombreArchivo = `Date-${new Date().toISOString().slice(0, 10)}.txt`
    const fechaDeSignos = `Date-${new Date().toISOString().slice(0, 10)}.txt`
    const addContent = `${fechaDeSignos}=>bpm:${bpm}_o2:${o2},temp:${temp}___`;
    fs.appendFile(nombreArchivo, addContent, (err) => {
    if (err) {
        console.error('Error al añadir el texto:', err);
        return;
    }
    console.log('Texto añadido con éxito.');
    });
}

export default txtManagement;