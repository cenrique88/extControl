

import "./styles/Extintores.css"

const ExtintorCard = ({id}) => {



  
  return (
    <div className="ext-card">
        <img className="logo-ext-card" src="src/img/m-azul.png" />
        
        <h1 className="ext-id">{id}</h1>
        <img className="button-img-ext" src='/src/img/edit-3.png'/>
        <img className="button-img-ext" src='/src/img/eliminar.png'/>
      </div> 
  )
}

export default ExtintorCard
