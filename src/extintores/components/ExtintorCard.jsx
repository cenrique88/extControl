import { useState } from 'react';
import "../styles/Extintores.css";

const ExtintorCard = ({ extintor, editExtintor, deleteExtintor, handleF_Vencimiento }) => {
  const [openExt, setOpenExt] = useState("ext-card");

  const onTap = () => {
    setOpenExt(openExt === "ext-card" ? "ext-card-open" : "ext-card");
  };

  return (
    <div
      tabIndex={0}
      className={openExt}
      onBlur={() => setOpenExt("ext-card")}
      onClick={() => (openExt === "ext-card-open" ? setOpenExt("ext-card") : '')}
    >
      <img
        className="logo-ext-card"
        src="src/img/m-azul.png"
        onClick={onTap}
        alt="Logo"
      />

      <h1 className="ext-id" onClick={onTap}>
        {extintor.id_extintor}
      </h1>

      <div id="edit-ext-img">
        <img
          className="button-img-ext"
          src="/src/img/edit-3.png"
          onClick={() => editExtintor(extintor.id_extintor, "")}
          alt="Editar"
        />
      </div>

      <img
        id="del-ext-img"
        className="button-img-ext"
        src="/src/img/eliminar.png"
        onClick={() => deleteExtintor(extintor.id_extintor)}
        alt="Eliminar"
      />

      <div className="ext-card-is-open">
        <p><strong>ID:</strong> {extintor.id_extintor}</p>
        <p><strong>Cliente:</strong> {extintor.cliente}</p>
        <p><strong>Ubicación:</strong> {extintor.ubicacion}</p>
        <p><strong>Tipo:</strong> {extintor.tipo_extintor}</p>
        <p><strong>Capacidad:</strong> {extintor.capacidad}</p>
        <p><strong>Recarga:</strong> {extintor.recarga}</p>
        <p><strong>Tiempo:</strong> {extintor.tiempo}</p>
        <p><strong>Última Recarga:</strong> {new Date(extintor.ultima_recarga).getMonth() + 1}/{new Date(extintor.ultima_recarga).getFullYear()}</p>
        <p><strong>Vencimiento:</strong> {handleF_Vencimiento(extintor.ultima_recarga, extintor.recarga_cada)}</p>
        <p><strong>Estado Extintor:</strong> {extintor.estado_extintor}</p>
        <p><strong>Señalización:</strong> {extintor.senalizacion}</p>
        <p><strong>Soporte/Nicho:</strong> {extintor.soporte}</p>
        <p><strong>Fecha Inspección:</strong> {extintor.fecha_inspeccion}</p>
        <p><strong>Observaciones:</strong> {extintor.observaciones}</p>
      </div>
    </div>
  );
};

export default ExtintorCard;

