
import {useContext, useEffect} from 'react'
import { AppContext } from "../../app/components/AppContext";


import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";







const Inspecciones = () => {

    const { setSelectedPage } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        setSelectedPage(location.pathname === '/inspecciones' ? 'Inspecciones' : '');
    }, []);









    return (
        <div>
        
        </div>
    )
}

export default Inspecciones
