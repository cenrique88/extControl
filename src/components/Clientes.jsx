import "./styles/Components.css";
import "./styles/Clientes.css"
import {useState, useEffect} from 'react';
import Modal from "./Modal";
import FormCliente from "./FormCliente";
import CardClient from "./CardClient";
import useDataBase from "./hooks/useDataBase";





const Clientes = () => {
  const {getDB}= useDataBase()

  const [getClients, setGetClients] = useState([]);
  const [showAddCliente, setShowAddCliente] = useState(false);

  useEffect(() => {
    handleData()
  }, [showAddCliente])

  const handleData = async () => {
    const data = await getDB("clientes");
    if(data){
      setGetClients(data);
  }
}


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
        content={<FormCliente />}
      />


      <div>
      <input 
        type="text"
        placeholder=" Buscar"
      ></input>
      </div>

      {
        getClients && getClients.map((client) =>  <CardClient key={client._id} name={client.nombre_cliente} email={client.email} />)
      }    

      <button id="add-button" className="add-button" onClick={()=>openModalAddClient(true)}>
            +
        </button>     

    </div>
      
    </>
  )
}

export default Clientes
