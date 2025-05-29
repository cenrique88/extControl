import "./styles/Extintores.css";
import {useState, useEffect, useContext} from 'react';
import FormExtintor from "./FormExtintor";
import ModalExt from "./ModalExt";
import useDataBase from "./hooks/useDataBase";
import ExtintorCard from "./ExtintorCard";
import Notify from "./Notify";
import AppContext from "./AppContext";



const Extintor = () => {
  const [showAddExt, setShowAddExt] = useState(false);
  const [getDataExtintor, setDataExtintor] = useState(null);
  const [showNotify, setShowNotify] = useState(false);
  const {selectedClient, setSelectedClient} = useContext(AppContext)

  const {writeDB, getDB} = useDataBase();


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
         setShowNotify(true);
    }






    
  return (
    <div>
      <Notify msg="Extintor Guardado" open={showNotify} close={onCloseNotify}/>

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
            getDataExtintor && getDataExtintor.map((ext) => (<ExtintorCard key={ext._id} extintor={ext} />))
          }
        </div>
       <div className="footer-select">
        aqui se implementara la seleccion de extintores por letras

       </div>


    </div>
  )
}

export default Extintor
