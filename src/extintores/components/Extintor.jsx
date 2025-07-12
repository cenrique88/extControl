

import { useState, useEffect, useContext } from 'react';
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
  const { setSelectedPage, selectedClient } = useContext(AppContext);

  const fv = useDate();
  const { writeDB, getDB, deleteDB } = useDataBase();

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
      console.log(data)
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
    const alerta = confirm("Esta eliminando un extintor, ¿desea continuar?");
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

  return (
    <div>
      <Notify msg={msgNotify} open={showNotify} close={onCloseNotify} />

      <button id="add-button-ext" className="add-button" onClick={() => openModalAddExtintor(true)}>
        +
      </button>

      <input
        className="search-bar"
        type="text"
        placeholder="¡Implementación de la búsqueda por filtro próximamente!"
      />

      {showAddExt && (
        <FormExtintor getDB={getDB} saveExtintor={saveExtintor} />
      )}

      <div className="scroll-container">
        {getDataExtintor.map((ext) => (
          <ExtintorCard
            key={ext._id}
            extintor={ext}
            deleteExtintor={deleteExtintor}
            editExtintor={editExtintor}
            handleF_Vencimiento={handleF_Vencimiento}
          />
        ))}
      </div>

      <div className="footer-select">
        Aquí se implementará la selección de extintores por letras
      </div>
    </div>
  );
};

export default Extintor;
