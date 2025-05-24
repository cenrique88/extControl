import "./styles/Components.css";
import {useState, useEffect} from 'react';
import FormExtintor from "./FormExtintor";
import ModalExt from "./ModalExt";




const Extintor = () => {
  const [showAddExt, setShowAddExt] = useState(false);

  const openModalAddExtintor = (prop) => {
    if(prop){
      document.getElementById('add-button-ext').style.visibility = "hidden";
    }
    else{
      document.getElementById('add-button-ext').style.visibility = "visible";
    }
    setShowAddExt(prop);
  }







    
  return (
    <div>
      <ModalExt 
        isOpen={showAddExt}
        onClose={()=>openModalAddExtintor(false)}
        content={<FormExtintor />}
      />


      <button id="add-button-ext" 
              className="add-button" 
              onClick={()=>openModalAddExtintor(true)}>
            +
        </button>      
    </div>
  )
}

export default Extintor
