
import "./styles/Clientes.css";
import {useState, useeffect, useRef} from 'react';


const CardClient = ({client}) => {

  const [isOpenCard, setIsOpenCard] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const timeRef = useRef(null);


  const handleMouseDown = (e) => {
    console.log(e);
    timeRef.current = setTimeout( () => {
      setIsPressed(true);
      console.log("pressed");
    }, 1000);
    
  };

  const handleMouseUp = (e) => {
    console.log(e)
    clearTimeout(timeRef.current);

    if(!isPressed){
      if(e.target.localName != "button") {
       console.log('open card ' + timeRef.current)
        setIsOpenCard(!isOpenCard);
          if(isOpenCard) {
            document.getElementById('add-button').style.visibility = "visible";
          } else {
            document.getElementById('add-button').style.visibility = "hidden";
            }
                }
      }
    

    console.log('soltado ' + timeRef.current)
    //setIsPressed(false);
  }


//   const ifCardOpen = (e) => {
//     if(e.target.localName != "button") {
//       if(timer >= 100) {
//         console.log('open card ' + timer)
//         setIsOpenCard(!isOpenCard);
//           if(isOpenCard) {
//             document.getElementById('add-button').style.visibility = "visible";
//           } else {
//             document.getElementById('add-button').style.visibility = "hidden";
//             }
//       }
//     }    
// }






  return (

    <div
      tabIndex="0"
      className={`client-card ${isOpenCard ? "open" : ""}`}
      onMouseDown={(e)=>handleMouseDown(e)}
      onMouseUp={(e)=>handleMouseUp(e)}
      onTouchStart={(e)=>handleMouseDown(e)}
      onTouchEnd={(e)=>handleMouseUp(e)}
     >

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

