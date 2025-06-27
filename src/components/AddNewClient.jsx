import {useState} from "react";
import "./styles/Clientes.css"
import useDataBase from "./hooks/useDataBase";
import useForm from "./hooks/useForm";
import Notify from "./Notify";





const AddNewClient = () => {

  const {writeDB} = useDataBase();
  const nombre_juridico = useForm();
  const direccion = useForm();
  const nombre_cliente = useForm();
  const email = useForm();


  const saveData = () => {
    const data = {nombre_cliente:nombre_cliente.inputValue, 
                  email:email.emailValue,
                  nombre_juridico:nombre_juridico.inputValue,
                  direccion:direccion.inputValue
                }
    const rtrn = writeDB("clientes/add-client", data);
    console.log({rtrn})
    setShowNotify(true)
    nombre_cliente.clearInput();
    email.clearEmail();
    nombre_juridico.clearInput();
    direccion.clearInput();
  }

  const [showNotify, setShowNotify] = useState(false);
  const onCloseNotify = ()=>{
    setShowNotify(false)
  }




  return (
    <div>
      <Notify msg="Cliente Guardado" open={showNotify} close={onCloseNotify}/>
        <input 
            type="text" 
            placeholder="Nombre Juridico: "
            value={nombre_juridico.inputValue}
            onChange={nombre_juridico.handleChangeInput}
        ></input>   
        <input 
            type="text" 
            placeholder="Nombre: "
            value={nombre_cliente.inputValue}
            onChange={nombre_cliente.handleChangeInput}
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
            value={direccion.inputValue}
            onChange={direccion.handleChangeInput}
        ></input>

        <button
        onClick={saveData}
        >Guardar</button>
      
    </div>
  )
}

export default AddNewClient
