import "../styles/FormExtintorCard.css";
import { useState, useContext } from "react";
import AppContext from "../../app/components/AppContext";
import useForm from "../../hooks/useForm";

const FormExtintor = ({ saveExtintor }) => {
    const { selectedClient } = useContext(AppContext);

    const id_extintor = useForm("");
    const ubicacion = useForm("");
    const tipo = useForm("");
    const capacidad = useForm("");
    const tiempo = useForm("");
    const recarga = useForm("");
    const ext = useForm("");
    const senial = useForm("");
    const soporte = useForm("");

    const handleGuardar = () => {
        const data = {
            cliente: selectedClient,
            id_extintor: id_extintor.inputValue,
            ubicacion: ubicacion.inputValue,
            tipo_extintor: tipo.inputValue,
            capacidad: capacidad.inputValue,
            recarga_cada: tiempo.inputValue,
            ultima_recarga: recarga.inputValue,
            estado_extintor: ext.inputValue,
            senial: senial.inputValue,
            soporte: soporte.inputValue,
            fecha_inspeccion: new Date().toISOString(),
        };
        saveExtintor(data);
    };

    return (
        <div className="form-extintor-card">
            <div className="card-header">
                <h3>Nuevo Extintor</h3>
            </div>

            <div className="form-grid">
                <input type="text" placeholder="Ubicación" className="full-width" {...ubicacion} />
            </div>

            <div className="fila-id-cliente">
                <input type="text" placeholder="ID *" {...id_extintor} />
                <input type="text" value={selectedClient} readOnly placeholder="Cliente" />
            </div>

            <div className="form-grid">
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

            <div className="card-footer">
                <button className="cancelar">Cancelar</button>
                <button className="aceptar" onClick={handleGuardar}>Aceptar</button>
            </div>
        </div>
    );
};

export default FormExtintor;