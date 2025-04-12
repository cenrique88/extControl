import axios from "axios";
import { useState, useEffect} from 'react'


const MostrarExtintores = () => {

    useEffect(() => {
      handleData();
    }, []);
    
    const [allExtintores, setAllExtintores] = useState();

    const handleData = async () => {
        try{
          const response = await axios.get("http://172.16.1.167:3000/extintores");
          setAllExtintores(response.data);
        } catch (error) {
          console.error("Error obtener el datos:", error);        }
      };

      //console.log(allExtintores);

      






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
                        <th>Capacidad</th>
                        <th>F. Recarga</th>
                        <th>Obs</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    
            {
                allExtintores && allExtintores.map((extintor, index) => (
                    <tr key={extintor._id}>
                        <td key={extintor._id+1}>{extintor.id_extintor}</td>
                        <td key={extintor._id+2}>{extintor.ubicacion}</td>
                        <td key={extintor._id+3}>{extintor.tipo_extintor}</td>
                        <td key={extintor._id+4}>{extintor.capacidad}</td>
                        <td key={extintor._id+5}>{extintor.recarga_cada}</td>
                        <td key={extintor._id+6}>{extintor.observaciones}</td>
                        <td key={extintor._id+7}><img src={extintor.imagen} alt="Imagen del extintor" /></td>                  

                    </tr>
                ))
                                
                
            }
            </tbody>
            </table>
            

        </div>

    </div>      
    </>
  )
}




export default MostrarExtintores
