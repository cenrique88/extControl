
import "../styles/Clientes.css";

import { useRef, useState, useEffect } from 'react';

const CardClient = ({ client, isOpen, onToggle, onClose }) => {
  const cardRef = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  const timeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && cardRef.current && !cardRef.current.contains(event.target)) {
        onClose(); // ⬅️ Cierra si tocás fuera
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
        <img src='/src/img/m-azul.png' alt="Logo cliente" />
        <p>{client.nombre_cliente}</p>
      </div>

      <div className="client-data">
        <p>{client.direccion_cliente}</p>
        <p>{client.telefono_cliente}</p>
      </div>

      {isOpen && (
        <div className="button-container">
          <button className="button1" title="Controles"></button>
          <button className="button2" title="Extintores"></button>
          <button className="button3" title="Informes"></button>
          <button className="button4" title="Incidencias"></button>
        </div>
      )}
    </div>
  );
};

export default CardClient;
