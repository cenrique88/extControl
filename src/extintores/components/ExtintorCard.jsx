import { useState, useContext, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { AppContext } from "../../app/components/AppContext.jsx";

import "../styles/ExtintorCard.css";


const ExtintorCard = ({ extintor, deleteFx, editFx}) => {

  const { setTargetForEdit,
          setViewEditButton  } = useContext(AppContext);

  //const navigate = useNavigate();

  const [abierta, setAbierta] = useState(false);
  const [fVencimiento, setFVencimiento]= useState();
  const [timeLeft, setTimeLeft] = useState();
  const [textTimeLeft, setTextTimeLeft] = useState('VIGENTE');




  useEffect(() => {
    setFVencimiento(handleF_Vencimiento(extintor.fecha_recarga, extintor.recarga_cada));
    handleTimeLeft();
    
  }, [])
  




  const openCloseCard = () => {
    setAbierta(!abierta);
    setViewEditButton(!abierta);
    setTargetForEdit(extintor); 
  }

  const fecha_recarga = Object(extintor.fecha_recarga);
  const recarga_cada = Object(extintor.recarga_cada);

const handleF_Vencimiento = (fecha_recarga, recarga_cada) => {
      const fv = new Date(fecha_recarga);
      const rc = parseInt(recarga_cada);
      const getTime= fv.setFullYear(fv.getFullYear()+  rc)     
      return `${new Date(getTime).getMonth()+1}/${new Date(getTime).getFullYear()%1000}`;
    };

const handleTimeLeft = () => {
  const fv = new Date(fecha_recarga);
  const rc = parseInt(recarga_cada);
  const getTime= fv.setFullYear(fv.getFullYear()+  rc)

  const today = new Date();
  const threeMonth = new Date(getTime);
  threeMonth.setMonth(threeMonth.getMonth() - 3);

  if(today >= threeMonth && today < new Date(getTime)){
    setTimeLeft('proximo')
    setTextTimeLeft('PRÓXIMO A VENCER')
  } else if(today >= new Date(getTime)){
    setTimeLeft('vencido')
    setTextTimeLeft('VENCIDO')
  };
}





  return (
    <div
      className={`extintor-card ${abierta ? "open" : "closed"}`}
      onClick={openCloseCard}
    >
      {!abierta ? (

        <div>
        <div className="header-closed">
          <div className="header-closed-id"><h4>{extintor.id_extintor}</h4></div> 
          <div className="header-closed-ubicacion"><h3>{extintor.ubicacion}</h3></div>
        </div>

        <div className="extintor-info-closed">
            <div className="icon-background-closed">
                <img src="/src/img/extintor_card.png" alt="extintor" className="icon-extintor" />
            </div>

            <div className="extintor-title-closed">
                <p>{extintor.tipo_extintor}</p>
                <p>{extintor.capacidad}</p>
                <p>Vto. {fVencimiento}</p>
            </div>

            <div className={`extintor-status-closed ${timeLeft}`}>
                <h5>{textTimeLeft}</h5>
            </div>
        </div>
    </div>

      ) 
      : 
      (

        <div className="extintor-card">
        <div className="extintor-header">
            <div className="titulo-header">{extintor.ubicacion}</div>
            <div className="acciones">
                <button 
                  className="btn-header"
                  onClick={()=>editFx(extintor.id_extintor)}
                  >
                    <img src="/src/img/edit.png" className="btn-icon" alt="Editar" title="Editar" />
                </button>
                <button 
                  className="btn-header"
                  onClick={()=>deleteFx(extintor.id_extintor)}
                  >
                    <img src="/src/img/delete.png" className="btn-icon" alt="Eliminar" title="Eliminar" />
                </button>
            </div>
        </div>

        <div className="extintor-body">
            <div className="icono-extintor-container">
                <div className="fondo-icono">
                    <img src="/src/img/extintor_card1.png" alt="extintor" className="icono-extintor" />
                    <div className="capacidad-inside">{extintor.capacidad}</div>
                </div>

                <div className="titulo-extintor">
                    <h4>{extintor.tipo_extintor}</h4>
                    <h5>{extintor.material}</h5>
                    <h5>{extintor.estado_extintor}</h5>
                    <h4>Vto. {fVencimiento}</h4>
                </div>
            </div>
        </div>

        <div className="hr-container">
            <hr />
        </div>

        <div className="tabla-datos">
            <div className="row">
                <div className="celda-1"><strong>UBICACIÓN</strong><br /><b>{extintor.ubicacion}</b></div>
            </div>

            <div className="row">
                <div className="celda celda-id">
                    <strong>ID</strong><br />
                    <b>{extintor.id_extintor}</b>
                </div>
                <div className="celda celda-cliente">
                    <strong>CLIENTE</strong><br />
                    <b>{extintor.cliente}</b>
                </div>
            </div>

            <div className="row">
                <div className="celda celda-2"><strong>RECARGA</strong><br /><b>{extintor.fecha_recarga}</b></div>
                <div className="celda celda-3"><strong>SEÑALIZACIÓN</strong><br /><b>{extintor.senalizacion}</b></div>
            </div>

            <div className="row">
                <div className="celda celda-2"><strong>TIEMPO</strong><br /><b>{extintor.recarga_cada} Años</b></div>
                <div className="celda celda-3"><strong>SOPORTE</strong><br /><b>{extintor.soporte_nicho}</b></div>
            </div>

            <div className={`extintor-status-open ${timeLeft}`}>
                {textTimeLeft}
            </div>
        </div>
    </div>
        

      )}
    </div>
  );
};

export default ExtintorCard;

