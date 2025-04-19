import {useState, useEffect} from 'react';
import useForm from './hooks/useForm'
import useDataBase from './hooks/useDataBase'

const idExt = useForm;
const {getOneDB} = useDataBase();





const EditarExtintor = ({id_extintor}) => {
    console.log( id_extintor);


    const getData = async () => {
        const data = await getOneDB("extintores", id_extintor);
        console.log(data)

    }

    useEffect(() => {
      getData();
    
    }, []);  

    


  return (
    <>
    <div>
        <div>
            <h2>Edicion de Extintores</h2>
        </div>
            <input
					className=''
					name='id_extintor'
					type='text'
					id='id_extintor'

                    value=''
                    placeholder='Insertar ID'
				/>

            <input
					className=''
					name='iubicacion'
					type='text'
					id='ubicacion'
                    value=''
                    placeholder='Insertar ubicacion'
				/>

            <input
					className=''
					name='tipo'
					type='text'
					id='tipo'
                    value=''
                    placeholder='Insertar tipo de extintor'
				/>
            
            <input
					className=''
					name='capacidad'
					type='text'
					id='capacidad'
                    value=''
                    placeholder='Insertar capacidad de extintor'
				/>
            
            <input
					className=''
					name='recarga_cada'
					type='number'
					id='recarga_cada'
                    value=''
                    placeholder='Insertar recarga cada'
				/>
            
            <input
					className=''
					name='ultima_recarga'
					type='date'
					id='ultima_recarga'
                    value=''
                    placeholder='Insertar ultima recarga'
				/>

        
        <button>Guardar</button>
        <button>Descartar</button>
        
        
    </div>
      
    </>
  )
}

export default EditarExtintor
