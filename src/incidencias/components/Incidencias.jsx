

import {useEffect, useContext} from 'react';
import AppContext from "../../app/components/AppContext";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";



const Incidencias = () => {

const {setSelectedPage} = useContext(AppContext)

const navigate = useNavigate();
const location = useLocation();


useEffect(() => {

    setSelectedPage(location.pathname === '/incidencias' ? 'Incidencias' : '');

}, [])






    return (
    <div>
        
    </div>
    )
}



export default Incidencias
