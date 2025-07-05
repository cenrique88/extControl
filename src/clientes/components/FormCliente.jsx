import {useState} from "react";

import "../styles/Clientes.css"

import useDataBase from "../../hooks/useDataBase";
import useForm from "../../hooks/useForm";
import Notify from "../../app/components/Notify";





const FormCliente = () => {
  const {writeDB} = useDataBase();
  const juridic_name = useForm();
  const address = useForm();
  const name = useForm();
  const email = useForm();
  const phone = useForm();


  const saveData = () => {
    const data = {nombre_cliente:name.inputValue, email:email.emailValue}
    const rtrn = writeDB("clientes", data);
    console.log({rtrn})
    setShowNotify(true)
    name.clearInput();
    email.clearEmail();
  }

  const [showNotify, setShowNotify] = useState(false);
  const onCloseNotify = ()=>{
    setShowNotify(false)
  }





  return (

    <div className="form-cliente">
        <Notify msg="Cliente Guardado" open={showNotify} close={onCloseNotify}/>
        <input 
            type="text" 
            placeholder="Nombre Juridico: "
            value={juridic_name.inputValue}
            onChange={juridic_name.handleChangeInput}
        ></input>   
        <input 
            type="text" 
            placeholder="Nombre: "
            value={name.inputValue}
            onChange={name.handleChangeInput}
        ></input>
        <input 
            type="email" 
            placeholder="E-mail"
            value={email.emailValue}
            onChange={email.handleChangeEmail}
        ></input>
        <input 
            type="text" 
            placeholder="Direccion:"
            value={address.inputValue}
            onChange={address.handleChangeInput}
        ></input>

        <button
        onClick={saveData}
        >Guardar</button>
    </div>

  )
}

export default FormCliente
