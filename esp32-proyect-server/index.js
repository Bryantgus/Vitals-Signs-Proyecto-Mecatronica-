import express from 'express';
import cors from "cors";
import txtManagement from './utilidades/manejoDeArchivoTXT.js';  
const app = express();
const port = 3000;
const host = '192.168.1.62';

var data = {
  bpm: 'off',
  o2: 'off',
  temp: 'off',
}


app.use(cors({
    origin: 'http://localhost:5173' 
}));


app.get('/', (req, res) => {
 
 const date = new Date();
 const responseData = {
    bmp: data.bpm,
    o2: data.o2,
    temp: data.temp,
    date: date
 }
 
 res.json(responseData);

});

app.post('/:bpm/:o2/:temp', (req, res) => {
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
