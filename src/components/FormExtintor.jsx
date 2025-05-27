
import {useState, useContext, useEffect} from "react";
import "./styles/Extintores.css"

import AppContext from "./AppContext";
import useForm from "./hooks/useForm";
import Notify from "./Notify";




const FormExtintor = ({writeDB, getDB, saveExtintor}) => {
    const {selectedClient} = useContext(AppContext);
    const [getDataClient, setDataClient] = useState([]);

    const id_extintor = useForm();
    const client = useForm();
    const ubicacion = useForm();
    const tipo_extintor = useForm();
    const capacidad = useForm();
    const recarga_cada = useForm();
    const ultima_recarga = useForm();
    const observaciones = useForm();

    const data_ext = {
        id_extintor:id_extintor.inputValue,
        cliente:client.selectValue,
        ubicacion:ubicacion.inputValue,
        tipo_extintor:tipo_extintor.inputValue,
        capacidad:tipo_extintor.inputValue,
        recarga_cada:recarga_cada.inputValue,
        ultima_recarga:ultima_recarga.inputValue,//cambiar esto es date
        observaciones:observaciones.textArea,
    }


    useEffect(() => {
     getClientes();
    }, [])

    const getClientes = async () => {
		const data = await getDB("clientes");

		if (data){
			setDataClient(data)
		}
	}

    
    





  return (
    <div className="form-extintor">
        <input 
            type="text" 
            placeholder="ID Extintor"
            value={id_extintor.inputValue}
            onChange={id_extintor.handleChangeInput}
        />

        <select 
            id='select-cliente-ext'
            onChange={(e)=>{client.handleChangeSelect(e)}}
        >
            <option selected value={selectedClient ? selectedClient : 'Selecciona Cliente' }>{selectedClient ? selectedClient : 'Selecciona Cliente' }</option>
            {getDataClient.map((client) => (
							<option key={client._id}>{client.nombre_cliente}</option>
						))}

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
            type="number" 
            placeholder="Recarga Cada"
            value={recarga_cada.inputValue}
            onChange={recarga_cada.handleChangeInput}
        />

        <input 
            type="date" 
            placeholder="Ultima Recarga"
            value={ultima_recarga.inputValue}
            onChange={(e)=>{ultima_recarga.handleChangeInput(e)}}
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

        <button onClick={()=>saveExtintor(data_ext)}>
            Guardar
        </button>

        
    </div>
  )
}

export default FormExtintor










