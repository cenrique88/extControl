
import "./components.css";



const ModalShowExtList = ({content, isOpen, onClose}) => {
    if (isOpen != true) return null;

        



  return (
    
    <>
    <div className="modal-overlay-showextlist">
    <button onClick={onClose} className="modal-close-showextlist">X</button>
        <div className="modal-content-showextlist">
        
                {content}
        
        </div> 
        <button>back</button>
        <button>netx</button> 
    </div>    
    </>
  )
}

export default ModalShowExtList




