import "./styles/Controles.css";
import "./styles/ModalQr.css"
import {useState} from 'react';
import QrScan from "./QrScan";
import QrScan1 from "./QrScan1";
import ModalQr from "./ModalQr";





const Controles = () => {
    const [showQr, setShowQr] = useState(false);

    const onNewScanResult = (decodedText, decodedResult) => {
        //console.log(decodedResult);
        //console.log(decodedText);
        alert(decodedText)
    };


    const openModalQr = (prop)=> {
    if(prop){
      document.getElementById('add-button-qr').style.visibility = "hidden";
    }
    else{
      document.getElementById('add-button-qr').style.visibility = "visible";
    }

    setShowQr(prop);
  }






    const [filter, setFilter] = useState(
        <select 
            id='filter'
            className="control-filter"
            onChange={()=>handleSearch(document.getElementById('filter').value)}
        >

            <option>Buscar por:</option>
            <option>Fecha</option>
            <option>ID</option>
        </select>
    );

    const handleSearch = (value)=> {
        //arreglar esto que da un dia mas en el calendario para bloquear hasta la fecha actual
        const hoy = new Date().toISOString().split("T")[0];

        if(value=="ID"){
            setFilter(
                <input 
                type="text"
                placeholder=" Ej: B08"
                ></input>
            )
        }
        else{
            console.log(hoy)
            setFilter(
                <input 
                type="date"
                max={hoy}
                required
                ></input>
            )
        }
    }



  return (
    
    <>
    <div className="controles-container">

        <ModalQr 
        isOpen={showQr}
        onClose={()=>openModalQr(false)}
        content={
            <QrScan1 
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
            /> 
        }
      />

        <div className="fliter-bar">
        {
        filter
        }
        </div>


        {/* <div className="card-control">
           <p>Control: 10/10/2025</p> 
        </div>
        <div className="card-control">
           <p>Control: 10/10/2025</p> 
        </div>
        <div className="card-control">
           Control: 10/10/2025
        </div> */}



        <button 
            className="add-button"
            id="add-button-qr"
            onClick={()=>openModalQr(true)}            
            >
            +
        </button>


        {/* <QrScan />       */}


    </div>      
    </>
  )
}

export default Controles
