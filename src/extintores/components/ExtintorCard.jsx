import "../styles/ExtintorCard.css";
import { useRef, useState, useEffect, useContext } from 'react';
import { AppContext } from "../../app/components/AppContext";

const CardExtintor = ({
  extintor,
  isOpen,
  onToggle,
  onClose,
  modoEliminar,
  seleccionado,
  onSeleccionar
}) => {
  const { setViewEditButton, setTargetForEdit } = useContext(AppContext);

  const cardRef = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  const timeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && cardRef.current && !cardRef.current.contains(event.target) && event.target.alt !== 'Editar') {
        onClose();
        setViewEditButton(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleMouseDown = () => {
    timeRef.current = setTimeout(() => setIsPressed(true), 1000);
    setViewEditButton(true);
  };

  const handleMouseUp = (e) => {
    clearTimeout(timeRef.current);
    if (!isPressed && e.target.localName !== "button") {
      onToggle();
      if (isOpen) setViewEditButton(false);
    }
    setIsPressed(false);
  };

  return (
    <div
      ref={cardRef}
      tabIndex="0"
      className={`extintor-card ${isOpen ? "open" : "closed"}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={() => setTargetForEdit(extintor)}
    >
      <div className="extintor-info">
        {modoEliminar && !isOpen && (
          <input
            type="checkbox"
            className="card-checkbox-derecha"
            checked={seleccionado}
            onChange={onSeleccionar}
          />
        )}
        <img src='/src/img/extintor.png' alt="Logo extintor" />
        <p>ID: {extintor.id_extintor}</p>
      </div>

      <div className="extintor-data">
        <p>{extintor.cliente}</p>
        <p>{extintor.ubicacion}</p>
      </div>

      {isOpen && (
        <div className="ext-info-expandida">
          <p><strong>Tipo:</strong> {extintor.tipo_extintor}</p>
          <p><strong>Capacidad:</strong> {extintor.capacidad}</p>
          <p><strong>Recarga:</strong> {extintor.recarga}</p>
          <p><strong>Tiempo:</strong> {extintor.tiempo}</p>
          <p><strong>Vencimiento:</strong> {extintor.vencimiento}</p>
          <p><strong>Estado:</strong> {extintor.estado_extintor}</p>
          <p><strong>Señalización:</strong> {extintor.senalizacion}</p>
          <p><strong>Soporte/Nicho:</strong> {extintor.soporte}</p>
          <p><strong>Fecha Inspección:</strong> {extintor.fecha_inspeccion}</p>
          <p><strong>Observaciones:</strong> {extintor.observaciones}</p>
        </div>
      )}
    </div>
  );
};

export default CardExtintor;
