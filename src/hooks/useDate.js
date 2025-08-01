





const useDate = () => {


    const handleF_Vencimiento = (ultima_recarga, recarga_cada) => {
      const fv = new Date(ultima_recarga);
      const rc = parseInt(recarga_cada);
      const getTime= fv.setFullYear(fv.getFullYear()+  rc)     
      //return `${new Date(getTime).getMonth()}/${new Date(getTime).getFullYear()%1000}`;
      return `${new Date(getTime).getFullYear()}-${String(new Date(getTime).getMonth()+2).padStart(2, '0')}`;
    }


  const handleTimeLeft = (ultima_recarga, recarga_cada) => {
    const fv = new Date(ultima_recarga);
    const rc = parseInt(recarga_cada);
    const getTime= fv.setFullYear(fv.getFullYear()+  rc)

    const today = new Date();
    const threeMonth = new Date(getTime);
    threeMonth.setMonth(threeMonth.getMonth() - 3);

    if(today >= threeMonth && today < new Date(getTime)){
      return 'PRÓXIMO A VENCER';
    } else if(today >= new Date(getTime)){
      return 'VENCIDO';
    } else {
      return 'VIGENTE';
    };
  }









  return {
    handleF_Vencimiento,
    handleTimeLeft,

  }
}

export default useDate
