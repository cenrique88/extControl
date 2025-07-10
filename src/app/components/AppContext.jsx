

import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({children}) => {

    const [selectedPage, setSelectedPage] = useState('Home');
    const [navigate, setNavigate] = useState('');
    const [user, setUser] = useState(null);
    const [showNavbar, setShowNavbar] = useState(false);
    const [login, setLogin] = useState(false);

    // NUEVOS: Modo eliminación y selección múltiple
    const [modoEliminar, setModoEliminar] = useState(false);
    const [elementSeleccionados, setElementSeleccionados] = useState([]);

    const [viewEditButton, setViewEditButton] = useState(false);
    const [targetForEdit, setTargetForEdit] = useState();

    return (
        <AppContext.Provider value={{ 
            selectedPage, 
            setSelectedPage, 
            navigate, 
            setNavigate,
            user,
            setUser,
            showNavbar,
            setShowNavbar,
            login,
            setLogin,

            modoEliminar,
            setModoEliminar,
            elementSeleccionados,
            setElementSeleccionados,

            viewEditButton,
            setViewEditButton,
            targetForEdit,
            setTargetForEdit
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;






