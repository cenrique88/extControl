import "../styles/Extintor.css";
import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

import FormExtintor from "./FormExtintor";
import ExtintorCard from "./ExtintorCard"; // 🔁 NUEVA TARJETA COMPATIBLE
import Notify from "../../app/components/Notify";
import AppContext from "../../app/components/AppContext";
import useDataBase from "../../hooks/useDataBase";
import useDate from "../../hooks/useDate";
import useNavbarAction from "../../hooks/useNavbarAction"; // ✅ reutilizamos lógica

const Extintor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { getDB, writeDB, deleteDB } = useDataBase();
  const fv = useDate();

  const {
    setSelectedPage,
    modoEliminar,
    setModoEliminar,
    elementSeleccionados,
    setElementSeleccionados
  } = useContext(AppContext);

  const { handleDeleteSelected, toggleElementSelected } = useNavbarAction();

  const [showAddExt, setShowAddExt] = useState(false);
  const [getDataExtintor, setDataExtintor] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [showNotify, setShowNotify] = useState(false);
  const [msgNotify, setMsgNotify] = useState("");
  const [openExtId, setOpenExtId] = useState(null);

  const itemRefs = useRef([]);

  useEffect(() => {
    setSelectedPage(location.pathname === '/extintores' ? 'Extintores' : '');
    getAllExtintores();
  }, [showAddExt]);

  const getAllExtintores = async () => {
    const data = await getDB("extintores");
    if (data) setDataExtintor(data);
  };

  const saveExtintor = async (data_ext) => {
    await writeDB("extintores", data_ext);
    getAllExtintores();
    setMsgNotify("Extintor guardado");
    setShowNotify(true);
    setShowAddExt(false);
  };

  const deleteExtintorDirecto = async (id) => {
    const alerta = confirm("Está eliminando un extintor, ¿desea continuar?");
    if (alerta) {
      const res = await deleteDB("extintores", id);
      if (res) {
        getAllExtintores();
        setMsgNotify("Extintor eliminado");
        setShowNotify(true);
      }
    }
  };

  const handleDeleteExtintores = () => {
    handleDeleteSelected(elementSeleccionados, "¿Desea eliminar los extintores seleccionados?");
    getAllExtintores();
  };

  const handleF_Vencimiento = (ultima_recarga, recarga_cada) => {
    const fv = new Date(ultima_recarga);
    const rc = parseInt(recarga_cada);
    if (isNaN(rc)) return "-";
    fv.setFullYear(fv.getFullYear() + rc);
    return `${(fv.getMonth() + 1).toString().padStart(2, '0')}/${fv.getFullYear()}`;
  };

  const extintoresFiltrados = getDataExtintor.filter(ext =>
    ext.cliente?.toLowerCase().includes(filtroNombre.toLowerCase())
  );

  // 🔹 Animación scroll
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
      handleScroll();
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
        {/* 🔍 Buscador */}
        <div className="search-wrapper">
  <input
    className="input-search"
    type="text"
    placeholder="Buscar por cliente..."
    value={filtroNombre}
    onChange={(e) => setFiltroNombre(e.target.value)}
  />
</div>


        {/* ➕ Formulario */}
        {showAddExt && (
          <FormExtintor getDB={getDB} saveExtintor={saveExtintor} />
        )}

        {/* 🧾 Lista scrollable */}
        <div className="scroll-list__wrp">
          {extintoresFiltrados.map((ext, index) => (
            <div
              key={ext._id}
              ref={(el) => (itemRefs.current[index] = el)}
              className="scroll-item"
            >
              <ExtintorCard
                extintor={ext}
                isOpen={openExtId === ext._id}
                onToggle={() => setOpenExtId(prev => (prev === ext._id ? null : ext._id))}
                onClose={() => setOpenExtId(null)}
                modoEliminar={modoEliminar}
                seleccionado={elementSeleccionados.includes(ext.id_extintor)}
                onSeleccionar={() => toggleElementSelected(ext.id_extintor)}
              />
            </div>
          ))}
        </div>

        {/* ✅ Botón de eliminar múltiples */}
        {modoEliminar && elementSeleccionados.length > 0 && (
          <button className="btn-eliminar-multiple" onClick={handleDeleteExtintores}>
            Eliminar seleccionados
          </button>
        )}

        {/* ✅ Notificación */}
        <Notify msg={msgNotify} open={showNotify} close={() => setShowNotify(false)} />

        <div className="footer-select">
          Aquí se implementará la selección de extintores por letras
        </div>
      </div>
    </div>
  );
};

export default Extintor;
