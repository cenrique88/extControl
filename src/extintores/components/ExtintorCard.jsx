import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../app/components/AppContext.jsx";

import "../styles/ExtintorCard.css";


const ExtintorCard = ({ extintor }) => {

  const { setSelectedPage, 
          setTargetForEdit, 
          targetForEdit, 
          setViewEditButton  } = useContext(AppContext);
  const navigate = useNavigate();


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

          <div className="extintor-footer">
            {/* {modoEdicion ? (
              <>
                <button className="cancelar" onClick={handleCancelar}>Cancelar</button>
                <button className="aceptar" onClick={handleGuardar}>Guardar</button>
              </>
            ) : (
              <>
                <button className="cancelar" onClick={() => onDelete(extintor._id)}>Eliminar</button>
                <button className="aceptar" onClick={() => setModoEdicion(true)}>Editar</button>
              </>
            )} */}
          </div>
        </>
      )}
    </div>
  );
};

export default ExtintorCard;
