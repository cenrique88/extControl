import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../app/components/AppContext.jsx";

import useDataBase from "../../hooks/useDataBase";
import useForm from "../../hooks/useForm";
import Notify from "../../app/components/Notify.jsx";

import "../styles/AddNewClient.css";

const AddNewClient = () => {
  const { setSelectedPage } = useContext(AppContext);
  const navigate = useNavigate();
  const { writeDB } = useDataBase();

  const nombre_juridico = useForm();
  const direccion = useForm();
  const nombre_cliente = useForm();
  const email = useForm();

  const [telefonos, setTelefonos] = useState([""]);
  const [showNotify, setShowNotify] = useState(false);

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

  const saveData = () => {
    if (!nombre_cliente.inputValue.trim()) return alert("Nombre es obligatorio");

    const data = {
      nombre_juridico: nombre_juridico.inputValue,
      nombre_cliente: nombre_cliente.inputValue,
      direccion: direccion.inputValue,
      email: email.emailValue,
      telefonos,
    };

    writeDB("clientes/add-client", data);
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
          onChange={nombre_juridico.handleChangeInput}
        />
        <input
          type="text"
          placeholder="Nombre *"
          value={nombre_cliente.inputValue}
          onChange={nombre_cliente.handleChangeInput}
          required
        />
        <input
          type="text"
          placeholder="Dirección"
          value={direccion.inputValue}
          onChange={direccion.handleChangeInput}
        />
        <input
          type="email"
          placeholder="Email"
          value={email.emailValue}
          onChange={email.handleChangeEmail}
        />

        {telefonos.map((tel, idx) => (
          <input
            key={idx}
            type="text"
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

export default AddNewClient;

