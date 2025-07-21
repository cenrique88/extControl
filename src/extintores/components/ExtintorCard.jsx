import { useState, useContext } from "react";
//import { useNavigate } from "react-router-dom";
import { AppContext } from "../../app/components/AppContext.jsx";

import "../styles/ExtintorCard.css";


const ExtintorCard = ({ extintor }) => {

  const { setTargetForEdit,
          setViewEditButton  } = useContext(AppContext);

  //const navigate = useNavigate();


  const [abierta, setAbierta] = useState(false);


  const openCloseCard = () => {
    setAbierta(!abierta);
    setViewEditButton(!abierta);
    setTargetForEdit(extintor); 
  }











  return (
    <div
      className={`extintor-card ${abierta ? "open" : "closed"}`}
      onClick={openCloseCard}
    >
      {!abierta ? (

        <div>
        <div className="header-closed">
            <h3>B04</h3>
            <h4>Pasillo Enfermería de Emergencia</h4>
        </div>

        <div className="extintor-info-closed">
            <div className="icon-background-closed">
                <img src="/src/img/extintor_card.png" alt="extintor" className="icon-extintor" />
            </div>

            <div className="extintor-title-closed">
                <p>Polvo ABC</p>
                <p>4Kg</p>
                <p>Vto. 09/2025</p>
            </div>

            <div className="extintor-status-closed">
                <h5>PRÓXIMO A VENCER</h5>
            </div>
        </div>
    </div>

      ) 
      : 
      (

        <div className="extintor-card">
        <div className="extintor-header">
            <div className="titulo-header">Emergencia Primer Piso</div>
            <div className="acciones">
                <button className="btn-header">
                    <img src="/src/img/edit.png" className="btn-icon" alt="Editar" title="Editar" />
                </button>
                <button className="btn-header">
                    <img src="/src/img/delete.png" className="btn-icon" alt="Eliminar" title="Eliminar" />
                </button>
            </div>
        </div>

        <div className="extintor-body">
            <div className="icono-extintor-container">
                <div className="fondo-icono">
                    <img src="/src/img/extintor_card.png" alt="extintor" className="icono-extintor" />
                    <div className="capacidad-inside">4Kg</div>
                </div>

                <div className="titulo-extintor">
                    <h4>Polvo ABC</h4>
                    <h5>Acero</h5>
                    <h5>Baja Presión</h5>
                    <h4>Vto. 09/2025</h4>
                </div>
            </div>
        </div>

        <div className="hr-container">
            <hr />
        </div>

        <div className="tabla-datos">
            <div className="row">
                <div className="celda-1"><strong>UBICACIÓN</strong><br /><b>Pasillo Enfermería de Emergencia</b></div>
            </div>

            <div className="row">
                <div className="celda celda-id">
                    <strong>ID</strong><br />
                    <b>B04</b>
                </div>
                <div className="celda celda-cliente">
                    <strong>CLIENTE</strong><br />
                    <b>Sanatorio Mautone</b>
                </div>
            </div>

            <div className="row">
                <div className="celda celda-2"><strong>RECARGA</strong><br /><b>09/2023</b></div>
                <div className="celda celda-3"><strong>SEÑALIZACIÓN</strong><br /><b>Buen Estado</b></div>
            </div>

            <div className="row">
                <div className="celda celda-2"><strong>TIEMPO</strong><br /><b>2 Años</b></div>
                <div className="celda celda-3"><strong>SOPORTE</strong><br /><b>Buen Estado</b></div>
            </div>

            <div className="estado-vencimiento">
                PRÓXIMO A VENCER
            </div>
        </div>
    </div>
        

      )}
    </div>
  );
};

export default ExtintorCard;





/**
 *  <div
      className={`extintor-card ${abierta ? "open" : "closed"}`}
      onClick={openCloseCard}
    >
      {!abierta ? (
        <>
          <img src="/icons/extintor.svg" alt="icono" />
          <p>{extintor.id_extintor}</p>
        </>
      ) 
      : 
      (
        <>
          <div className="extintor-header">
            <h3>Extintor {extintor.id_extintor}</h3>
          </div>

            <>
              <div className="extintor-form-grid">
                <div className="full-width">
                  <strong>Ubicación:</strong> {extintor.ubicacion}
                </div>
              </div>

              <div className="extintor-fila-id">
                <div><strong>ID:</strong> {extintor.id_extintor}</div>
                <div><strong>Cliente:</strong> {extintor.cliente}</div>
              </div>

              <div className="extintor-form-grid">
                <div><strong>Capacidad:</strong> {extintor.capacidad}</div>
                <div><strong>Tipo:</strong> {extintor.tipo_extintor}</div>
                <div><strong>Tiempo:</strong> {extintor.recarga_cada}</div>
                <div><strong>Recarga:</strong> {extintor.ultima_recarga}</div>
                <div><strong>Vencimiento:</strong> -</div>
                <div><strong>Extintor:</strong> {extintor.estado_extintor}</div>
                <div><strong>Señalización:</strong> {extintor.senial}</div>
                <div><strong>Soporte:</strong> {extintor.soporte}</div>
              </div>
            </>
        </>
      )}
    </div>
 */