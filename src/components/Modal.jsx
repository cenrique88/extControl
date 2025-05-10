import "./styles/Modal.css";


window.


const Modal = ({content, isOpen, onClose}) => {
    if (isOpen != true) return null;




  return (
    <div className='modal-container'>
        <div className='modal'>
            <button className='close-modal-button' onClick={onClose}>x</button> 
            {
            content
           } 
        </div> 
    </div>
  )
}

export default Modal














