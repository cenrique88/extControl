
import "./components.css";



const ModalShowExtList = ({content, isOpen, onClose}) => {
    if (isOpen != true) return null;

        



  return (
    
    <>
    <div className="modal-overlay-showextlist">
        <div className="modal-content-showextlist">
          <div>
            <button onClick={onClose} className="modal-close-showextlist">X</button>
            <br/>
          </div>
            
            <br/>

                {content}
        
        </div>  
    </div>    
    </>
  )
}

export default ModalShowExtList




