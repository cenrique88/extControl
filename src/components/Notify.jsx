

import {useEffect} from 'react';
import "./styles/notify.css";


const Notify = ({msg, open, close}) => {
    

    useEffect(() => {
      setInterval(close, 3000);
    }, [])
    
    if (open != true) return null;
    
    return(
        <div className="notify">
            {msg}
        </div>
    )


}

export default Notify
