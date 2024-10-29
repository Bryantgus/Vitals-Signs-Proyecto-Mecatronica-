import express from 'express';
import cors from "cors";
import txtManagement from './utilidades/manejoDeArchivoTXT.js';  
const app = express();
const port = 3000;
const host = '0.0.0.0';

var data = {
  bpm: 'off',
  o2: 'off',
  temp: 'off',
}

var infoPatient = {
  nombre: undefined,
  edad: undefined,
  sangre: undefined
}


app.use(cors({
    origin: 'http://localhost:5173' 
}));

//endopoint para obtener los signos
app.get('/signs', (req, res) => {
 const date = new Date();
 const responseData = {
    bmp: data.bpm,
    o2: data.o2,
    temp: data.temp,
    date: date
 }
 res.json(responseData);
});


//endpoint para obtener la informacion del paciente
app.get('/infoPatient', (req,res) => {
  res.json(infoPatient);
});


//endpoint para cambiar la informacion del paciente
app.post('/changeInfoPatient/:nombre/:edad/:sangre', (req, res) => {
  infoPatient = {
    nombre: req.params.nombre,
    edad: req.params.edad,
    sangre: req.params.sangre
  }
  res.json(infoPatient);
});
//endpoint que usara el esp32 para mandar la informacion a la api
app.post('/sendsigns/:bpm/:o2/:temp', (req, res) => {
  const date = new Date();
  data.bpm = req.params.bpm;
  data.o2 = req.params.o2;
  data.temp = req.params.temp;
  res.json(data);
  const datos = req;
  txtManagement(req.params.bpm, req.params.o2, req.params.temp);
  
});

app.listen(port, host, () => {
  console.log(`Servidor escuchando en http://${host}:${port}`);
});
