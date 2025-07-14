import { useState, useEffect, useContext } from "react";
import "../styles/FormExtintorCard.css";

import AppContext from "../../app/components/AppContext";
import useForm from "../../hooks/useForm";
import Notify from "../../app/components/Notify";

const FormExtintor = ({ getDB, saveExtintor }) => {
    const { selectedClient } = useContext(AppContext);
    const [clientes, setClientes] = useState([]);
    const [selectedOption, setSelectedOption] = useState(selectedClient);

    const id_extintor = useForm();
    const ubicacion = useForm();
    const tipo_extintor = useForm();
    const tipo_manual = useForm();
    const capacidad = useForm();
    const capacidad_manual = useForm();
    const recarga = useForm();
    const tiempo = useForm();
    const tiempo_manual = useForm();
    const vencimiento = useForm();
    const estado_extintor = useForm();
    const senalizacion = useForm();
    const soporte = useForm();
    const soporte_manual = useForm();
    const fecha_inspeccion = useForm();
    const observaciones = useForm();

    useEffect(() => {
        getClientes;
        //fecha_inspeccion.setInputValue(new Date().toISOString().split("T")[0]);
    }, []);

    useEffect(() => {
        if (!recarga.inputValue || (!tiempo.inputValue && !tiempo_manual.inputValue)) return;
        const [mes, anio] = recarga.inputValue.split("/").map(Number);
        if (!mes || !anio) return;
        const sumaAnios = parseInt(tiempo_manual.inputValue || tiempo.inputValue);
        if (isNaN(sumaAnios)) return;
        const nuevaFecha = new Date(anio, mes - 1);
        nuevaFecha.setFullYear(nuevaFecha.getFullYear() + sumaAnios);
        const vencimientoStr = `${String(nuevaFecha.getMonth() + 1).padStart(2, "0")}/${nuevaFecha.getFullYear()}`;
        vencimiento.setInputValue(vencimientoStr);
    }, [recarga.inputValue, tiempo.inputValue, tiempo_manual.inputValue]);

    const getClientes = async () => {
        const data = await getDB("clientes");
        if (data) setClientes(data);
    };

    const handleRecargaChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2, 6);
        recarga.setInputValue(value);
    };

    const handleSubmit = () => {
        if (!id_extintor.inputValue.trim()) return alert("ID es obligatorio");
        const revisiones = [estado_extintor.inputValue, senalizacion.inputValue, soporte.inputValue];
        if (revisiones.includes("No se Revisó") && !observaciones.textArea.trim()) {
            return alert("Observaciones obligatorias si hay campos 'No se Revisó'");
        }

        const data_ext = {
            id_extintor: id_extintor.inputValue,
            cliente: selectedOption,
            ubicacion: ubicacion.inputValue,
            tipo_extintor: tipo_manual.inputValue || tipo_extintor.inputValue,
            capacidad: capacidad_manual.inputValue || capacidad.inputValue,
            recarga: recarga.inputValue,
            vencimiento: vencimiento.inputValue,
            tiempo: tiempo_manual.inputValue ? `${tiempo_manual.inputValue} Años` : `${tiempo.inputValue} Años`,
            estado_extintor: estado_extintor.inputValue,
            senalizacion: senalizacion.inputValue,
            soporte: soporte_manual.inputValue || soporte.inputValue,
            fecha_inspeccion: fecha_inspeccion.inputValue,
            observaciones: observaciones.textArea,
        };

        saveExtintor(data_ext);
        Notify("Extintor guardado correctamente", "success");
    };

    return (
        <div className="extintor-page">
            <div className="form-extintor-card">
                <div className="card-header">
                    <h3>Nuevo Extintor</h3>
                </div>

                <div className="form-grid">
                    <input type="text" placeholder="Ubicación" className="full-width" value={ubicacion.inputValue} onChange={ubicacion.handleChangeInput} />
                </div>

                <div className="fila-id-cliente">
                    <input type="text" placeholder="ID *" value={id_extintor.inputValue} onChange={id_extintor.handleChangeInput} />
                    <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                        <option value="" disabled hidden>Cliente</option>
                        {clientes.map((c) => (
                            <option key={c._id} value={c.nombre_cliente}>{c.nombre_cliente}</option>
                        ))}
                    </select>
                </div>

                <div className="form-grid">
                    <select value={capacidad.inputValue} onChange={capacidad.handleChangeInput}>
                        <option value="" disabled hidden>Capacidad</option>
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

                    <select value={tipo_extintor.inputValue} onChange={tipo_extintor.handleChangeInput}>
                        <option value="" disabled hidden>Tipo</option>
                        <option>Polvo ABC</option>
                        <option>Polvo BC</option>
                        <option>Polvo D</option>
                        <option>CO2</option>
                        <option>Potasio</option>
                        <option>Halotron</option>
                        <option>Espuma AFFF</option>
                    </select>

                    <select value={tiempo.inputValue} onChange={tiempo.handleChangeInput}>
                        <option value="" disabled hidden>Tiempo</option>
                        <option value="1">1 Año</option>
                        <option value="2">2 Años</option>
                    </select>

                    <input type="text" placeholder="Recarga MM/AAAA" value={recarga.inputValue} onChange={handleRecargaChange} maxLength={7} />
                    <input type="text" placeholder="Vencimiento" value={vencimiento.inputValue} readOnly />

                    <select value={estado_extintor.inputValue} onChange={estado_extintor.handleChangeInput}>
                        <option value="" disabled hidden>Extintor</option>
                        <option>Buen Estado</option>
                        <option>Mal Estado</option>
                        <option>Baja Presión</option>
                        <option>Retirado por Reforma</option>
                        <option>No se Revisó</option>
                    </select>

                    <select value={senalizacion.inputValue} onChange={senalizacion.handleChangeInput}>
                        <option value="" disabled hidden>Señalización</option>
                        <option>Buen Estado</option>
                        <option>Mal Estado</option>
                        <option>Retirada por Reforma</option>
                        <option>Falta</option>
                        <option>No Lleva</option>
                        <option>No se Revisó</option>
                    </select>

                    <select value={soporte.inputValue} onChange={soporte.handleChangeInput}>
                        <option value="" disabled hidden>Soporte o Nicho</option>
                        <option>Buen Estado</option>
                        <option>Retirado por Reforma</option>
                        <option>Nicho Dañado</option>
                        <option>Nicho Faltante</option>
                        <option>Soporte Dañado</option>
                        <option>Soporte Faltante</option>
                        <option>Carro Dañado</option>
                    </select>
                </div>

                <textarea
                    placeholder="Observaciones"
                    rows="4"
                    onChange={observaciones.handleChangeTextArea}
                    value={observaciones.textArea}
                />

                <div className="card-footer">
                    <button className="cancelar" onClick={() => window.location.href = "/extintores"}>Cancelar</button>
                    <button className="aceptar" onClick={handleSubmit}>Aceptar</button>
                </div>
            </div>
        </div>
    );
};

export default FormExtintor;
