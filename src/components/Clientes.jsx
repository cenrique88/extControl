import "./styles/Components.css";
import "./styles/Clientes.css"
import {useState, useEffect, useContext} from 'react';
import Modal from "./Modal";
import FormCliente from "./FormCliente";
import CardClient from "./CardClient";
import useDataBase from "./hooks/useDataBase";
import AddNewClient from "./AddNewClient";

import { Link } from "react-router-dom";
import {AppContext} from "./AppContext";






const Clientes = () => {
  const {setSelectedPage} = useContext(AppContext);
  const {getDB, deleteDB}= useDataBase()

  const [getClients, setGetClients] = useState([]);
  const [showAddCliente, setShowAddCliente] = useState(false);



  const handleData = async () => {
    const data = await getDB("clientes");
    if(data){
      setGetClients(data);
  }
}

const handleDelete = (client) => {
    const alerta = confirm("Esta eliminando a un cliente, ¿desea continuar?")
    if(alerta){
      deleteDB('clientes', client);
      
    }
    console.log("Cliente eliminado", client)
  }

  useEffect(() => {
    handleData()
  }, [showAddCliente, handleDelete])



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
        getClients && getClients.map((client) =>  <CardClient 
                                                      key={client._id} 
                                                      client={client} 
                                                       />)          
      }  

      <Link 
          className="add-button"
          to="/clientes/add-client"
          id="add-client"
          onClick={()=>{setSelectedPage("Clientes / Nuevo Cliente")}}
          >+</Link>

      {/* <button id="add-button" className="add-button" >       
            
      </button>      */}

    </div>
      
    </>
  )
}

export default Clientes
