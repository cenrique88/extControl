
import {useState} from 'react';



const useSearch = () => {

    const [newData, setNewData] = useState([]);





    const handleSearch = (datos, setDatos, findBy, value) => {
        
        if(datos){
            setNewData(datos);
            setDatos([]);
            for(const element of newData){
                if(element.nombre_cliente.includes(value.toUpperCase())){
                    console.log(element);
                }              
            }



    }
}








    return {
        handleSearch,

    }
}

export default useSearch
