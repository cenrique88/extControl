import "./styles/Extintores.css";
import {useState, useEffect} from 'react';
import FormExtintor from "./FormExtintor";
import ModalExt from "./ModalExt";
import useDataBase from "./hooks/useDataBase";
import ExtintorCard from "./ExtintorCard";
import Notify from "./Notify";



const Extintor = () => {
  const [showAddExt, setShowAddExt] = useState(false);
  const [getDataExtintor, setDataExtintor] = useState(null);
  const [showNotify, setShowNotify] = useState(false);

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
		if (data){
			setDataExtintor(data);
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
            getDataExtintor && getDataExtintor.map((ext) => (<ExtintorCard key={ext._id} id={ext.id_extintor} />))
          }
        </div>
       <div className="footer-select">
        aqui se implementara la seleccion de extintores por letras

       </div>


    </div>
  )
}

export default Extintor
