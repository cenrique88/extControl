

import { createContext, useState } from "react";



export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [selectedPage, setSelectedPage] = useState('Home');
    const [navigate, setNavigate] = useState('');
    const [user, setUser] = useState(null);
    const [showNavbar, setShowNavbar] = useState(false);
    const [login, setLogin] = useState(false);

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
                                        setLogin
                                        }} >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;





