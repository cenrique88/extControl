

import React from 'react'
import { useState } from 'react'
import '../styles/Configuracion.css'
import User from './User';






const Configuracion = () => {

    const [showOption, setShowOption] = useState('');







    const handleChangeMenu = () => {
        console.log('object')
    };


    return (

    <div className='config-container'>
    
    <div className='config-main'>
        <button onClick={handleChangeMenu}>Usuarios:</button>
    </div>

    <div className='config-option'>
        <User />
    </div> 
        

    </div>

    )
}

export default Configuracion
