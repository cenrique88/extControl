import "../styles/Extintores.css";

import {useState, useEffect, useContext} from 'react';
import FormExtintor from "./FormExtintor";
import useDataBase from "../../hooks/useDataBase";
import ExtintorCard from "./ExtintorCard";
import Notify from "../../app/components/Notify";
import AppContext from "../../app/components/AppContext";
import useDate from "../../hooks/useDate";



const Extintor = () => {
  const [showAddExt, setShowAddExt] = useState(false);
  const [getDataExtintor, setDataExtintor] = useState(null);
  const [showNotify, setShowNotify] = useState(false);
  const [msgNotify, setMsgNotify] = useState("");
  const {selectedClient, setSelectedClient} = useContext(AppContext)

  const fv = useDate();
  const {writeDB, getDB, deleteDB} = useDataBase();


  const openModalAddExtintor = (prop) => {
    if(prop){
      document.getElementById('add-button-ext').style.visibility = "hidden";
    }
    else{
      document.getElementById('add-button-ext').style.visibility = "visible";
    }
    setShowAddExt(prop);
  }

  const onCloseNotify = ()=>{
    setShowNotify(false)
  }

  useEffect(() => {
      getAllExtintor();
    }, [])

  const getAllExtintor = async () => {
		const data = await getDB("extintores");
    const temp = [];
    if(data){
      data.map((extintor)=>{extintor.cliente == selectedClient ? temp.push(extintor) : ''})
    }

     // MANEJO DE LOS EXTINTORERS POR CLIENTES
		if (temp.length != 0){
			setDataExtintor(temp);
		} else {
      if(selectedClient != 'Select Client'){
        alert("No hay nada para mostrar en este cliente")
        }
      else{
        alert("Seleccione cliente")
        }
      
    }
	}

  const saveExtintor = async (data_ext) => {
        const ext = await writeDB("extintores", data_ext);
        getAllExtintor();
        setMsgNotify("Extintor guardado");
        setShowNotify(true);
    }

    const deleteExtintor = async (id) => {
      const alerta = confirm("Esta eliminando un extintor, ¿desea continuar?");
      if(alerta){
        const response = await deleteDB("extintores", id);
        if(response){
          getAllExtintor();
          setMsgNotify("Extintor eliminado");
          setShowNotify(true);
        }
      }      
    }

    const editExtintor = (id, data) => {
      console.log("edit")
    }

    // funcion para obtener la fecha de vencimiento de un extintor
    const handleF_Vencimiento = (ultima_recarga, recarga_cada) => {
      const fv = new Date(ultima_recarga);
      const rc = parseInt(recarga_cada);
      const getTime= fv.setFullYear(fv.getFullYear()+  rc)     
      return `${new Date(getTime).getMonth()}/${new Date(getTime).getFullYear()%1000}`;
    }






    
  return (
    <div>
      <Notify msg={msgNotify} open={showNotify} close={onCloseNotify}/>

      <ModalExt 
        isOpen={showAddExt}
        onClose={()=>openModalAddExtintor(false)}
        content={<FormExtintor writeDB={writeDB} getDB={getDB} saveExtintor={saveExtintor}/>}
      />
      <button id="add-button-ext" 
              className="add-button" 
              onClick={()=>openModalAddExtintor(true)}>
            +
      </button>

      <input
      className="search-bar" 
        type="text"
        placeholder="implementacion de la busqueda por filtro!!!"/>  


        <div className="scroll-container">
          {
            getDataExtintor && getDataExtintor.map((ext) => (<ExtintorCard 
                                                              key={ext._id} 
                                                              extintor={ext} 
                                                              deleteExtintor={deleteExtintor} 
                                                              editExtintor={editExtintor} 
                                                              handleF_Vencimiento={fv.handleF_Vencimiento}
                                                              />))
          }
        </div>
          <div className="footer-select">
          aqui se implementara la seleccion de extintores por letras

        </div>


    </div>
  )
}

export default Extintor
