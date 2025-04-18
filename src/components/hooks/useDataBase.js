import axios from 'axios';






const useDataBase = () => {

    const url = 'http://172.16.1.167:3000/'

    // funcion para guardar un dato en la base de datos
    const writeDB = async(collection, data)=>{
        try{
            const response = await axios.post(url + collection, data);
            console.log("Dato guardado:", response.data);
          } catch (error) {
            console.error("Error al guardar el dato:", error);
          };
    }

    // funcion para obtener un dato de la base de datos
    const getDB = async (collection)=>{
        try{
            const response = await axios.get(url + collection);
            return response.data;
          } catch (error) {
            console.error("Error obtener el datos:", error);
        };
    }   
    
    // funcion para editar un dato en la base de datos
    const editDB = async (collection, id, data)=>{
        try{
            const response = await axios.put(url + collection + '/' + id, data);
            console.log("Dato editado:", response.data);
          } catch (error) {
            console.error("Error al editar el dato:", error);
          };
    }

    // funcion para eliminar un dato en la base de datos
    const deleteDB = async (collection, id)=>{
        try{
            const response = await axios.delete(url + collection + '/' + id);
            console.log("Dato eliminado:", response.data);
          } catch (error) {
            console.error("Error al eliminar el dato:", error);
          };
    }






  return {
    writeDB,
    getDB,

  }
}

export default useDataBase
