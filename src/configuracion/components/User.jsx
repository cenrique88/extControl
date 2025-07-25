

import React from 'react'
import '../styles/Configuracion.css'

import { useState } from 'react'
import useDataBase from '../../hooks/useDataBase';










const User = () => {

    const [users, setUsers] = useState([]);


    const {getDB} = useDataBase();

    useEffect(() => {
        getAllUser();
    }, [])



    const getAllUser = async () => {
        const data = await getDB('users');
        setUsers(data);
    }

    
    






    return (
        <div>
        <div className='user-list'></div>

        
        </div>
    )
}

export default User
