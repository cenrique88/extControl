import axios from 'axios';






const useDataBase = () => {

    const writeDB = async(collection, data)=>{
        try{
            const response = await axios.post(`http://172.16.1.167:3000/${collection}`, data);
            console.log("Dato guardado:", response.data);
          } catch (error) {
            console.error("Error al guardar el dato:", error);
          };
    }






  return {
    writeDB,

  }
}

export default useDataBase
