//Estilos globales y responsivos
import './components/styles/global.css';
import './components/styles/App.css';
import './components/styles/NavBar.css';
import './components/styles/responsive.css';


//Dependencias de las paginas de rutas...
import Home from "./components/Home";
import Clientes from "./components/Clientes";
import Controles from "./components/Controles";
import Extintor from "./components/Extintor";
import NavBar from "./components/NavBar";
import AppContext from "./components/AppContext";
import {useState} from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	const [selectedClient, setSelectedClient] = useState('Select Client');
	return (
		<>
			<NavBar />
			
			<AppContext.Provider value={{ selectedClient, setSelectedClient}}>
				<div className='container'>
					<Routes>					
						<Route path='/' element={<Home />} />
						<Route path='/clientes' element={<Clientes />} />
						<Route path='/controles' element={<Controles />} />
						<Route path='/showext' element={<Extintor />} />
					</Routes>
				</div>
			</AppContext.Provider>
		</>
	);
}

export default App;
