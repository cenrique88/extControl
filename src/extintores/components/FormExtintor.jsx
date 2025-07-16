import "../styles/FormExtintorCard.css";
import { useState, useContext } from "react";
import AppContext from "../../app/components/AppContext";
import useForm from "../../hooks/useForm";

const FormExtintor = ({ saveExtintor }) => {
    const { selectedClient } = useContext(AppContext);

    const id_extintor = useForm();
    const ubicacion = useForm();
    const tipo = useForm();
    const capacidad = useForm();
    const tiempo = useForm();
    const recarga = useForm();
    const ext = useForm();
    const senial = useForm();
    const soporte = useForm();

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

    const selectOptions = {'Polvo ABC': ['1Kg', '2Kg', '3.5Kg', '4Kg', '8Kg', '25Kg', '50Kg'],  
                        'Polvo BC':['1Kg', '2Kg', '3.5Kg', '4Kg', '8Kg', '25Kg', '50Kg'],
                        'Polvo D': ['1Kg', '2Kg', '3.5Kg', '4Kg', '8Kg', '25Kg', '50Kg'],
                        'CO2':['1Kg', '2Kg', '3.5Kg', '4Kg', '8Kg', '25Kg', '50Kg'],
                        'Potasio':['2.5Lts', '6Lts', '9Lts', '10Lts', '50Lts'],
                        'Halotron':['1Kg', '2Kg', '3.5Kg', '4Kg', '8Kg', '25Kg', '50Kg'],
                        'Espuma AFFF':['2.5Lts', '6Lts', '9Lts', '10Lts', '50Lts']
                        };







    return (
        <div className="form-extintor-card">
            <div className="card-header">
                <h3>Nuevo Extintor</h3>
            </div>

            <div className="form-grid">
                <input 
                    type="text" 
                    placeholder="Ubicación" 
                    className="full-width" />
            </div>

            <div className="fila-id-cliente">
                <input 
                    type="text" 
                    placeholder="ID *"/>

                <input 
                    type="text" 
                    value={selectedClient ||  'Cliente seleccionado'} 
                    readOnly />
            </div>

            <div className="form-grid">

            <select id="tipo" onChange={(e) => tipo.handleChangeSelect(e)} value={tipo.selectValue}>
                    <option value="">Tipo</option>
                    {
                        Object.keys(selectOptions).map((option)=>(
                            <option key={option} value={option}>{option}</option>
                        ))
                    }                    
            </select>


                <select >
                {
                    (selectOptions[tipo.selectValue] || []).map((option)=>(
                        <option key={option} value={option}>{option}</option>
                    ))
                }
                </select>


                <select >
                    <option value="">Tiempo</option>
                    <option>1 Año</option>
                    <option>2 Años</option>
                    <option>valor manual</option>
                </select>

                <input type="month" id="recarga"  maxLength={7}/>
                <input type="month" id="vencimineto"  />

                <select >
                    <option value="">Extintor</option>
                    <option>Buen Estado</option>
                    <option>Mal Estado</option>
                    <option>Baja Presión</option>
                    <option>Retirado por Reforma</option>
                    <option>No se Revisó</option>
                </select>

                <select >
                    <option value="">Señalización</option>
                    <option>Buen Estado</option>
                    <option>Mal Estado</option>
                    <option>Retirada por Reforma</option>
                    <option>Falta</option>
                    <option>No Lleva</option>
                    <option>No se Revisó</option>
                </select>

                <select >
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