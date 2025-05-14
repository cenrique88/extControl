

import "./styles/Clientes.css"


const CardClient = ({name, email}) => {


  return (
    <div>
      <div className="card-container">

    <div className="client-card">
    <img src='/src/img/m-azul.png' />
    <div className="text-container">
    <p><b>Nombre:</b></p>
    <p><i>{name}</i></p>
    <p><b>E-mail:</b></p>
    <p><i>{email}</i></p>
    </div>
  
    </div>


</div>
    </div>
  )
}

export default CardClient
