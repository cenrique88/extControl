// Estilos globales y responsivos
import './components/styles/global.css';
import './components/styles/App.css';
import './components/styles/responsive.css';

// Dependencias de las páginas
import Home from "./components/Home";
import Clientes from "./components/Clientes";
import Controles from "./components/Controles";
import Extintor from "./components/Extintor";
import NavBar from "./components/NavBar";
import AddNewClient from "./components/AddNewClient";


import {AppContext} from "./components/AppContext.jsx";
import {useContext} from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

	const {showNavbar} = useContext(AppContext);

  
  

	return (
		<>
				 <NavBar />
			
				<div className='container'>
					<Routes>					
						<Route path='/' element={<Home />} />
						<Route path='/clientes/*' element={<Clientes />} />
						<Route path='/controles' element={<Controles />} />
						<Route path='/showext' element={<Extintor />} />

						<Route path="/clientes/add-client" element={<AddNewClient />} />

					</Routes>
				</div>
		</>
	);
}

export default App;

