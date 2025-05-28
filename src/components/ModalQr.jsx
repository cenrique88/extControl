

import "./styles/ModalQr.css"



const ModalQr = ({content, isOpen, onClose}) => {





 if (isOpen != true) return null;




  return (
    <div className='modal-container-qr'>
        <div className='modal-qr'>
            <button className='close-modal-button-qr' onClick={onClose}>x</button>

        
            <div className="container-modal-qr">
                {
                    content
                }

            </div>
             
        </div>
            
    </div>
  )
}

export default ModalQr
