
import "../styles/Clientes.css";
import { useRef, useState, useEffect, useContext } from 'react';

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

import { AppContext } from "../../app/components/AppContext";



const CardClient = ({ client, isOpen, onToggle, onClose, modoEliminar, seleccionado, onSeleccionar }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const {
    setViewEditButton,
    setTargetForEdit,
    setSelectedClient,
  } = useContext(AppContext);





  const cardRef = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  const timeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && cardRef.current && !cardRef.current.contains(event.target) && event.target.alt != 'Editar') {
        onClose();
        setViewEditButton(false);
        // Cierra si tocás fuera
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);



  const handleMouseDown = (e) => {
    timeRef.current = setTimeout(() => {
      setIsPressed(true);
    }, 1000);
    setViewEditButton(true);
    setSelectedClient(client.nombre_cliente);
  };


  const handleMouseUp = (e) => {
    clearTimeout(timeRef.current);

    if (!isPressed && e.target.localName !== "button") {
      onToggle(); // Alternar apertura
      if (isOpen) {
        setViewEditButton(false);
      }
    }
    setIsPressed(false);
  };








  return (
    <div
      ref={cardRef}
      tabIndex="0"
      className={`client-card ${isOpen ? "open" : ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={() => setTargetForEdit(client)}
    >
      {!isOpen ? (
        <div>
        <div className="header-closed">
          <div className="header-closed-id"><h4>{client.nombre_cliente}</h4></div>
          <div className="header-closed-ubicacion"><h3>{client.direccion_cliente}</h3></div>
        </div>

        <div className="client-info-closed">
            <div className="icon-background-closed">
                <img src="/src/img/extintor_card1.png" alt="cliente" className="icon-extintor" />
            </div>

            <div className="client-title-closed">
                <p>{client.nombre_cliente}</p>
            </div>

            <div className={`client-status-closed vigente`}>
                <h5>ACTIVO</h5>
            </div>
        </div>
    </div>

      )
      : 
      (

        <div className="client-card">
        <div className="client-header">
            <div className="titulo-header">{client.nombre_cliente}</div>
            <div className="acciones">
                <button className="btn-header">
                    <img src="/src/img/edit.png" className="btn-icon" alt="Editar" title="Editar" />
                </button>
                <button className="btn-header">
                    <img src="/src/img/delete.png" className="btn-icon" alt="Eliminar" title="Eliminar" />
                </button>
            </div>
        </div>

        <div className="client-body">
            <div className="icono-client-container">
                <div className="fondo-icono">
                    <img src="/src/img/extintor_card1.png" alt="cliente" className="icono-extintor" />
                    <div className="capacidad-inside">Cliente</div>
                </div>

                <div className="titulo-client">
                    <h4>{client.direccion_cliente}</h4>
                    <h5>{client.telefono_cliente}</h5>
                    <h4>{client.email_cliente || "Sin email"}</h4>
                </div>
            </div>
        </div>

        <div className="hr-container">
            <hr />
        </div>

        <div className="tabla-datos">
            <div className="row">
              <div className="celda celda-1"><strong>CLIENTE</strong><br /><b>{client.nombre_cliente}</b></div>
            </div>

            <div className="row">
                <div className="celda celda-id">
                    <strong>TELÉFONO</strong><br />
                    <b>{client.telefono_cliente}</b>
                </div>
                <div className="celda celda-cliente">
                    <strong>CLIENTE</strong><br />
                    <b>{client.nombre_cliente}</b>
                </div>
            </div>

            <div className="row">
                <div className="celda celda-2"><strong>DIRECCIÓN</strong><br /><b>{client.direccion_cliente}</b></div>
                <div className="celda celda-3"><strong>DIRECCIÓN</strong><br /><b>{client.direccion_cliente}</b></div>
            </div>

            <div className="row">
                <div className="celda celda-2"><strong>EMAIL</strong><br /><b>{client.email_cliente || "No disponible"}</b></div>
                <div className="celda celda-3"><strong>EMAIL</strong><br /><b>{client.email_cliente || "No disponible"}</b></div>
            </div>

            <div className="estado-vencimiento vigente">
                <p>Vigente</p>
            </div>
        </div>
    </div>
        

      )}
    </div>
  );
};

export default CardClient;

