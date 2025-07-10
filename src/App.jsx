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
import Inspecciones from './controles/components/Inspecciones';
import Incidencias from './incidencias/components/Incidencias';
import Informes from './informes/components/Informes';
import EditClient from './clientes/components/EditClient';


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
						<Route path='/inspecciones' element={<Inspecciones />} />
						<Route path='/extintores' element={<Extintor />} />
						<Route path='/incidencias' element={<Incidencias />} />
						<Route path='/informes' element={<Informes />} />

						<Route path="/clientes/add-client" element={<AddNewClient />} />
						<Route path="/clientes/edit-client" element={<EditClient />} />

					</Routes>
				</div>
			</>
		);
	}

export default App;

