import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../app/components/AppContext.jsx";

import useDataBase from "../../hooks/useDataBase.js";
import useEdit from "../../hooks/useEdit.js";
import Notify from "../../app/components/Notify.jsx";

import "../styles/AddNewClient.css";

const EditClient = () => {

  const { setSelectedPage, targetForEdit } = useContext(AppContext);

  const navigate = useNavigate();
  const { writeDB, editDB } = useDataBase();

  const nombre_juridico = useEdit();
  const direccion = useEdit();
  const nombre_cliente = useEdit();
  const email = useEdit();

  const [telefonos, setTelefonos] = useState([]);
  const [showNotify, setShowNotify] = useState(false);


  useEffect(() => {

    if(targetForEdit){
      handleTelefonos();
      nombre_juridico.handleChangeInput(targetForEdit.nombre_juridico);
      nombre_cliente.handleChangeInput(targetForEdit.nombre_cliente);
      direccion.handleChangeInput(targetForEdit.direccion);
      email.handleChangeEmail(targetForEdit.email);
    } else {
      navigate('/clientes', { replace: true })
    }
  }, [])


  const handleTelefonos = () => {
    for (let clave in targetForEdit){
      if(clave.includes('tel') && targetForEdit[clave] != 0){
        telefonos.push(targetForEdit[clave])
      }
    }
  }










  const addTelefono = () => {
    if (telefonos.length < 3) {
      setTelefonos([...telefonos, ""]);
    }
  };

  const updateTelefono = (index, value) => {
    const nuevos = [...telefonos];
    nuevos[index] = value;
    setTelefonos(nuevos);
  };

  const onCloseNotify = () => setShowNotify(false);

  const saveData = async () => {
    if (!nombre_cliente.inputValue.trim()) return alert("Nombre es obligatorio");

    const data = {
      nombre_cliente: nombre_cliente.inputValue,
      nombre_juridico: nombre_juridico.inputValue,      
      direccion: direccion.inputValue,
      email: email.emailValue,
      telefono: telefonos[0] || 0,
      telefono1: telefonos[1] || 0,
      telefono2: telefonos[2] || 0,
    };


    await editDB("clientes/edit-client",targetForEdit._id, data);

    setShowNotify(true);

    // Limpiar
    nombre_juridico.clearInput();
    direccion.clearInput();
    nombre_cliente.clearInput();
    email.clearEmail();
    setTelefonos([""]);

    navigate("/clientes");
    setSelectedPage("Clientes");
  };

  const handleCancel = () => {
    navigate("/clientes");
    setSelectedPage("Clientes");
  };

  return (
    <div className="add-client-page">
      <div className="add-client-card">
        <Notify msg="Cliente Guardado" open={showNotify} close={onCloseNotify} />

        <input
          type="text"
          placeholder="Nombre Jurídico"
          value={nombre_juridico.inputValue}
          onChange={(e)=>nombre_juridico.handleChangeInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nombre *"
          value={nombre_cliente.inputValue}
          onChange={(e)=>nombre_cliente.handleChangeInput(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Dirección"
          value={direccion.inputValue}
          onChange={(e)=>direccion.handleChangeInput(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email.emailValue}
          onChange={(e)=>email.handleChangeEmail((e.target.value))}
        />

        {telefonos.map((tel, idx) => (
          <input
            key={idx}
            type="number"
            placeholder={`Teléfono ${idx + 1}`}
            value={tel}
            onChange={(e) => updateTelefono(idx, e.target.value)}
          />
        ))}

        {telefonos.length < 3 && (
          <button className="add-phone-btn" onClick={addTelefono}>
            + Agregar teléfono
          </button>
        )}

        <div className="form-buttons">
          <button className="cancelar" onClick={handleCancel}>Cancelar</button>
          <button className="aceptar" onClick={saveData}>Aceptar</button>
        </div>
      </div>
    </div>
  );
};

export default EditClient;

