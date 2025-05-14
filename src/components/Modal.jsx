import "./styles/Modal.css";




const Modal = ({content, isOpen, onClose}) => {
    if (isOpen != true) return null;




  return (
    <div className='modal-container'>
        <div className='modal'>
          <h2>Nuevo Cliente</h2>
            <button className='close-modal-button' onClick={onClose}>x</button> 
            {
            content
           } 
        </div> 
    </div>
  )
}

export default Modal














