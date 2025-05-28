

import {Html5QrcodeScanner} from "html5-qrcode";
import {useState, useEffect} from 'react';





const QrScan = () => {
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {

            
            const success = (result) => {
            scanner.clear();
            setScanResult(result);
            }

            const error = (err) => {
            console.warn(err);
            }

            const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 10,
            disableFlip:false,

            });

            scanner.render(success, error);

    }, [])

    




  return (
    <div>
    {
        scanResult
        ? console.log(scanResult)
        : <div id="reader"></div>
    }
    </div>
  )
}

export default QrScan









// import {Html5QrcodeScanner} from "html5-qrcode";
// import {useState, useEffect} from 'react';





// const QrScan = () => {
//     const [scanResult, setScanResult] = useState(null);

//     useEffect(() => {
//         if(!scanResult){
            
//             const success = (result) => {
//             scanner.clear();
//             setScanResult(result);
//             }

//             const error = (err) => {
//             console.warn(err);
//             }

//             const scanner = new Html5QrcodeScanner('reader', {
//             qrbox: {
//                 width: 250,
//                 height: 250,
//             },
//             fps: 10,
//             disableFlip:false,

//             });

//             scanner.render(success, error);
//         }

        

  
//     }, [])

    




//   return (
//     <div>
//     {
//         scanResult
//         ? console.log(scanResult)
//         : <div id="reader"></div>
//     }
//     </div>
//   )
// }

// export default QrScan































