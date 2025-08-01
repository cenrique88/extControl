import "../styles/FormExtintorCard.css";

import { useState, useContext, useEffect } from "react";

import AppContext from "../../app/components/AppContext";
import useDataBase from "../../hooks/useDataBase.js";
import useEdit from "../../hooks/useEdit.js";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";



const EditExtintor = () => {

    const { selectedClient, setSelectedPage, targetForEdit } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { editDB } = useDataBase();


    const id_extintor = useEdit();
    const ubicacion = useEdit();
    const tipo = useEdit();
    const capacidad = useEdit();
    const tiempo = useEdit();
    const recarga = useEdit();
    const ext = useEdit();
    const senial = useEdit();
    const soporte = useEdit();

    useEffect(() => {
        setSelectedPage(location.pathname === '/extintores/add' ? 'Editar Extintor' : '');
        if(targetForEdit && selectedClient){
            id_extintor.handleChangeInput(targetForEdit.id_extintor);
            ubicacion.handleChangeInput(targetForEdit.ubicacion);
            tipo.handleChangeSelect(targetForEdit.tipo_extintor);
            capacidad.handleChangeSelect(targetForEdit.capacidad);
            tiempo.handleChangeSelect(targetForEdit.recarga_cada);
            recarga.handleChangeInput(targetForEdit.ultima_recarga);
            ext.handleChangeSelect(targetForEdit.estado_extintor);
            senial.handleChangeSelect(targetForEdit.senial);
            soporte.handleChangeSelect(targetForEdit.soporte);            
        } else {
            navigate('/clientes', { replace: true })
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

    const [disabledTipo, setDisabledTipo] = useState(false);
    const [disabledCapacidad, setDisabledCapacidad] = useState(false);
    const [disabledTime, setDisabledTime] = useState(false);
    const [customTime, setCustomTime] = useState('Otro');
    const [isCustomTime, setIsCustomTime] = useState(false);



    const onChangeTime = (e) => {
        if(customTime === e.target.value){
            setIsCustomTime(true); 
            setCustomTime('')           
        } else {
            tiempo.handleChangeSelect(e.target.value)
        }
    }

    const onSaveChangeTime = (value) => {            setCustomTime(`${value} Años`)
            tiempo.handleChangeSelect(`${value} Años`)
            setIsCustomTime(false);   
    }





    return (
        <div className="form-extintor-card">
            <div className="card-header">
                <h3>Editar Extintor</h3>
            </div>

            <div className="form-grid">
                <input 
                    type="text" 
                    placeholder="Ubicación" 
                    className="full-width" 
                    value={ubicacion.inputValue}
                    onChange={(e)=>ubicacion.handleChangeInput((e.target.value.toUpperCase()))}
                    required
                    />
            </div>

            <div className="fila-id-cliente">
                <input 
                    type="text" 
                    placeholder="ID *"
                    value={id_extintor.inputValue}
                    onChange={(e)=>id_extintor.handleChangeInput((e.target.value.toUpperCase()))}
                    required
                    />

                <input 
                    type="text" 
                    value={selectedClient || '#error?' } 
                    readOnly />
            </div>

            <div className="form-grid">

            <select 
                id="tipo" 
                onChange={(e) => tipo.handleChangeSelect(e.target.value)} 
                onClick={()=>setDisabledTipo(true)}
                value={tipo.selectValue}
                required
                >
                    <option value="" disabled={disabledTipo}>Tipo</option>
                    {
                        Object.keys(selectOptions).map((option)=>(
                            <option key={option} value={option}>{option}</option>
                        ))
                    }                    
            </select>

                <select 
                id="capacidad" 
                onChange={(e) => capacidad.handleChangeSelect(e.target.value)} 
                onClick={()=>setDisabledCapacidad(true)}
                value={capacidad.selectValue}
                required
                >
                <option value="" disabled={disabledCapacidad}>Capacidad</option>
                {
                    (selectOptions[tipo.selectValue] || []).map((option)=>(
                        <option key={option} value={option}>{option}</option>
                    ))
                }
                </select>


                {
                    !isCustomTime 
                ?
                <select 
                id="tiempo" 
                onChange={(e) => onChangeTime(e)} 
                onClick={()=>setDisabledTime(true)}
                value={tiempo.selectValue}
                required
                >
                    <option value="" disabled={disabledTime}>Tiempo</option>
                    <option value={1}>1 Año</option>
                    <option value={2}>2 Años</option>
                    <option value={customTime}>{customTime}</option>
                </select>
                :
                <>
                <input 
                    id="customTime" 
                    type="text" 
                    placeholder="Custom Time" 
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}

                    />
                    <button 
                        style={
                            {width:'23px', 
                            height:'23px', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            position: 'fixed',
                            top: '408px',
                            left: '200px'
                            }} 
                            onClick={() => onSaveChangeTime(document.getElementById('customTime').value)}
                            >✔</button>
                    </>
                    
                }

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