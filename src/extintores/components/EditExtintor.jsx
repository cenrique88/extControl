import "../styles/FormExtintorCard.css";

import { useState, useContext, useEffect } from "react";

import AppContext from "../../app/components/AppContext";

import useForm from "../../hooks/useForm";
import useDataBase from "../../hooks/useDataBase.js";
import useEdit from "../../hooks/useEdit.js";
import Notify from "../../app/components/Notify.jsx";


import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";



const EditExtintor = () => {

    const { selectedClient, setSelectedPage, targetForEdit } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { editDB } = useDataBase();


    const id_extintor = useForm();
    const ubicacion = useForm();
    const tipo = useForm();
    const capacidad = useForm();
    const tiempo = useForm();
    const recarga = useForm();
    const ext = useForm();
    const senial = useForm();
    const soporte = useForm();





    useEffect(() => {
        setSelectedPage(location.pathname === '/extintores/add' ? 'Editar Extintor' : '');

        if(targetForEdit){
            id_extintor.handleChangeInput(targetForEdit.id_extintor);
            ubicacion.handleChangeInput(targetForEdit.ubicacion);
            tipo.handleChangeSelect(targetForEdit.tipo_extintor);
            capacidad.handleChangeInput(targetForEdit.capacidad);
            tiempo.handleChangeInput(targetForEdit.recarga_cada);
            recarga.handleChangeInput(targetForEdit.ultima_recarga);
            ext.handleChangeSelect(targetForEdit.estado_extintor);
            senial.handleChangeSelect(targetForEdit.senial);
            soporte.handleChangeSelect(targetForEdit.soporte);
            
        } else {
            navigate('/extintores', { replace: true })
        }

        
    }, []);
    










    

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
        }
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
                    value={selectedClient ||  'not client selected'} 
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
                <button 
                    className="cancelar"
                    onClick={()=>navigate('/extintores')}
                    >Cancelar</button>
                <button className="aceptar" onClick={handleGuardar}>Aceptar</button>
            </div>
        </div>
    );
};

export default EditExtintor;