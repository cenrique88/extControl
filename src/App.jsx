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
import AddNewClient from "./components/AddNewClient";

import {AppProvider} from "./components/AppContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<AppProvider>
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
			</AppProvider>
		</>
	);
}

export default App;
