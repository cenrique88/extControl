

import { createContext, useState } from "react";



export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [selectedPage, setSelectedPage] = useState('Home');
    const [navigate, setNavigate] = useState('');

    return (
        <AppContext.Provider value={{ selectedPage, setSelectedPage, navigate, setNavigate }} >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;





