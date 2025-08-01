import "../styles/Extintor.css";
import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

import ExtintorCard from "./ExtintorCard";
import AppContext from "../../app/components/AppContext";
import useDataBase from "../../hooks/useDataBase";
import useDate from "../../hooks/useDate";
import useNavbarAction from "../../hooks/useNavbarAction";

import ConfirmNotify from "../../app/components/ConfirmNotify";
import useConfirmNotify from "../../hooks/useConfirmNotify";



const Extintor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { getDB, writeDB, deleteDB } = useDataBase();
  const { confirm, dialog } = useConfirmNotify();

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

  const handleDeleteExtintor = async (_id) => {
    const confirmed = await confirm();

    if(confirmed){
      deleteDB("extintores", _id);
      getAllExtintores();
      console.log('Extintor Eliminado')
    } else {
      console.log('Extintor No Eliminado')
    }
    
  }

  const handleEditExtintor = (_id) => {
    navigate(`/extintores/edit/${_id}`);
  }

  const [openCloseNotify, setOpenCloseNotify] = useState(false);
  const [returnValue, setReturnValue] = useState();






  return (
    <div className="extintor-page">
      <div className="extintor-container">

      {dialog}

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
            <option  selected={true} defaultValue="Ej: Pasillo 1">
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
              deleteFx={handleDeleteExtintor}
              editFx={handleEditExtintor}
            />
          </div>
        ))}
      </div>



      {modoEliminar && elementSeleccionados.length > 0 && (
        <button className="btn-eliminar-multiple" onClick={handleDeleteExtintores}>
          Eliminar seleccionados
        </button>
      )}

    </div>
  );
};

export default Extintor;