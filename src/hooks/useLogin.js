


import React from 'react'
import useDataBase from './useDataBase';





const useLogin = () => {

    const {writeDB, getDB, editDB, deleteDB, getOneDB,} = useDataBase();


    const handleLogin = async (user, pass) => {
        const getUser = await getOneDB('usuarios', user)



        console.log(getUser)
    }











    return {
        handleLogin,

    }
}

export default useLogin

















