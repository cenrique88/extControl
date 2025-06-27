

import { createContext, useState } from "react";



export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [selectedPage, setSelectedPage] = useState('Home');

    return (
        <AppContext.Provider value={{ selectedPage, setSelectedPage}} >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;





