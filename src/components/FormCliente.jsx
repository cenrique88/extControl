import {useState} from "react";
import "./styles/Clientes.css"
import useDataBase from "./hooks/useDataBase";
import useForm from "./hooks/useForm";
import Notify from "./Notify";





const FormCliente = () => {
  const {writeDB} = useDataBase();
  const name = useForm();
  const email = useForm();


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
            placeholder="Nombre Cliente"
            value={name.inputValue}
            onChange={name.handleChangeInput}
        ></input>   
        <input 
            type="email" 
            placeholder="E-mail"
            value={email.emailValue}
            onChange={email.handleChangeEmail}
        ></input>

        <button
        onClick={saveData}
        >Guardar</button>
    </div>

  )
}

export default FormCliente
