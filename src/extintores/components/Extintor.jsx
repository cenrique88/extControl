import "../styles/Extintor.css";
import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

import FormExtintor from "./FormExtintor";
import useDataBase from "../../hooks/useDataBase";
import ExtintorCard from "./ExtintorCard";
import Notify from "../../app/components/Notify";
import AppContext from "../../app/components/AppContext";
import useDate from "../../hooks/useDate";

const Extintor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showAddExt, setShowAddExt] = useState(false);
  const [getDataExtintor, setDataExtintor] = useState([]);
  const [showNotify, setShowNotify] = useState(false);
  const [msgNotify, setMsgNotify] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");

  const { setSelectedPage, selectedClient } = useContext(AppContext);
  const fv = useDate();
  const { writeDB, getDB, deleteDB } = useDataBase();

  const itemRefs = useRef([]); // 🔹 Para guardar las refs de cada tarjeta

  const openModalAddExtintor = (prop) => {
    document.getElementById('add-button-ext').style.visibility = prop ? "hidden" : "visible";
    setShowAddExt(prop);
  };

  const onCloseNotify = () => {
    setShowNotify(false);
  };

  useEffect(() => {
    setSelectedPage(location.pathname === '/extintores' ? 'Extintores' : '');
    getAllExtintor();
  }, []);

  const getAllExtintor = async () => {
    const data = await getDB("extintores");
    if (data) {
      setDataExtintor(data);
    }
  };

  const saveExtintor = async (data_ext) => {
    await writeDB("extintores", data_ext);
    getAllExtintor();
    setMsgNotify("Extintor guardado");
    setShowNotify(true);
    setShowAddExt(false);
  };

  const deleteExtintor = async (id) => {
    const alerta = confirm("Está eliminando un extintor, ¿desea continuar?");
    if (alerta) {
      const response = await deleteDB("extintores", id);
      if (response) {
        getAllExtintor();
        setMsgNotify("Extintor eliminado");
        setShowNotify(true);
      }
    }
  };

  const editExtintor = (id, data) => {
    console.log("edit", id);
  };

  const handleF_Vencimiento = (ultima_recarga, recarga_cada) => {
    const fv = new Date(ultima_recarga);
    const rc = parseInt(recarga_cada);
    if (isNaN(rc)) return "-";
    fv.setFullYear(fv.getFullYear() + rc);
    return `${(fv.getMonth() + 1).toString().padStart(2, '0')}/${fv.getFullYear()}`;
  };

  const extintoresFiltrados = getDataExtintor.filter(ext =>
    ext.nombre_cliente?.toLowerCase().includes(filtroNombre.toLowerCase())
  );

  // 🔹 Efecto visual durante el scroll
  useEffect(() => {
    const scrollContainer = document.querySelector(".scroll-list__wrp");

    const handleScroll = () => {
      itemRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const containerHeight = scrollContainer.clientHeight;

        const visible = rect.top >= 0 && rect.bottom <= containerHeight + rect.height;

        el.style.opacity = visible ? "1" : "0.5";
        el.style.transform = visible ? "scale(1)" : "scale(0.95)";
      });
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll(); // Ejecutar al cargar
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [getDataExtintor]);

  return (
    <div className="extintor-container">
      <div className="contenido-extintores">
        {/* Buscador */}
        <div className="buscador-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Buscar por nombre..."
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
        </div>

        {/* Formulario agregar */}
        {showAddExt && (
          <FormExtintor getDB={getDB} saveExtintor={saveExtintor} />
        )}

        {/* Scroll de tarjetas con animación */}
        <div className="scroll-list__wrp">
          {extintoresFiltrados.map((ext, index) => (
            <div
              key={ext._id}
              ref={(el) => (itemRefs.current[index] = el)}
              className="scroll-item"
            >
              <ExtintorCard
                extintor={ext}
                deleteExtintor={deleteExtintor}
                editExtintor={editExtintor}
                handleF_Vencimiento={handleF_Vencimiento}
              />
            </div>
          ))}
        </div>

        {/* Notificación y pie */}
        <Notify msg={msgNotify} open={showNotify} close={onCloseNotify} />
        <div className="footer-select">
          Aquí se implementará la selección de extintores por letras
        </div>
      </div>
    </div>
  );
};

export default Extintor;
