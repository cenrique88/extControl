import "../styles/Extintor.css";
import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

import ExtintorCard from "./ExtintorCard";
import Notify from "../../app/components/Notify";
import AppContext from "../../app/components/AppContext";
import useDataBase from "../../hooks/useDataBase";
import useDate from "../../hooks/useDate";
import useNavbarAction from "../../hooks/useNavbarAction";

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
    setElementSeleccionados,
    setViewEditButton
  } = useContext(AppContext);

  const { handleDeleteSelected, toggleElementSelected } = useNavbarAction();

  const [showAddExt, setShowAddExt] = useState(false);
  const [getDataExtintor, setDataExtintor] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [showNotify, setShowNotify] = useState(false);
  const [msgNotify, setMsgNotify] = useState("");
  const [openExtId, setOpenExtId] = useState(null);
  const [placeholderFilter, setPlaceholderFilter] = useState("Buscar");
  const [selectSearchFilter, setSelectSearchFilter] = useState('ubicacion')



  const itemRefs = useRef([]);

  useEffect(() => {
    setViewEditButton(false);
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

  const handleDeleteExtintores = () => {
    handleDeleteSelected(elementSeleccionados, "¿Desea eliminar los extintores seleccionados?");
    getAllExtintores();
  };

  const extintoresFiltrados = getDataExtintor.filter((ext) =>
    ext[selectSearchFilter] ?.toUpperCase().includes(filtroNombre.toUpperCase())
  );

  const selectFilter = (e) => {
    setFiltroNombre('');
    setPlaceholderFilter(e.target.value);
    if(e.target.value == 'Ej: A07'){
      setSelectSearchFilter('id_extintor')
    } else if(e.target.value == 'Ej: Plovo'){
      setSelectSearchFilter('tipo_extintor')
    } else if(e.target.value == 'Area o Sector'){
      setSelectSearchFilter('sector')
    } else if(e.target.value == 'Ej: Pasillo 1'){
      setSelectSearchFilter('ubicacion')  
    }; 
    const input = document.getElementById('search-input');
    if(input){
      input.focus();
    }
    
  }







  return (
    <div className="extintor-page">
      <div className="extintor-container">

          <input
            id="search-input"
            className="input-search"
            type="text"
            placeholder={placeholderFilter}
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
          <select 
            onChange={(e) => selectFilter(e)}
            className="select-wrapper"
            >
            <option value="Ej: A07">
              ID
            </option>
            <option value="Ej: Plovo" >
              TIPO
            </option>
            <option value="Area o Sector">
              SECTOR
            </option>
            <option selected value="Ej: Pasillo 1">
              UBICACION
            </option>
          </select>
        </div>

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



      {modoEliminar && elementSeleccionados.length > 0 && (
        <button className="btn-eliminar-multiple" onClick={handleDeleteExtintores}>
          Eliminar seleccionados
        </button>
      )}

      <Notify msg={msgNotify} open={showNotify} close={() => setShowNotify(false)} />
    </div>
  );
};

export default Extintor;