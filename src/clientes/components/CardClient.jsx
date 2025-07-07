
import "../styles/Clientes.css";
import { useRef, useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";



const CardClient = ({ client, isOpen, onToggle, onClose, modoEliminar, seleccionado, onSeleccionar }) => {

  const navigate = useNavigate();
  const location = useLocation();




  const cardRef = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  const timeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && cardRef.current && !cardRef.current.contains(event.target)) {
        onClose(); // Cierra si tocás fuera
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
      console.log("presionado largo");
    }, 1000);
  };

  const handleMouseUp = (e) => {
    clearTimeout(timeRef.current);

    if (!isPressed && e.target.localName !== "button") {
      onToggle(); // Alternar apertura
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
    >
      <div className="client-info">
        {modoEliminar && !isOpen && (
          <input
            type="checkbox"
            className="card-checkbox"
            checked={seleccionado}
            onChange={onSeleccionar}
          />
        )}
        <img src='/src/img/m-azul.png' alt="Logo cliente" />
        <p>{client.nombre_cliente}</p>
      </div>

      <div className="client-data">
        <p>{client.direccion_cliente}</p>
        <p>{client.telefono_cliente}</p>
      </div>

      {isOpen && (
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
      )}
    </div>
  );
};

export default CardClient;

