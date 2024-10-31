import SpanDatos from "./SpanDatos";
import "./FichaMedica.css";
import Patient from "./assets/Patient_svg";
import Age from "./assets/Age_svg";
import Blood from "./assets/blood_svg";

function FichaMedica(props) {

    return (
        <div className="recuadro">
            <div className="fichamedica">
                <div className="subfichamedica">
                <Patient />
                <SpanDatos datos={props.nombre}/>
                </div>
                <div className="subfichamedica">
                <Age />
                <SpanDatos datos={props.edad}/>
                </div>
                <div className="subfichamedica">
                <Blood />
                <SpanDatos style={{color: "red"}} datos={props.sangre}/>
                </div>
            </div>
        </div>
    )       
    
}

export default FichaMedica;