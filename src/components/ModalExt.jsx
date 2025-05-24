import "./styles/Modal-ext.css";






const ModalExt = ({content, isOpen, onClose}) => {

if (isOpen != true) return null;




  return (
    <div className="modal-container-ext">
        <div className="modal-ext">
          <h2>Nuevo Extintor</h2>
            <button className="close-modal-button-ext"  onClick={onClose}>x</button> 
            {
            content
           } 
        </div> 
    </div>
  )
}

export default ModalExt
