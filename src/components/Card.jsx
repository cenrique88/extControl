
import './styles/card.css';
import {useState} from 'react';






const Card = ({props}) => {

  const [indicadorColor, SetIndicadorColor] = useState("indicador-ok");




    const {id_extintor, 
          ubicacion, 
          tipo_extintor,
          capacidad,
          recarga_cada,
          ultima_recarga,

        } = props;
    

    // funcion para obtener la fecha de vencimiento de un extintor
    const handleF_Vencimiento = (f_vencimiento, recarga_cada) => {
      const fv = new Date(f_vencimiento);
      const rc = parseInt(recarga_cada);
      const getTime= fv.setFullYear(fv.getFullYear()+  rc)     
      return `${new Date(getTime).getMonth()}/${new Date(getTime).getFullYear()%1000}`;
    }

    // funcion para obtener el tiempo restante para la proxima recarga de un extintor
    const handle_left_time = (f_vencimiento, recarga_cada) => {
      const fv = new Date(f_vencimiento);
      const rc = parseInt(recarga_cada);
      const getTime= fv.setFullYear(fv.getFullYear()+  rc)

      const hoy = Date.now(); 
      //console.log("Tiempo faltante: ", Math.floor((( getTime > hoy ? getTime - hoy : hoy - getTime) / (1000 * 60 * 60 * 24)) / 30 )  + " Meses")
      const left_time = Math.floor((( getTime - hoy ) / (1000 * 60 * 60 * 24)) / 30 );  

      if (left_time <= 0){
          return "Vencido"
          } else if (left_time > 0 && left_time < 3){
              return " - 3 Meses"
          }
          else if (left_time > 3){
              return " + 3 Meses"
          }
      }

      // funcion para obtener el color del indicador de los extintores
      const handleIndicadorColor = () => {
        const color =  handle_left_time(ultima_recarga, recarga_cada);
        if (color == "Vencido"){
          return ("indicador-vencido");
        } else if (color == " - 3 Meses") {
          return ("indicador-revisar");
        }
        else {
          return ("indicador-ok");
        }        
      }

      // funcion para obtener el valor del indicador de los extintores
      const handleIndicadorValor = () => {
        const color =  handle_left_time(ultima_recarga, recarga_cada);
        if (color == "Vencido"){
          return ("Vencido");
        } else if (color == " - 3 Meses") {
          return ("Revisar");
        }
        else {
          return ("ok");
        }        
      }



  return (
    <div className="card"> 

    <div className="id">
      <p>{id_extintor}</p>
    </div>

    <div className="indicador-container">
      <div className={handleIndicadorColor()}>
        {handleIndicadorValor()}
      </div>
    </div>

    <div className='ubicacion'>
      {ubicacion}
    </div>

    <div className='tipo'>
      Tipo: {tipo_extintor}
    </div>

    <div className='capacidad'>
      Cap: {capacidad}
    </div>

    <div className='recarga-cada'>
      R/Cada: {recarga_cada} Años
    </div>

    <div className='ultima-recarga'>
      U/Recarga: {new Date(ultima_recarga).getMonth()+1}/{new Date(ultima_recarga).getFullYear()%1000}
    </div>

    <div className='fecha-vencimiento'>
      F/Venc: {handleF_Vencimiento(ultima_recarga, recarga_cada)}
    </div>

    <div className='tiempo-faltante'>
      T/Falt: {handle_left_time(ultima_recarga, recarga_cada)}
    </div>   

    </div>
  )
}

export default Card

