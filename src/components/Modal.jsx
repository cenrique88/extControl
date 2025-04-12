
import "./components.css";



const Modal = ({content, isOpen, onClose}) => {
    if (isOpen != true) return null;

        



  return (
    
    <>
    <div className="modal-overlay">
        <div className="modal-content">
            <button onClick={onClose} className="modal-close">close</button>
            <br/>

                {content}
        
        </div>  
    </div>    
    </>
  )
}

export default Modal




