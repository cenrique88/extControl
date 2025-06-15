
import "./styles/Clientes.css";
import {useState, useeffect} from 'react';


const CardClient = ({client}) => {

  const [isOpenCard, setIsOpenCard] = useState(false);

  const ifCardOpen = () => {
    setIsOpenCard(!isOpenCard);
    if(isOpenCard) {
      document.getElementById('add-button').style.visibility = "visible";
    } else {
    document.getElementById('add-button').style.visibility = "hidden";
  }
}






  return (

    <div
      tabIndex="0"
      className={`client-card ${isOpenCard ? "open" : ""}`}
      onClick={
        (e) => {
          (e.target.localName != "button") 
          ? 
          ifCardOpen()
          :
          null }}>

        <img src='/src/img/m-azul.png' />
        <p>{client.nombre_cliente}</p>

        <div className="button-container">
          <button className='button1'></button>
        <button className='button2'></button>
        <button className='button3'></button>
        <button className='button4'></button>

        </div>
        
    </div>
  )
}

export default CardClient

