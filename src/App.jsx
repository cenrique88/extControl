// Estilos globales y responsivos
import './app/styles/global.css';
import './app/styles/App.css';
import './app/styles/responsive.css';

// Dependencias de las páginas
import Home from "./app/components/Home.jsx";
import Clientes from "./clientes/components/Clientes";
import Controles from "./controles/components/Controles.jsx";
import Extintor from "./extintores/components/Extintor";
import NavBar from "./app/components/NavBar.jsx";
import AddNewClient from "./clientes/components/AddNewClient";


import {AppContext} from "./app/components/AppContext.jsx";
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

