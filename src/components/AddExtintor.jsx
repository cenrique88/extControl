import { useState } from 'react';
import  useForm  from './hooks/useForm';
import useDataBase from './hooks/useDataBase';
import "./components.css";




const AddExtintor = () => {

const [dataExtintor, setDataExtintor] = useState();
const {writeDB} = useDataBase();

    

  

  // Hooks para manejar los elementos del formulario                                             
  const id_extintor =  useForm();
  const ubicacion = useForm();
  const tipo_extintor = useForm();
  const capacidad = useForm();
  const recarga = useForm();
  const f_vencimiento = useForm();
  const estado_cartel = useForm();
  const estado_soporte_nicho = useForm();
  const observaciones = useForm();
  const imagen = useForm();

  // Variable donde se almacenan todos los datos a guardar en la base de datos
  const allData = {
    id_extintor: id_extintor.inputValue,
    ubicacion: ubicacion.inputValue,
    tipo_extintor: tipo_extintor.inputValue,
    capacidad: capacidad.inputValue,
    recarga_cada: recarga.inputValue,
    fecha_vencimiento: f_vencimiento.inputValue,
    tiempo_faltante: f_vencimiento.inputValue,
    estado_cartel: estado_cartel.selectValue,
    estado_soporte_nicho: estado_soporte_nicho.selectValue,
    observaciones: observaciones.textArea
  }
  const extintor_photo = {
    id_extintor: id_extintor.inputValue,
    image: imagen.inputValue
  }

  //Funcion para limpiar todos los elementos del formulario
const clearAll = () => {
  id_extintor.clearInput();
  ubicacion.clearInput();
  tipo_extintor.clearInput();
  capacidad.clearInput();
  recarga.clearInput();
  f_vencimiento.clearInput();
  estado_cartel.clearSelect('Carteles');
  estado_soporte_nicho.clearSelect('Soportes');
  observaciones.clearTextArea();
  document.getElementById('imagen').value = null;  
}

// Funcion para calcular el tiempo restante para la recarga del extintor
const handle_left_time = (f_vencimiento, recarga_cada) => {
  const fv = new Date(f_vencimiento);
  const rc = parseInt(recarga_cada);
  const left_time = fv.setFullYear(fv.getFullYear()+  rc)
  const hoy = Date.now();

  // console.log(new Date(left_time));
  //console.log(new Date(left_time) - new Date(hoy));
  //console.log("Tiempo faltante: ", Math.floor((( left_time > hoy ? left_time - hoy : hoy - left_time) / (1000 * 60 * 60 * 24)) / 30 )  + " Meses")

}



//Funcion para guardar los datos del nuevo extintor en la base de datos y limpia tos los campos del formulario
const handleSubmit = () => {
  writeDB("extintores", allData);  
  clearAll();
};




  return (
    <>
    <div className="add-extintor">
      <h2>Nuevo Extintor</h2>

        <input 
          type='text' 
          placeholder='ID' 
          id='id' 
          onChange={(event)=>{id_extintor.handleChangeInput(event)}} 
          value={id_extintor.inputValue} 
        />
        <input 
          type='text' 
          placeholder='Ubicacion' 
          id='ubicacion' 
          onChange={(event)=>{ubicacion.handleChangeInput(event)}} 
          value={ubicacion.inputValue}
        />
        <input 
          type='text' 
          placeholder='Tipo' 
          id='tipo' 
          onChange={(event)=>{tipo_extintor.handleChangeInput(event)}} 
          value={tipo_extintor.inputValue}
        />
        <input 
          type='text' 
          placeholder='Capacidad' 
          id='capacidad' 
          onChange={(event)=>{capacidad.handleChangeInput(event)}} 
          value={capacidad.inputValue}
        />
        <input 
          type='number' 
          placeholder='Recarga cada' 
          id='recarga' onChange={(event)=>{recarga.handleChangeInput(event)}} 
          value={recarga.inputValue}
        />
        <input 
          type='date' 
          placeholder='F. Vencimiento' 
          id='fvenc' onChange={(event)=>{f_vencimiento.handleChangeInput(event)}} 
          value={f_vencimiento.inputValue}
        />

        <select 
          id='menuCarteles' 
          onClick={()=>estado_cartel.placeholderForSelect('carteles')}
          onChange={(event)=>{estado_cartel.handleChangeSelect(event)}}
          value={estado_cartel.selectValue}
          >
            <option id='carteles' >Carteles</option>
            <option value="Buen Estado">Buen Estado</option>
            <option value="Mal Estado">Mal Estado</option>
            <option value="Inexistente">Inexistente</option>
        </select>
        <select 
          id='menuSoportes' 
          onClick={()=>estado_soporte_nicho.placeholderForSelect('soportes')}
          onChange={(event)=>{estado_soporte_nicho.handleChangeSelect(event)}}
          value={estado_soporte_nicho.selectValue}
          >
          <option id='soportes'>Soportes</option>
            <option value="Con Soporte" >Con Soporte</option>
            <option value="Sin Soporte">Sin Soporte</option>
            <option value="Con Nicho">Con Nicho</option>
            <option value="Sin Nicho">Sin Nicho</option>
            <option value="Nicho o Soporte Roto">Nicho o Soporte Roto</option>
        </select>
        <textarea 
          placeholder='Observaciones' 
          id='observaciones' 
          rows="4" 
          cols="30" 
          onChange={(event)=>{observaciones.handleChangeTextArea(event)}}
          value={observaciones.textArea}
        />
        <br />

        {/* <label htmlFor='imagen'className='label-imagen'>Subir Imagen</label> */}
        <input 
          className='input-imagen' 
          name="imagen" 
          type='file' 
          id='imagen' 
          acept='image/*' 
          onChange={(event)=>{imagen.handleChangeImage(event)}}
        />

        <button onClick={handleSubmit}>Agregar</button>
        <button onClick={clearAll}>Limpiar</button>
    </div>


      
    </>
  )
}

export default AddExtintor
