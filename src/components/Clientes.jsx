import "./styles/Components.css";
import "./styles/Clientes.css"
import {useState} from 'react';
import Modal from "./Modal";




const Clientes = () => {
  const [showAdd, setShowAdd] = useState();

  const [showAddCliente, setShowAddCliente] = useState(false);
  const openModalAddClient = (prop)=> {
    if(prop){
      document.getElementById('add-button').style.visibility = "hidden";
    }
    else{
      document.getElementById('add-button').style.visibility = "visible";
    }

    setShowAddCliente(prop);
  }





    
  return (
    <>
    <div className="cliente-container">
      <Modal 
        isOpen={showAddCliente}
        onClose={()=>openModalAddClient(false)}
        content={<p>hola</p>}
      />


      <div>
      <input 
        type="text"
        placeholder=" Buscar"
      ></input>
      </div>
      <div className="card-container">

        <div className="client-card">
          <img src='/src/img/m-azul.png' />
          <div className="text-container">
          <p><b>Nombre:</b></p>
          <p><i>Carlos Enrique Silva</i></p>
          <p><b>E-mail:</b></p>
          <p><i>cenrique@gmail.com</i></p>
          </div>
          
        </div>
        

      </div>

      <button id="add-button" className="add-button" onClick={()=>openModalAddClient(true)}>
            +
        </button>     

    </div>
      
    </>
  )
}

export default Clientes
