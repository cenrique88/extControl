
import useDataBase from "./hooks/useDataBase.js";
import "./styles/Clientes.css"


const CardClient = ({name, email}) => {

  const {deleteDB} = useDataBase();



  const handleDelete = () => {
    const alerta = confirm("Esta eliminando a un cliente, ¿desea continuar?")
    if(alerta){
      deleteDB('clientes', name);
    }
    console.log("Cliente eliminado", name)
  }


  return (
    
    <div className="client-card">
      <div className="client-card-logo">
        <img src='/src/img/m-azul.png' />
        </div>
    
    {/* <div className="text-container"> */}
      <div className="text-nombre">
        <p><b>Nombre:</b></p>
        <p><i>{name}</i></p>
      </div>
      <div className="text-email">
        <p><b>E-mail:</b></p>
        <p><i>{email}</i></p>
      {/* </div> */}
    
    
    
    </div> 
    <div className="client-card-delete">
      <img src='/src/img/eliminar.png' onClick={handleDelete}/>
    </div>
    <div className="client-card-edit">
      <img src='/src/img/edit-3.png'/>
    </div>
         
    </div>
  )
}

export default CardClient
