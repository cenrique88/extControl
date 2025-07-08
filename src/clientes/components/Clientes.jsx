import "../styles/Clientes.css";
import { useState, useEffect, useContext } from 'react';

import CardClient from "./CardClient";
import useDataBase from "../../hooks/useDataBase";
import AddNewClient from "./AddNewClient";

import useNavbarAction from "../../hooks/useNavbarAction";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { AppContext } from "../../app/components/AppContext";

const Clientes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { handleDeleteSelected, toggleElementSelected } = useNavbarAction(); 

  const {
          setSelectedPage,
          modoEliminar,
          setModoEliminar,
          elementSeleccionados,
          setElementSeleccionados,
    } = useContext(AppContext);


  const { getDB } = useDataBase();

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


  const handleDeleteClient = () => {
    handleDeleteSelected(elementSeleccionados, "¿Desea eliminar los clientes seleccionados?");
    handleData();
  }


  useEffect(() => {
    handleData();
    setSelectedPage(location.pathname === '/clientes' ? 'Clientes' : '/');
  }, [showAddCliente, handleData]);



  return (
    <div className="cliente-page">
      {/* Barra de búsqueda fija */}
      <div className="search-wrapper">
        <input type="text" placeholder="Buscar" className="input-search" />
      </div>

      {/* Zona de scroll que "recorta" las tarjetas antes de la barra y el botón */}
      <div className="scroll-zone">
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
                checked={elementSeleccionados.includes(client.nombre_cliente)}
                onChange={() => toggleElementSelected(client.nombre_cliente)}
              />
            )}

          </div>
        ))}
      </div>

      {/* Botón fijo (fuera de la zona scrollable) */}
      {modoEliminar && elementSeleccionados.length > 0 && (
        <button
          className="btn-eliminar-multiple"
          onClick={handleDeleteClient}
        >
          Eliminar seleccionados
        </button>
      )}
    </div>
  );
};

export default Clientes;
