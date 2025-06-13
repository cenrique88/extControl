import "./styles/Home.css";
import "./styles/Components.css";
import AppContext from "./AppContext";
import {useState, useEffect, useContext} from "react";



const Home = () => {
	

	
	const {selectedClient, setSelectedClient} = useContext(AppContext)
	


	

	


	

	return (
		<>
			<div className='home-container'>
				<img className='logo-img' src='/src/img/logo-blue-banner.png' />
				

				<div className='home-card'>
					<table>
						<tbody>
							<tr>
								<td>Incidencias</td>
							</tr>
							<tr>
								<td>0</td>
							</tr>
							<tr>
								<td>________________________</td>
							</tr>
							<tr>
								<td>Proximos a Vencer</td>
							</tr>
							<tr>
								<td>0</td>
							</tr>
							<tr>
								<td>________________________</td>
							</tr>
							<tr>
								<td>Vencidos</td>
							</tr>
							<tr>
								<td>0</td>
							</tr>
							
							
							</tbody>
					</table>
				
				</div>
			</div>
		</>
	);
};

export default Home;
