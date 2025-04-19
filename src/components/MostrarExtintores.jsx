import axios from "axios";
import { useState, useEffect} from 'react'
import useDataBase from "./hooks/useDataBase";


const MostrarExtintores = () => {
    const [pageInit, setPageInit] = useState(0);
    const [pageEnd, setPageEnd] = useState(6);
    const [numeroPagina, setNumeroPagina] = useState(1);


    const {getDB, editDB, deleteDB, getOneDB} = useDataBase();


    useEffect(() => {
        handleData();
    }, [pageEnd]);
    
    // funcion para obtener los datos de la base de datos y almacenarlos en el estado
    const [allExtintores, setAllExtintores] = useState();
    const handleData = async () => {
        const data = await getDB("extintores");
        setAllExtintores(data);
      };

   
      // funcion para obtener la fecha de vencimiento de un extintor
      const handleF_Vencimiento = (f_vencimiento, recarga_cada) => {
        const fv = new Date(f_vencimiento);
        const rc = parseInt(recarga_cada);
        const getTime= fv.setFullYear(fv.getFullYear()+  rc)
        
        return `${new Date(getTime).getMonth()}/${new Date(getTime).getFullYear()%1000}`
      }
      // funcion para obtener el tiempo restante para la proxima recarga de un extintor
      const handle_left_time = (f_vencimiento, recarga_cada) => {
        const fv = new Date(f_vencimiento);
        const rc = parseInt(recarga_cada);
        const getTime= fv.setFullYear(fv.getFullYear()+  rc)

        const hoy = Date.now(); 
        //console.log("Tiempo faltante: ", Math.floor((( getTime > hoy ? getTime - hoy : hoy - getTime) / (1000 * 60 * 60 * 24)) / 30 )  + " Meses")
        const left_time = Math.floor((( getTime - hoy ) / (1000 * 60 * 60 * 24)) / 30 );  

        if (left_time <= 0){
            return "Vencido"
            } else if (left_time > 0 && left_time < 3){
                return " - 3 Meses"
            }
            else if (left_time > 3){
                return " + 3 Meses"
            }
        }     
        
    const handleDeleteExt = async (id_extintor) => {
        const data = await deleteDB('extintores', id_extintor)
        handleData()
    }








  return (
    
    <>
    <div>
        <div>
            {/* <button onClick={handleData}>get</button> */}
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Ubicacion</th>
                        <th>Tipo</th>
                        <th>Cap.</th>
                        <th>Rec Cada</th>
                        <th>Ultima Recarga</th>
                        <th>Fecha Venc</th>
                        <th>Tiempo Faltante</th>
                        <th>Acc</th>
                        {/* <th>Obs</th> */}
                        {/* <th>Imagen</th> */}
                    </tr>
                </thead>
                <tbody>
                    
            {
                allExtintores && allExtintores.length <= 6 
                ?
                allExtintores && allExtintores.map((extintor, index) => (                     
                    <tr key={extintor._id}>
                        <td key={extintor._id+1}>{extintor.id_extintor}</td>
                        <td key={extintor._id+2}>{extintor.ubicacion}</td>
                        <td key={extintor._id+3}>{extintor.tipo_extintor}</td>
                        <td key={extintor._id+4}>{extintor.capacidad}</td>
                        <td key={extintor._id+5}>{extintor.recarga_cada}</td>
                        <td key={extintor._id+6}>{`${new Date(extintor.ultima_recarga).getMonth()}/${new Date(extintor.ultima_recarga).getFullYear()%1000}`}</td>
                        <td key={extintor._id+7}>{handleF_Vencimiento(extintor.ultima_recarga, extintor.recarga_cada)}</td>
                        <td key={extintor._id+8}>{handle_left_time(extintor.ultima_recarga, extintor.recarga_cada)}</td>
                        <td key={extintor._id+10}><button >Edt</button> <button onClick={()=>{handleDeleteExt(extintor.id_extintor)}}>Dlt</button></td>
                        
                    </tr>
                ))
                :
                allExtintores && allExtintores.map((extintor, index) => {
                    
                    if (index >= pageInit && index <= pageEnd) {
                        return(                                        
                    <tr key={extintor._id}>
                        <td key={extintor._id+1}>{extintor.id_extintor}</td>
                        <td key={extintor._id+2}>{extintor.ubicacion}</td>
                        <td key={extintor._id+3}>{extintor.tipo_extintor}</td>
                        <td key={extintor._id+4}>{extintor.capacidad}</td>
                        <td key={extintor._id+5}>{extintor.recarga_cada}</td>
                        <td key={extintor._id+6}>{`${new Date(extintor.ultima_recarga).getMonth()}/${new Date(extintor.ultima_recarga).getFullYear()%1000}`}</td>
                        <td key={extintor._id+7}>{handleF_Vencimiento(extintor.ultima_recarga, extintor.recarga_cada)}</td>
                        <td key={extintor._id+8}>{handle_left_time(extintor.ultima_recarga, extintor.recarga_cada)}</td>
                        <td key={extintor._id+9}><button>Edt</button> <button onClick={()=>{handleDeleteExt(extintor.id_extintor)}} >Dlt</button></td>

                    </tr>
                    )}
                })                                
                
            }

            </tbody>
            </table>
            

        </div>
        <div className='paginacion'>
            <button onClick={() => {
                if (pageInit <= 0){
                    alert('No hay mas datos')
                    return
                } else {
                    setPageInit(pageInit - 6), 
                    setPageEnd(pageEnd - 6)
                    setNumeroPagina(numeroPagina - 1)
                }
                }}>Anterior</button>

            <p>{numeroPagina}</p>


            <button id='next' onClick={() => {
                if (pageEnd >= allExtintores.length){
                    alert('No hay mas datos')
                    return
                } else {
                    setPageInit(pageInit + 6), 
                    setPageEnd(pageEnd + 6)
                    setNumeroPagina(numeroPagina + 1)
                }
                }}>Siguiente</button>
            </div>

    </div>      
    </>
  )
}




export default MostrarExtintores
