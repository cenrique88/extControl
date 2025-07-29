
import "../styles/CardClient.css";
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
    className={`client-card ${isOpen ? "open" : "closed"}`}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    onClick={()=>setTargetForEdit(client)}
  >
    {!isOpen ? (
      <div>
        <div className="header-closed-client">
          <div className="header-closed-nombre"><h3>{client.nombre_cliente}</h3></div>
        </div>

        <div className="client-info-closed">
          <div className="icon-background-closed">
            <img src="/src/img/extintor_card1.png" alt="cliente" className="icon-extintor" />
          </div>

          <div className="client-title-closed">
            <p>Info</p>
          </div>

          <div className={`client-status-closed vigente`}>
            <h5>INFORMACIÓN</h5>
          </div>
        </div>
      </div>
    ) : (
      <>
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
              <img src="/src/img/extintor_3D.png" alt="cliente" className="icono-extintor-client" />
            </div>
            <div className="fondo-icono">
              <img src="/src/img/smoke_3DG.png" alt="cliente" className="icono-smoke" />
            </div>
          </div>
        </div>

        <div className="hr-container">
          <hr />
        </div>

        <div className="tabla-datos-client">
          <div className="row">
            <div className="celda celda-1"><strong>DIRECCIÓN</strong><br /><b>{client.direccion_cliente || "Av. Franklin Delano Roosevelt 20000 Maldonado, Departamento de Maldonado"}</b></div>
          </div>

          <div className="row">
            <div className="celda celda-1"><strong>EMAIL</strong><br /><b>{client.email_cliente || "marcosbritos@gmail.com"}</b></div>
          </div>

          <div className="row">
            <div className="celda celda-4"><strong>RAZÓN SOCIAL</strong><br /><b>{client.nombr_juridico || "CRAME IAMPP"}</b></div>
            <div className="celda celda-5"><strong>TELEFONO 1</strong><br /><b>{client.telefonos_cliente || "4222 5353"}</b></div>
          </div>

          <div className="row">
            <div className="celda celda-4"><strong>TELEFONO 2</strong><br /><b>{client.telefonos_cliente || "094 459 267"}</b></div>
            <div className="celda celda-5"><strong>TELEFONO 3</strong><br /><b>{client.telefonos_cliente || "091 766 462"}</b></div>
          </div>
        </div>

        <div className="button-container">
          <button
            className="button1"
            title="Iniciar Inspección"
            onClick={() => navigate('/inspecciones')}
          ></button>
          <button
            className="button2"
            title="Extintores"
            onClick={() => navigate('/extintores')}
          ></button>
          <button
            className="button3"
            title="Incidencias"
            onClick={() => navigate('/incidencias')}
          ></button>
          <button
            className="button4"
            title="Informes"
            onClick={() => navigate('/informes')}
          ></button>
        </div>
      </>
    )}
  </div>
);
};

export default CardClient;