import "./components/styles/App.css";

//Dependencias de las paginas de rutas...
import Home from "./components/Home";
import Clientes from "./components/Clientes";
import Controles from "./components/Controles";
import Extintor from "./components/Extintor";
import NavBar from "./components/NavBar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<NavBar />

			<div className='container'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/clientes' element={<Clientes />} />
					<Route path='/controles' element={<Controles />} />
					<Route path='/showext' element={<Extintor />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
