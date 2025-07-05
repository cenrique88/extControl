
import "./styles/Clientes.css";
import { useState, useRef } from 'react';

const CardClient = ({ client }) => {
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const timeRef = useRef(null);

  const handleMouseDown = (e) => {
    timeRef.current = setTimeout(() => {
      setIsPressed(true);
      console.log("presionado largo");
    }, 1000);
  };

  const handleMouseUp = (e) => {
    clearTimeout(timeRef.current);

    if (!isPressed && e.target.localName !== "button") {
      setIsOpenCard(!isOpenCard);
      const addBtn = document.getElementById('add-button');
      if (addBtn) {
        addBtn.style.visibility = isOpenCard ? "visible" : "hidden";
      }
    }

    setIsPressed(false);
  };

  return (
    <div
      tabIndex="0"
      className={`client-card ${isOpenCard ? "open" : ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <img src="/src/img/m-azul.png" alt="Logo cliente" />
      <p>{client.nombre_cliente}</p>

      {isOpenCard && (
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


