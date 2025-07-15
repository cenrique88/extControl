import { useState } from "react";
import "../styles/ExtintorCard.css";
import useForm from "../../hooks/useForm";

const ExtintorCard = ({ extintor, onUpdate, onDelete }) => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [abierta, setAbierta] = useState(false);

  const id_extintor = useForm(extintor.id_extintor || "");
  const ubicacion = useForm(extintor.ubicacion || "");
  const tipo = useForm(extintor.tipo_extintor || "");
  const capacidad = useForm(extintor.capacidad || "");
  const tiempo = useForm(extintor.recarga_cada || "");
  const recarga = useForm(extintor.ultima_recarga || "");
  const ext = useForm(extintor.estado_extintor || "");
  const senial = useForm(extintor.senial || "");
  const soporte = useForm(extintor.soporte || "");

  const handleGuardar = () => {
    const data = {
      ...extintor,
      id_extintor: id_extintor.inputValue,
      ubicacion: ubicacion.inputValue,
      tipo_extintor: tipo.inputValue,
      capacidad: capacidad.inputValue,
      recarga_cada: tiempo.inputValue,
      ultima_recarga: recarga.inputValue,
      estado_extintor: ext.inputValue,
      senial: senial.inputValue,
      soporte: soporte.inputValue,
    };
    onUpdate(data);
    setModoEdicion(false);
  };

  const handleCancelar = () => {
    setModoEdicion(false);
  };

  return (
    <div
      className={`extintor-card ${abierta ? "open" : "closed"}`}
      onClick={() => !modoEdicion && setAbierta(!abierta)}
    >
      {!abierta ? (
        <>
          <img src="/icons/extintor.svg" alt="icono" />
          <p>{extintor.id_extintor}</p>
        </>
      ) : (
        <>
          <div className="extintor-header">
            <h3>Extintor {extintor.id_extintor}</h3>
          </div>

          {!modoEdicion ? (
            <>
              <div className="extintor-form-grid">
                <div className="full-width">
                  <strong>Ubicación:</strong> {extintor.ubicacion}
                </div>
              </div>

              <div className="extintor-fila-id">
                <div><strong>ID:</strong> {extintor.id_extintor}</div>
                <div><strong>Cliente:</strong> {extintor.cliente}</div>
              </div>

              <div className="extintor-form-grid">
                <div><strong>Capacidad:</strong> {extintor.capacidad}</div>
                <div><strong>Tipo:</strong> {extintor.tipo_extintor}</div>
                <div><strong>Tiempo:</strong> {extintor.recarga_cada}</div>
                <div><strong>Recarga:</strong> {extintor.ultima_recarga}</div>
                <div><strong>Vencimiento:</strong> -</div>
                <div><strong>Extintor:</strong> {extintor.estado_extintor}</div>
                <div><strong>Señalización:</strong> {extintor.senial}</div>
                <div><strong>Soporte:</strong> {extintor.soporte}</div>
              </div>
            </>
          ) : (
            <>
              <div className="extintor-form-grid">
                <input type="text" placeholder="Ubicación" className="full-width" {...ubicacion} />
              </div>

              <div className="extintor-fila-id">
                <input type="text" placeholder="ID *" {...id_extintor} />
                <input type="text" value={extintor.cliente} readOnly placeholder="Cliente" />
              </div>

              <div className="extintor-form-grid">
                <select {...capacidad}>
                  <option value="">Capacidad</option>
                  <option>1Kg</option>
                  <option>2Kg</option>
                  <option>3.5Kg</option>
                  <option>4Kg</option>
                  <option>8Kg</option>
                  <option>25Kg</option>
                  <option>50Kg</option>
                  <option>2.5Lts</option>
                  <option>6Lts</option>
                  <option>9Lts</option>
                  <option>10Lts</option>
                  <option>50Lts</option>
                </select>

                <select {...tipo}>
                  <option value="">Tipo</option>
                  <option>Polvo ABC</option>
                  <option>Polvo BC</option>
                  <option>Polvo D</option>
                  <option>CO2</option>
                  <option>Potasio</option>
                  <option>Halotron</option>
                  <option>Espuma AFFF</option>
                </select>

                <select {...tiempo}>
                  <option value="">Tiempo</option>
                  <option>1 Año</option>
                  <option>2 Años</option>
                </select>

                <input type="text" placeholder="Recarga MM/AAAA" {...recarga} maxLength={7} />
                <input type="date" placeholder="Vencimiento" readOnly />
                <select {...ext}>
                  <option value="">Extintor</option>
                  <option>Buen Estado</option>
                  <option>Mal Estado</option>
                  <option>Baja Presión</option>
                  <option>Retirado por Reforma</option>
                  <option>No se Revisó</option>
                </select>

                <select {...senial}>
                  <option value="">Señalización</option>
                  <option>Buen Estado</option>
                  <option>Mal Estado</option>
                  <option>Retirada por Reforma</option>
                  <option>Falta</option>
                  <option>No Lleva</option>
                  <option>No se Revisó</option>
                </select>

                <select {...soporte}>
                  <option value="">Soporte o Nicho</option>
                  <option>Buen Estado</option>
                  <option>Retirado por Reforma</option>
                  <option>Nicho Dañado</option>
                  <option>Nicho Faltante</option>
                  <option>Soporte Dañado</option>
                  <option>Soporte Faltante</option>
                  <option>Carro Dañado</option>
                </select>
              </div>
            </>
          )}

          <div className="extintor-footer">
            {modoEdicion ? (
              <>
                <button className="cancelar" onClick={handleCancelar}>Cancelar</button>
                <button className="aceptar" onClick={handleGuardar}>Guardar</button>
              </>
            ) : (
              <>
                <button className="cancelar" onClick={() => onDelete(extintor._id)}>Eliminar</button>
                <button className="aceptar" onClick={() => setModoEdicion(true)}>Editar</button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ExtintorCard;
