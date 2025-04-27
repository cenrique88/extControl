import "./App.css";

import { useState } from "react";
import AddExtintor from "./components/addExtintor";
import Modal from "./components/Modal";
import MostrarExtintores from "./components/MostrarExtintores";
import ModalShowExtList from "./components/ModalShowExtList";
import Html5QrcodePlugin from "./components/Html5QrcodeScanner";

function App() {
	const [isOpenModalAddExt, setIsOpenModalAddExt] = useState(false);
	const openModalAddExt = () => {
		setIsOpenModalAddExt(true);
	};
	const closeModalAddExt = () => {
		setIsOpenModalAddExt(false);
	};

	const [isOpenModalShowExt, setIsOpenModalShowExt] = useState(false);
	const openModalShowExt = () => {
		setIsOpenModalShowExt(true);
	};
	const closeModalShowExt = () => {
		setIsOpenModalShowExt(false);
	};

	const [isOpenModalScanner, setIsOpenModalScanner] = useState(false);
	const openModalScanner = () => {
		setIsOpenModalScanner(true);
	};
	const closeModalScanner = () => {
		setIsOpenModalScanner(false);
	};

	const onNewScanResult = (decodedText, decodedResult) => {
		// handle decoded results here
		console.log(`Decoded text: ${decodedText}`, decodedResult);
	};

	return (
		<>
			<div className='container'>
				<h2>Control de Extintores</h2>
				<button onClick={openModalAddExt}>Agregar Extintor</button>
				<br />
				<button onClick={openModalShowExt}>Mostrar Extintores</button>
				<br />
				<button onClick={openModalScanner}>Escanear QR</button>
			</div>

			<Modal
				isOpen={isOpenModalAddExt}
				onClose={closeModalAddExt}
				content={<AddExtintor />}
			/>
			<ModalShowExtList
				isOpen={isOpenModalShowExt}
				onClose={closeModalShowExt}
				content={<MostrarExtintores />}
			/>
			<Modal
				isOpen={isOpenModalScanner}
				onClose={closeModalScanner}
				content={
					<Html5QrcodePlugin
						fps={10}
						qrbox={300}
						disableFlip={false}
						qrCodeSuccessCallback={onNewScanResult}
					/>
				}
			/>
		</>
	);
}

export default App;
