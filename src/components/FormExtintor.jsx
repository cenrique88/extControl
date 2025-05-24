
import {useState} from "react";
import "./styles/Extintores.css"
import useDataBase from "./hooks/useDataBase";
import useForm from "./hooks/useForm";
import Notify from "./Notify";




const FormExtintor = () => {
    const {writeDB} = useDataBase();

    const id_extintor = useForm();
    const client = useForm();
    const ubicacion = useForm();
    const tipo_extintor = useForm();
    const capacidad = useForm();
    const recarga_cada = useForm();
    const ultima_recarga = useForm();
    const observaciones = useForm();






  return (
    <div className="form-extintor">
        <input 
            type="text" 
            placeholder="ID Extintor"
            value={id_extintor.inputValue}
            onChange={id_extintor.handleChangeInput}
        />

        <select>

        </select>

        <input 
            type="text" 
            placeholder="Ubicacion"
            value={ubicacion.inputValue}
            onChange={ubicacion.handleChangeInput}
        />

        <input 
            type="text" 
            placeholder="Tipo"
            value={tipo_extintor.inputValue}
            onChange={tipo_extintor.handleChangeInput}
        />

        <input 
            type="text" 
            placeholder="Capacidad"
            value={capacidad.inputValue}
            onChange={capacidad.handleChangeInput}
        />

        <input 
            type="text" 
            placeholder="Recarga Cada"
            value={recarga_cada.inputValue}
            onChange={recarga_cada.handleChangeInput}
        />

        <input 
            type="date" 
            placeholder="Ultima Recarga"
        />

        <textarea
					placeholder='Observaciones'
					id='observaciones'
					rows='4'
					cols='35'
					onChange={(e) => {
						observaciones.handleChangeTextArea(e);
					}}
					value={observaciones.textArea}
		/>

        <button>
            Guardar
        </button>

        
    </div>
  )
}

export default FormExtintor










