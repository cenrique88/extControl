import "../styles/Clientes.css";
import { useState, useEffect, useContext } from 'react';

import FormCliente from "./FormCliente";
import CardClient from "./CardClient";
import useDataBase from "../../hooks/useDataBase";
import AddNewClient from "./AddNewClient";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { AppContext } from "../../app/components/AppContext";

const Clientes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedPage, modoEliminar, setModoEliminar, clientesSeleccionados, setClientesSeleccionados } = useContext(AppContext);
  const { getDB, deleteDB } = useDataBase();

  const [getClients, setGetClients] = useState([]);
  const [showAddCliente, setShowAddCliente] = useState(false);
  const [openClientId, setOpenClientId] = useState(null);

  const handleData = async () => {
    const data = await getDB("clientes");
    if (data) {
      setGetClients(data);
    }
  };

  const handleToggle = (clientId) => {
    setOpenClientId(prevId => (prevId === clientId ? null : clientId));
  };

  const toggleClienteSeleccionado = (id) => {
    setClientesSeleccionados((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id]
    );
  };

  const handleEliminarSeleccionados = async () => {
    const confirmar = confirm("¿Desea eliminar los clientes seleccionados?");
    if (confirmar) {
      for (const id of clientesSeleccionados) {
        await deleteDB("clientes", id);
      }
      setClientesSeleccionados([]);
      setModoEliminar(false);
      handleData();
    }
  };

  useEffect(() => {
    handleData();
    setSelectedPage(location.pathname === '/clientes' ? 'Clientes' : '/');
  }, [showAddCliente]);

  return (
    <div className="container cliente-container">
      <div className="search-wrapper">
        <input type="text" placeholder="Buscar" className="input-search" />
      </div>

      {getClients && getClients.map((client) => (
        <div className="card-wrapper" key={client._id}>
          <CardClient
            client={client}
            isOpen={openClientId === client._id}
            onToggle={() => handleToggle(client._id)}
            onClose={() => setOpenClientId(null)}
          />

          {modoEliminar && openClientId !== client._id && (
            <input
              type="checkbox"
              className="card-checkbox-derecha"
              checked={clientesSeleccionados.includes(client._id)}
              onChange={() => toggleClienteSeleccionado(client._id)}
            />
          )}
        </div>
      ))}

      {modoEliminar && clientesSeleccionados.length > 0 && (
  <>
    <button
      className="btn-eliminar-multiple"
      onClick={handleEliminarSeleccionados}
    >
      Eliminar seleccionados
    </button>
    <div className="espacio-para-boton"></div>
  </>
)}
    </div>
  );
};

export default Clientes;
