import "../styles/Clientes.css";

import {useState, useEffect, useContext} from 'react';

import FormCliente from "./FormCliente";
import CardClient from "./CardClient";
import useDataBase from "../../hooks/useDataBase";
import AddNewClient from "./AddNewClient";

import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router"

import { Link } from "react-router-dom";
import {AppContext} from "../../app/components/AppContext";

<<<<<<< HEAD:src/clientes/components/Clientes.jsx

const Clientes = () => {

  const navigate = useNavigate();
=======
const Clientes = () => {
>>>>>>> 3d5b17d24dcb7939679c67b9552ebe8235942f2a:src/components/Clientes.jsx

  const {setSelectedPage} = useContext(AppContext);
  const {getDB, deleteDB}= useDataBase()


  const [getClients, setGetClients] = useState([]);
  const [showAddCliente, setShowAddCliente] = useState(false);


  const handleData = async () => {
    const data = await getDB("clientes");
    if (data) {
      setGetClients(data);
    }
  };

  const handleDelete = (client) => {
    const alerta = confirm("Esta eliminando a un cliente, ¿desea continuar?");
    if (alerta) {
      deleteDB('clientes', client);
    }
    console.log("Cliente eliminado", client);
  };

  useEffect(() => {
    handleData();
  }, [showAddCliente]);

  return (
    <div className="container cliente-container">

      {/* Input de búsqueda */}
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Buscar"
          className="input-search"
        />
      </div>

      {/* Tarjetas de clientes */}
      {getClients && getClients.map((client) => (
        <CardClient
          key={client._id}
          client={client}
        />
      ))}

      {/* Botón flotante para agregar */}
      <button
        id="add-button"
        className="add-button"
        onClick={() => navigate("/clientes/add-client")}
      >
        +
      </button>
    </div>
  );
};

export default Clientes;
