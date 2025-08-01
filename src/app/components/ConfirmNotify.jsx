
import '../styles/Notify.css'


const ConfirmNotify = ({open, close, returnValue}) => {


    if(open == false){
        return null;
    };

    const handleAcept = () => {
        close(true);
        returnValue(true);
    };

    return (

        <div className='confirm-notify-container'>
            <div className='confirm-notify-card'>
                <h4>HDP SABES QUE VAS A ELIMINAR UN EXTINTOR????</h4>
                <button onClick={()=>handleAcept()}>Aceptar</button>
                <button onClick={()=>close(false)}>Cancelar</button>
            </div> 
        </div>

    )
}

export default ConfirmNotify
