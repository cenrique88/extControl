import "../styles/FormExtintorCard.css";

import { useState, useContext, useEffect } from "react";

import AppContext from "../../app/components/AppContext";
import useForm from "../../hooks/useForm";
import useDataBase from "../../hooks/useDataBase";
import useEdit from "../../hooks/useEdit";
import useDate from "../../hooks/useDate";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";




const FormExtintor = () => {

    const {writeDB} = useDataBase();
    const {handleF_Vencimiento, handleTimeLeft} = useDate();
    const { selectedClient, setSelectedPage } = useContext(AppContext);

    const navigate = useNavigate();
    const location = useLocation();

    const [disableTipo, setDisableTipo] = useState(false);
    const [disabledTime, setDisabledTime] = useState(false);
    const [disabledCapacidad, setDisabledCapacidad] = useState(false);
    const [customTime, setCustomTime] = useState('Otro');
    const [isCustomTime, setIsCustomTime] = useState(false);

    const [vencDate, setVencDate] = useState('0000-00');


const ubicacion = useForm();
    const id_extintor = useForm();
    const material = useForm();
    const sector = useForm();
    const tipo = useForm();
    const capacidad = useForm();
    const tiempo = useEdit();
    const recarga = useForm();
    const ext = useForm();
    const senial = useForm();
    const soporte = useForm();
    const observaciones = useForm();





    useEffect(() => {
        if (selectedClient) {
            setSelectedPage(location.pathname === '/extintores/add' ? 'Nuevo Extintor' : '');
        } else {
            navigate('/clientes', { replace: true })
        }
    }, []);


    useEffect(() => {
        if (recarga.inputValue && tiempo.selectValue) {
            const venc = handleF_Vencimiento(recarga.inputValue, tiempo.selectValue);
            console.log(handleTimeLeft(recarga.inputValue, tiempo.selectValue));
            setVencDate(venc);
        } else {
            setVencDate('0000-00');
        }      
    }, [recarga.inputValue, tiempo.selectValue])



    const data = {
        id_extintor: id_extintor.upperInputValue,
        ubicacion: ubicacion.upperInputValue,
        cliente: selectedClient,
        material: material.selectValue,
        sector: sector.inputValue,
        tipo_extintor: tipo.selectValue,
        capacidad: capacidad.selectValue,
        recarga_cada: tiempo.selectValue,
        fecha_recarga: recarga.inputValue,
        fecha_vencimiento: vencDate,
        estado_extintor: ext.selectValue,
        senalizacion: senial.selectValue,
        soporte_nicho: soporte.selectValue,
        estado_vencimiento: 'vencido o no',
        observaciones:''
    }



    const selectOptions = {
        'Polvo ABC': ['1Kg', '2Kg', '3.5Kg', '4Kg', '8Kg', '25Kg', '50Kg'],
        'Polvo BC': ['1Kg', '2Kg', '3.5Kg', '4Kg', '8Kg', '25Kg', '50Kg'],
        'Polvo D': ['1Kg', '2Kg', '3.5Kg', '4Kg', '8Kg', '25Kg', '50Kg'],
        'CO2': ['1Kg', '2Kg', '3.5Kg', '4Kg', '8Kg', '25Kg', '50Kg'],
        'Potasio': ['2.5Lts', '6Lts', '9Lts', '10Lts', '50Lts'],
        'Halotron': ['1Kg', '2Kg', '3.5Kg', '4Kg', '8Kg', '25Kg', '50Kg'],
        'Espuma AFFF': ['2.5Lts', '6Lts', '9Lts', '10Lts', '50Lts']
    };


    const onChangeTime = (e) => {
        if (customTime === e.target.value) {
            setIsCustomTime(true);
            setCustomTime('')
        } else {
            tiempo.handleChangeSelect(Number(e.target.value))
        }
    }

    const onSaveChangeTime = (value) => {
        setCustomTime(Number(value))
        tiempo.handleChangeSelect(Number(value))
        setIsCustomTime(false);
    }



    const handleSaveData = async () => {
        try {
            const response = await writeDB('extintores/add', data);
            navigate('/extintores', { replace: true })
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <div className="form-page">
            <div className="form-extintor-card">
                <div className="card-header">
                    <h3>Nuevo Extintor</h3>
                </div>

                <div className="form-grid">
                    <input
                        type="text"
                        placeholder="Ubicación" maxLength={33}
                        className="full-width"
                        value={ubicacion.upperInputValue}
                        onChange={(e) => ubicacion.handleChangeUpperInput(e)}
                        />
                </div>

                <div className="fila-id-cliente">
                    <input
                        id="id_extintor"
                        type="text"
                        placeholder="ID *" maxLength={4}
                        value={id_extintor.upperInputValue}
                        onChange={(e) => id_extintor.handleChangeUpperInput(e)}
                        required
                        />

                    <input
                        type="text"
                        value={selectedClient || console.error('cliente no encontrado, redireccionando...')}
                        readOnly />
                </div>

                <div className="fila-material-sector">
                    <select 
                        id="material"
                        onChange={(e) => material.handleChangeSelect(e)}
                        value={material.selectValue}
                        required
                    >
                        <option value="">Material</option>
                        <option value='Acero'>Acero</option>
                        <option value='Aluminio'>Aluminio</option>
                        <option value='Inoxidable'>Inoxidable</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Sector" 
                        value={sector.inputValue}
                        onChange={(e) => sector.handleChangeInput(e)}
                        maxLength={24} />
                </div>


                <div className="form-grid">
                    <select
                        id="tipo"
                        onChange={(e) => tipo.handleChangeSelect(e)}
                        onClick={() => setDisableTipo(true)}
                        value={tipo.selectValue}
                        required
                    >
                        <option value="" hidden={disableTipo}>Tipo</option>
                        {
                            Object.keys(selectOptions).map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))
                        }
                    </select>


                    <select
                        id="capacidad"
                        onChange={(e) => capacidad.handleChangeSelect(e)}
                        onClick={() => setDisabledCapacidad(true)}
                        value={capacidad.selectValue}
                        required
                    >
                        <option value="" hidden={disabledCapacidad}>Capacidad</option>
                        {
                            (selectOptions[tipo.selectValue] || []).map((option) => (
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
                                onClick={() => setDisabledTime(true)}
                                value={tiempo.selectValue}
                                required
                            >
                                <option value="" hidden={disabledTime}>Tiempo</option>
                                <option value={1}>1 Año</option>
                                <option value={2}>2 Años</option>
                                <option value={customTime}>{typeof customTime === 'number' ? customTime + ' Años' : customTime}</option>
                            </select>
                            :
                            <>
                                <input
                                    id="customTime"
                                    type="text"
                                    placeholder="Custom Time" maxLength={2}
                                    value={customTime}
                                    onChange={(e) => setCustomTime(e.target.value)}

                                />
                                <button
                                    style={
                                        {
                                            width: '23px',
                                            height: '23px',
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

                    <input 
                        type={!recarga.inputValue ? "month" : "text"} 
                        id="recarga"
                        onChange={(e) => recarga.handleChangeInput(e)}
                        onKeyDown={(e) => e.key === 'Escape' && recarga.clearInput()}
                        value={recarga.inputValue}
                        />


                    <input 
                        type="text" 
                        id="vencimiento" 
                        value={vencDate ? vencDate : '0000-00'}
                        readOnly />

                    <select 
                        id='estado_extintor'
                        onChange={(e) => ext.handleChangeSelect(e)}
                        value={ext.selectValue}
                        required
                    >
                        <option value="">Extintor</option>
                        <option value='Buen Estado'>Buen Estado</option>
                        <option value='Mal Estado'>Mal Estado</option>
                        <option value='Baja Presión'>Baja Presión</option>
                        <option value='Retirado por Reforma'>Retirado por Reforma</option>
                        <option value='No se Revisó'>No se Revisó</option>
                    </select>

                    <select 
                        id='senalizacion'
                        onChange={(e) => senial.handleChangeSelect(e)}
                        value={senial.selectValue}
                        required
                    >
                        <option value="">Señalización</option>
                        <option value='Buen Estado'>Buen Estado</option>
                        <option value='Mal Estado'>Mal Estado</option>
                        <option value= 'Retuirado por Reforma'>Retirada por Reforma</option>
                        <option value='Falta'>Falta</option>
                        <option value='No Lleva'>No Lleva</option>
                        <option value='No se Revisó'>No se Revisó</option>
                    </select>

                    <select 
                        id='soporte'
                        onChange={(e) => soporte.handleChangeSelect(e)}
                        value={soporte.selectValue}
                        required
                    >
                        <option value="">Soporte o Nicho</option>
                        <option value='Buen Estado'>Buen Estado</option>
                        <option value='Mal Estado'>Mal Estado</option>
                        <option value='Retirado por Reforma'>Retirado por Reforma</option>
                        <option value='Nicho Dañado'>Nicho Dañado</option>
                        <option value='Nicho Faltante'>Nicho Faltante</option>
                        <option value='Soporte Dañado'>Soporte Dañado</option>
                        <option value='Soporte Faltante'>Soporte Faltante</option>
                        <option value='Carro Dañado'>Carro Dañado</option>
                    </select>
                </div>

                <div className="card-footer">
                    <button 
                        className="aceptar"
                        onClick={() => handleSaveData()}
                        >Aceptar</button>

                    <button
                        className="cancelar"
                        onClick={() => navigate('/extintores')}
                    >Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default FormExtintor;