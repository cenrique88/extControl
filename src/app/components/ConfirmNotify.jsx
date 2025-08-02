
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

        <div className="confirm-notify-container hidden">
            <div className="confirm-notify-card">
                <h2>¿Eliminar Extintor?</h2>
                <p>Esta acción ne se puede deshacer.</p>
                <div class="notify-buttons">
                    <button className="btn btn-eliminar" onClick={()=>handleAcept()}>Eliminar</button>
                    <button className="btn btn-cancelar" onClick={()=>close(false)}>Cancelar</button>
                </div>
            </div> 
        </div>

    )
}

export default ConfirmNotify
