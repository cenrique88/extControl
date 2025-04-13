import axios from 'axios';






const useDataBase = () => {

    const url = 'http://172.16.1.167:3000/'

    const writeDB = async(collection, data)=>{
        try{
            const response = await axios.post(url + collection, data);
            console.log("Dato guardado:", response.data);
          } catch (error) {
            console.error("Error al guardar el dato:", error);
          };
    }

    const getDB = async (collection)=>{
        try{
            const response = await axios.get(url + collection);
            return response.data;
          } catch (error) {
            console.error("Error obtener el datos:", error);
        };
    }   






  return {
    writeDB,
    getDB,

  }
}

export default useDataBase
