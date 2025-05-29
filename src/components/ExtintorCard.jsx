import {useState} from 'react';

import "./styles/Extintores.css"

const ExtintorCard = ({extintor}) => {

  const [openExt, setOpenExt] = useState("ext-card");
  const [content, setContent] = useState();

  const onTap = () => {

    (openExt == "ext-card") ? setOpenExt("ext-card-open") : setOpenExt("ext-card");
    
  }



  
  return (
    <div tabIndex={0} className={openExt} onBlur={()=>setOpenExt("ext-card")} onClick={()=>(openExt == "ext-card-open") ? setOpenExt("ext-card") : ''} >
        <img 
            className="logo-ext-card" 
            src="src/img/m-azul.png" 
            onClick={ onTap}
        />
        
        <h1 className="ext-id" 
            onClick={
              ()=>{
                (openExt == "ext-card") ? setOpenExt("ext-card-open") : setOpenExt("ext-card");                
              }
            }
        
        >{extintor.id_extintor}</h1>
        <div id="edit-ext-img"><img className="button-img-ext" src='/src/img/edit-3.png' onClick={()=>console.log('edit')}/></div>
        
        <img id="del-ext-img" className="button-img-ext" src='/src/img/eliminar.png' onClick={()=>console.log('del')}/>
        
        <div className="ext-card-is-open">
          <p>{extintor.id_extintor}</p>
          <p>{extintor.ubicacion}</p>
          <p>{extintor.tipo_extintor}</p>
          <p>{extintor.capacidad}</p>
          <p>{extintor.recarga_cada}</p>
          <p>FV:</p>
          <p>{extintor.observaciones}</p>

        </div>
        



      </div> 
  )
}

export default ExtintorCard
