


import {useState} from 'react';
import ConfirmNotify from '../app/components/ConfirmNotify';



const useConfirmNotify = () => {
    const [config, setConfig] = useState(null);

    const confirm = () => {
        return new Promise((resolve)=>{
            setConfig({
                open: true,
                returnValue: (val)=> {
                    resolve(val);
                },
                close: ()=> setConfig(null),
            });
        });
    };

    const dialog = config ? (<ConfirmNotify
                                open={config.open}
                                returnValue={config.returnValue}
                                close={config.close}
                            />) : null;




    return {
        confirm,
        dialog,
    }
}

export default useConfirmNotify
