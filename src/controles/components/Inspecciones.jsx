
import {useContext, useEffect, useState} from 'react'
import { AppContext } from "../../app/components/AppContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import useDataBase from '../../hooks/useDataBase';







const Inspecciones = () => {

    const {getDB} = useDataBase();

    const [inspecciones, setInspecciones] = useState([]);

    const { setSelectedPage } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        getAllInspecciones();
        setSelectedPage(location.pathname === '/inspecciones' ? 'Inspecciones' : '');
    }, []);

    const getAllInspecciones = async ()=> {
        const data = await getDB('inspecciones');
        setInspecciones(data);
    }









    return (
        <div>       
        
        </div>
    )
}

export default Inspecciones
