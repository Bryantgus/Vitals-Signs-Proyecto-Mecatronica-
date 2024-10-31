import "./Medicion.css"
function Medicion(props) {
    return <div className="cuadromedicion">
        <span className="descripcion">{props.descripcion}</span>
        <div className="info">
        <img src={props.img} alt="Imagen De Signo Vital" />
        <span className="medida">{props.medida}</span>
        </div>
    </div>
}

export default Medicion;