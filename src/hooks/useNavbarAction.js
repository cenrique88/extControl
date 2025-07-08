

import useDataBase from "../hooks/useDataBase";
import { AppContext } from "../app/components/AppContext";
import { useContext } from 'react';




const useNavbarAction = () => {
    const { getDB, deleteDB } = useDataBase();
    const { modoEliminar, setModoEliminar, setElementSeleccionados } = useContext(AppContext);


    const handleDeleteSelected = async (elementSelected, msg) => {
        const confirmar = confirm(msg);
        if (confirmar) {
            for (const value of elementSelected) {
                await deleteDB("clientes", value);
            }
            setElementSeleccionados([]);
            setModoEliminar(false);
        }
    };


    const toggleElementSelected = (prop) => {
        setElementSeleccionados((prev) =>
            prev.includes(prop)
            ? prev.filter((c) => c !== prop)
            : [...prev, prop]
        );
    };










    return {
        handleDeleteSelected,
        toggleElementSelected,

    }
}






export default useNavbarAction
