import "./App.css";
import "./components/styles/navBarRouter.css";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { useState } from "react";
//Rutas de las paginas
import Home from "./components/Home";
import QrScanner from "./components/QrScanner";
import ShowExt from "./components/ShowExt";
import AddExt from "./components/AddExt";


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
		<Router>
			<nav>
				<ul>
					<li>
						<Link to="/" >
							<img className="iconImg" src="src/icon/home.png" alt="Home" />
						</Link>
					</li>
					<li>
						<Link to="/qrscanner" ><img className="iconImg" src="src/icon/qrscanner.png" alt="qrscann" /></Link>
					</li>
					<li>
						<Link to="/showext" ><img className="iconImg" src="src/icon/mostrarext.png" alt="Mostrar Extintores" /></Link>
					</li>
					<li>
						<Link to="/addext" ><img className="iconImg" src="src/icon/addext.png" alt="add ext" /></Link>
					</li>
				</ul>
			</nav>
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
		<Routes>
			<Route path="/" element={<Home/>} />
			<Route path="/qrscanner" element={<QrScanner/>} />
			<Route path="/showext" element={<ShowExt/>} />
			<Route path="/addext" element={<AddExt/>} />
		</Routes>
		</Router>
	);
}

export default App;
