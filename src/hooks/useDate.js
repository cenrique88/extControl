





const useDate = () => {

    // funcion para obtener la fecha de vencimiento de un extintor
    const handleF_Vencimiento = (ultima_recarga, recarga_cada) => {
      const fv = new Date(ultima_recarga);
      const rc = parseInt(recarga_cada);
      const getTime= fv.setFullYear(fv.getFullYear()+  rc)     
      return `${new Date(getTime).getMonth()}/${new Date(getTime).getFullYear()%1000}`;
    }




  return {
    handleF_Vencimiento,

  }
}

export default useDate
