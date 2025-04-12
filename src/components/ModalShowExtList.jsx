
import "./components.css";



const ModalShowExtList = ({content, isOpen, onClose}) => {
    if (isOpen != true) return null;

        



  return (
    
    <>
    <div className="modal-overlay-showextlist">
        <div className="modal-content-showextlist">
            <button onClick={onClose} className="modal-close-showextlist">close</button>
            <br/>

                {content}
        
        </div>  
    </div>    
    </>
  )
}

export default ModalShowExtList




