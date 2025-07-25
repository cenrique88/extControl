import "../styles/FormExtintorCard.css";
import { useState, useContext, useEffect } from "react";
import AppContext from "../../app/components/AppContext";
import useForm from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import useEdit from "../../hooks/useEdit";

const FormExtintor = ({ saveExtintor }) => {

    const { selectedClient, setSelectedPage } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (selectedClient) {
            setSelectedPage(location.pathname === '/extintores/add' ? 'Nuevo Extintor' : '');
        } else {
            navigate('/clientes', { replace: true })
        }
    }, []);


    const id_extintor = useForm();
    const ubicacion = useForm();
    const tipo = useForm();
    const capacidad = useForm();
    const tiempo = useEdit();
    const recarga = useForm();
    const ext = useForm();
    const senial = useForm();
    const soporte = useForm();


    const selectOptions = {
        'Polvo ABC': ['1Kg', '2Kg', '3.5Kg', '4Kg', '8Kg', '25Kg', '50Kg'],
        'Polvo BC': ['1Kg', '2Kg', '3.5Kg', '4Kg', '8Kg', '25Kg', '50Kg'],
        'Polvo D': ['1Kg', '2Kg', '3.5Kg', '4Kg', '8Kg', '25Kg', '50Kg'],
        'CO2': ['1Kg', '2Kg', '3.5Kg', '4Kg', '8Kg', '25Kg', '50Kg'],
        'Potasio': ['2.5Lts', '6Lts', '9Lts', '10Lts', '50Lts'],
        'Halotron': ['1Kg', '2Kg', '3.5Kg', '4Kg', '8Kg', '25Kg', '50Kg'],
        'Espuma AFFF': ['2.5Lts', '6Lts', '9Lts', '10Lts', '50Lts']
    };

    const [disableTipo, setDisableTipo] = useState(false);
    const [disableCapacidad, setDisableCapacidad] = useState(false);
    const [disabledTime, setDisabledTime] = useState(false);
    const [customTime, setCustomTime] = useState('Otro');
    const [isCustomTime, setIsCustomTime] = useState(false);



    const onChangeTime = (e) => {
        if (customTime === e.target.value) {
            setIsCustomTime(true);
            setCustomTime('')
        } else {
            tiempo.handleChangeSelect(e)
        }
    }

    const onSaveChangeTime = (value) => {
        setCustomTime(`${value} Años`)
        tiempo.handleChangeSelect(`${value} Años`)
        setIsCustomTime(false);
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
                        type="text"
                        placeholder="ID *" maxLength={4}
                        value={id_extintor.upperInputValue}
                        onChange={(e) => id_extintor.handleChangeUpperInput(e)}
                    />

                    <input
                        type="text"
                        value={selectedClient || console.error('cliente no encontrado, redireccionando...')}
                        readOnly />
                </div>

                <div className="fila-material-sector">
                    <select >
                        <option value="">Material</option>
                        <option>Acero</option>
                        <option>Aluminio</option>
                        <option>Inoxidable</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Sector" maxLength={24} />
                </div>

                <div className="form-grid">
                    <select
                        id="tipo"
                        onChange={(e) => tipo.handleChangeSelect(e)}
                        onClick={() => setDisableTipo(true)}
                        value={tipo.selectValue}
                    >
                        <option value="" hidden={disableTipo}>Tipo</option>
                        {
                            Object.keys(selectOptions).map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))
                        }
                    </select>


                    <select >
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

                    <input type="month" id="recarga" maxLength={7} />

                    <input type="month" id="vencimineto" maxLength={7} />

                    <select >
                        <option value="">Extintor</option>
                        <option value='Buen Estado'>Buen Estado</option>
                        <option value='Mal Estado'>Mal Estado</option>
                        <option value='Baja Presión'>Baja Presión</option>
                        <option value='Retirado por Reforma'>Retirado por Reforma</option>
                        <option value='No se Revisó'>No se Revisó</option>
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
                        onClick={() => navigate('/extintores')}
                    >Cancelar</button>
                    <button className="aceptar" >Aceptar</button>
                </div>
            </div>
        </div>
    );
};

export default FormExtintor;